<template>
  <div class="cards-container">

    <!-- 最近预约 -->
    <div class="card">
      <div class="card-title">最近预约</div>

      <div v-if="recent && recent.length" class="card-list">
        <div
          v-for="item in recent"
          :key="item.id"
          class="card-item"
        >
          <div class="left">
            <div class="name">{{ item.name }}</div>
            <div class="date">{{ item.date }}</div>
          </div>
          <div class="right">查看</div>
        </div>
      </div>

      <div v-else class="empty">暂无预约，去看看化妆师吧～</div>
    </div>

    <!-- 常用化妆师 -->
    <div class="card">
      <div class="card-title">常用化妆师</div>

      <div v-if="artists && artists.length" class="artist-list">
        <div
          v-for="item in artists"
          :key="item.id"
          class="artist-item"
        >
          <img :src="item.avatar" class="artist-avatar" />
          <div class="artist-name">{{ item.name }}</div>
        </div>
      </div>

      <div v-else class="empty">你还没有收藏化妆师哦</div>
    </div>

  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  recent: {
    type: Array,
    default: () => [], // [{ id,name,date }]
  },
  artists: {
    type: Array,
    default: () => [], // [{ id,name,avatar }]
  },
});
</script>

<style scoped>
.cards-container {
  padding: 0 1rem;
  margin-top: 1rem;
}

/* 共用卡片样式 */
.card {
  background: #fff;
  border-radius: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.empty {
  color: #777;
  font-size: 0.8rem;
}

/* 最近预约 */
.card-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f3f3;
}

.card-item:last-child {
  border-bottom: none;
}

.card-item .name {
  font-size: 0.85rem;
}

.card-item .date {
  font-size: 0.75rem;
  color: #999;
}

.card-item .right {
  font-size: 0.8rem;
  color: #ff6b9e;
}


/* 常用化妆师 */
.artist-list {
  display: flex;
  gap: 1rem;
}

.artist-item {
  text-align: center;
}

.artist-avatar {
  width: 3rem;   /* 48px */
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.25rem;
}

.artist-name {
  font-size: 0.75rem;
  color: #333;
}
</style>
