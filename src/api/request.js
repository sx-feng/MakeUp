// request.js
const DEFAULT_BASE = import.meta.env.VITE_API_BASE || 'http://192.168.110.102:8026';

let AUTH_TOKEN = localStorage.getItem('token') || '';
let onAuthError = null;

// 设置 token
export function setToken(t) {
  AUTH_TOKEN = t || '';
  if (t) localStorage.setItem('token', t);
}

// 401 回调
export function onAuth(cb) {
  onAuthError = cb;
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// 构建 URL query
function buildQuery(params = {}) {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) v.forEach(i => usp.append(k, i));
    else usp.append(k, v);
  });
  return usp.toString();
}

// 🔥 安全解析 JSON，不会报错
function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null; // 永远不会 throw
  }
}

async function coreRequest(input) {
  const {
    method = 'GET',
    url,
    base = DEFAULT_BASE,
    params,
    data,
    headers = {},
    timeout = 12000,
    retries = 2,
    responseType
  } = input;

  if (!url) {
    return { ok: false, code: -1, message: 'URL 不能为空', data: null };
  }

  // 完整 URL 处理
  let finalUrl = url.startsWith('http') ? url : base + url;

  // 拼 query
  const q = buildQuery(params);
  if (q) finalUrl += (finalUrl.includes('?') ? '&' : '?') + q;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  // 处理 header
  const isForm = data instanceof FormData;
  const reqHeaders = {
    ...(isForm ? {} : { 'Content-Type': 'application/json' }),
    ...(AUTH_TOKEN ? { Authorization: AUTH_TOKEN } : {}),
    ...headers
  };

  const fetchOpts = {
    method,
    headers: reqHeaders,
    signal: controller.signal
  };

  // Body 处理
  if (method !== 'GET' && method !== 'HEAD') {
    if (isForm) fetchOpts.body = data;
    else if (data instanceof Blob) fetchOpts.body = data;
    else if (typeof data === 'string') fetchOpts.body = data;
    else if (data != null) fetchOpts.body = JSON.stringify(data);
  }

  let attempt = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const res = await fetch(finalUrl, fetchOpts);
      clearTimeout(timer);

      const contentType = res.headers.get('content-type') || '';

      // ❌ 非 2xx
      if (!res.ok) {
        if (res.status === 401 && typeof onAuthError === 'function') {
          // eslint-disable-next-line no-empty
          try { await onAuthError(); } catch {}
        }

        // 尝试安全读取文本，不报错
        const bodyText = await res.text().catch(() => '');
        const bodyJson = safeJsonParse(bodyText);

        return {
          ok: false,
          code: bodyJson?.code ?? res.status,
          message: bodyJson?.message ?? bodyJson?.msg ?? `HTTP ${res.status}`,
          data: bodyJson?.data ?? null,
          raw: bodyJson ?? bodyText
        };
      }

      // 2xx 成功解析
      let payload;

      // 🔥 强制指定返回 Blob
      if (responseType === 'blob') {
        payload = await res.blob();
        return { ok: true, code: 200, message: '', data: payload, raw: payload };
      }

      // 🔥 强制指定返回文本
      if (responseType === 'text') {
        payload = await res.text();
        return { ok: true, code: 200, message: '', data: payload, raw: payload };
      }

      // 自动根据 content-type 判断
      if (contentType.includes('application/json')) {
        payload = await res.json().catch(() => ({}));

        return {
          ok: payload.code === 0 || payload.code === 200 || payload.ok === true,
          code: payload.code ?? payload.status ?? 0,
          message: payload.message ?? payload.msg ?? '',
          data: Object.prototype.hasOwnProperty.call(payload, 'data') ? payload.data : null,
          raw: payload
        };
      }

      // 文本
      if (contentType.startsWith('text/')) {
        payload = await res.text();
        return { ok: true, code: 200, message: '', data: payload, raw: payload };
      }

      // 默认 Blob
      payload = await res.blob();
      return { ok: true, code: 200, message: '', data: payload, raw: payload };

    } catch (err) {
      clearTimeout(timer);

      // 支持 GET 重试
      const isRetry =
        method === 'GET' &&
        attempt < retries &&
        (err.name === 'AbortError' ||
         /NetworkError|Failed to fetch|DOMException/i.test(String(err)));

      if (isRetry) {
        attempt++;
        await sleep(300 * attempt);
        continue;
      }

      return { ok: false, code: -1, message: '网络异常或超时', data: null, raw: err };
    }
  }
}

/* ---------- 对外接口（兼容旧写法） ---------- */

export function request(methodFlag, url, jsonData = {}, isquery = false) {
  const method = methodFlag === 1 ? 'POST' : 'GET';
  return coreRequest({
    method,
    url,
    params: (method === 'GET' || isquery) ? jsonData : undefined,
    data: (method === 'POST' && !isquery) ? jsonData : undefined
  });
}

export const get = (url, params) => coreRequest({ method: 'GET', url, params });
export const post = (url, data) => coreRequest({ method: 'POST', url, data });

export const postForm = (url, dataObj = {}) => {
  const fd = new FormData();
  Object.entries(dataObj).forEach(([k, v]) => fd.append(k, v));
  return coreRequest({ method: 'POST', url, data: fd });
};

export const upload = (url, fd) =>
  coreRequest({ method: 'POST', url, data: fd });

export const download = (url, params) =>
  coreRequest({ method: 'GET', url, params, responseType: 'blob', timeout: 30000, retries: 0 });
