<template>
  <div class="order-card" :style="{ borderColor: tagColor }">
    <div class="header">
      <span class="tag" :style="{ background: tagBg, color: tagColor }">
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
  },
  computed: {
    tagColor() {
      return this.data.color || "#409EFF";
    },
    tagBg() {
      return this.data.bgColor || "#ecf5ff";
    }
  }
};
</script>

<style scoped>
.order-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.tag {
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
}

.order-no {
  font-size: 0.75rem;
  color: #666;
}

.content {
  font-size: 0.85rem;
  color: #444;
  line-height: 1.3rem;
  margin-bottom: 12px;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.btn-detail,
.btn-contact {
  border: none;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.8rem;
}

.btn-detail {
  background: #f7f7f7;
}

.btn-contact {
  background: #337ecc;
  color: #fff;
}
</style>
