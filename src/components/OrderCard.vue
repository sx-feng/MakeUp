<template>
  <div class="order-card">
    <div class="header">
      <span class="tag">
        {{ data.company }}
      </span>
      <span class="order-no">单号：{{ data.orderNo }}</span>
    </div>

    <div class="content">
      <div>{{ data.title }}</div>
      <div>{{ data.time }}</div>
      <div>{{ data.address }}</div>
    </div>

    <div class="actions">
      <button class="btn-detail">查看详情</button>
      <button class="btn-contact">联系公司</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderCard",
  props: {
    data: { type: Object, required: true }
  }
};
</script>

<style scoped>
/* 统一白色 + 阴影卡片 */
.order-card {
  background: #fff;
  border-radius: 0.75rem;              /* 12px */
  padding: 0.75rem;                    /* 12px */
  margin-bottom: 0.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);  /* 柔和阴影 */
}

/* 顶部 */
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}

/* 标签（统一蓝色，可以改成灰色风格） */
.tag {
  padding: 0.2rem 0.5rem;
  border-radius: 0.4rem;
  background: #ecf5ff;
  color: #409EFF;
  font-size: 0.75rem;
}

.order-no {
  font-size: 0.75rem;
  color: #666;
}

/* 内容 */
.content {
  font-size: 0.85rem;
  color: #444;
  line-height: 1.3rem;
  margin-bottom: 0.75rem;
}

/* 操作按钮组 */
.actions {
  display: flex;
  justify-content: space-between;
}

/* 按钮样式 */
.btn-detail,
.btn-contact {
  border: none;
  padding: 0.35rem 0.9rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
}

/* 灰色按钮 */
.btn-detail {
  background: #f7f7f7;
  color: #333;
}

/* 蓝色按钮 */
.btn-contact {
  background: #337ecc;
  color: #fff;
}
</style>
