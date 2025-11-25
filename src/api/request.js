// request.js
const DEFAULT_BASE = import.meta.env.VITE_API_BASE || 'http://192.168.110.102:8026';
let AUTH_TOKEN = localStorage.getItem('token') || '';
let onAuthError = null; // 401 回调

export function setToken(t) {
  AUTH_TOKEN = t || '';
  if (t) localStorage.setItem('token', t);
}
export function onAuth(cb) { onAuthError = cb; }

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function buildQuery(params = {}) {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) v.forEach(i => usp.append(k, i));
    else usp.append(k, v);
  });
  return usp.toString();
}

async function coreRequest(input) {
  const {
    method = 'GET',
    url,
    base = DEFAULT_BASE,
    params,           // GET/POST 都可附带 query
    data,             // body：对象 / FormData / Blob / string
    headers = {},
    timeout = 12000,  // ms
    retries = 2,      // 仅对 GET 生效
    responseType,     // 'json' | 'blob' | 'text' (默认按 header 猜)
  } = input;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  let finalUrl = url.startsWith('http') ? url : base + url;
  const q = buildQuery(params);
  if (q) finalUrl += (finalUrl.includes('?') ? '&' : '?') + q;

  const isForm = (typeof FormData !== 'undefined') && (data instanceof FormData);
  const reqHeaders = {
    ...(isForm ? {} : { 'Content-Type': 'application/json' }),
    ...(AUTH_TOKEN ? { 'Authorization': AUTH_TOKEN } : {}),
    ...headers,
  };

  const fetchOpts = {
    method,
    headers: reqHeaders,
    signal: controller.signal,
  };
  if (method !== 'GET' && method !== 'HEAD') {
    if (isForm) fetchOpts.body = data;
    else if (data instanceof Blob) fetchOpts.body = data;
    else if (typeof data === 'string') fetchOpts.body = data;
    else if (data != null) fetchOpts.body = JSON.stringify(data);
  }

  // 内部执行（带 GET 重试）
  let attempt = 0, lastErr;
  while (true) {
    try {
      const res = await fetch(finalUrl, fetchOpts);
      clearTimeout(id);

      // 非 2xx
      if (!res.ok) {
        if (res.status === 401 && typeof onAuthError === 'function') {
          try { await onAuthError(); } catch { /* ignore */ }
        }
        // 优先尝试解析后端返回体
        let safeText = '';
        try { safeText = await res.text(); } catch {}
        let parsed;
        try { parsed = safeText ? JSON.parse(safeText) : null; } catch {}
        const code = parsed?.code ?? res.status;
        const message = parsed?.message ?? parsed?.msg ?? `HTTP ${res.status}`;
        return { ok: false, code, message, data: parsed?.data ?? null, raw: parsed ?? safeText };
      }

      // 成功：按 responseType/Content-Type 自动解析
      let payload;
      const ct = res.headers.get('content-type') || '';
      if (responseType === 'blob') payload = await res.blob();
      else if (responseType === 'text') payload = await res.text();
      else if (ct.includes('application/json')) payload = await res.json();
      else if (ct.startsWith('text/')) payload = await res.text();
      else payload = await res.blob(); // 兜底二进制

      // 统一规范化（JSON 场景）
      if (ct.includes('application/json') && payload && typeof payload === 'object') {
        const normalizedCode = payload.code ?? payload.status ?? 0;
        const normalizedMessage = payload.message ?? payload.msg ?? '';
        const normalizedData = Object.prototype.hasOwnProperty.call(payload, 'data') ? payload.data : null;
        const normalizedOk = payload.ok === true || normalizedCode === 0 || normalizedCode === 200;
        return { ok: normalizedOk, code: normalizedCode, message: normalizedMessage, data: normalizedData, raw: payload };
      }

      // 非 JSON：直接返回
      return { ok: true, code: 200, message: '', data: payload, raw: payload };

    } catch (err) {
      clearTimeout(id);
      lastErr = err;
      // 仅 GET 尝试重试
      const canRetry = (method === 'GET' && retries > attempt) && (
        err.name === 'AbortError' || err.name === 'TypeError' || /NetworkError|Failed to fetch/i.test(String(err))
      );
      if (canRetry) {
        attempt++;
        await sleep(300 * attempt); // 简单指数回退
        continue;
      }
      return { ok: false, code: -1, message: '网络异常或超时', data: null, raw: err };
    }
  }
}

/* ===== 对外导出：统一 request + 便捷方法 ===== */
export function request(methodFlag, url, jsonData = {}, isquery = false) {
  // 兼容你原先的签名：methodFlag 0=GET 1=POST，isquery 表示 POST 的 query
  const method = methodFlag === 1 ? 'POST' : 'GET';
  return coreRequest({
    method,
    url,
    params: (method === 'GET' || isquery) ? jsonData : undefined,
    data: (method === 'POST' && !isquery) ? jsonData : undefined,
  });
}

export const get = (url, params) => coreRequest({ method: 'GET', url, params });
export const post = (url, data) => coreRequest({ method: 'POST', url, data });
export const postForm = (url, dataObj = {}) => {
  const fd = new FormData();
  Object.entries(dataObj).forEach(([k, v]) => fd.append(k, v));
  return coreRequest({ method: 'POST', url, data: fd });
};
export const upload = (url, formData /** FormData */) =>
  coreRequest({ method: 'POST', url, data: formData });

export const download = async (url, params) => {
  const res = await coreRequest({ method: 'GET', url, params, responseType: 'blob', timeout: 30000, retries: 0 });
  return res; // {ok, data: Blob}
};
