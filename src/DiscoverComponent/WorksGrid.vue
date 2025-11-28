<template>
  <div class="works-grid">
    <div
      v-for="item in list"
      :key="item.id"
      class="work-card"
      @click="$emit('open', item)"
    >
      <div class="img-wrap">
        <img :src="item.img" class="work-img" />

        <!-- 底部遮罩 + 文本 -->
        <div class="overlay">
          <p class="title">{{ item.title }}</p>

          <!-- ❤️ 点赞按钮（不触发 open） -->
          <button
            class="likes"
            type="button"
            @click.stop="$emit('like', item.id)"
          >
            ❤️ {{ item.likes }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorksGrid",
  props: {
    list: { type: Array, default: () => [] }
  },
  emits: ["like", "open"]
};
</script>

<style scoped>
.works-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 0.1rem 0.8rem 1.2rem;
}

/* 每个作品卡片 */
.work-card {
  background: transparent;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

/* 图片容器 */
.img-wrap {
  position: relative;
  overflow: hidden;
  border-radius: inherit;
}

/* 渐变背景（完全贴合图片内部，不溢出） */
.img-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 38%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.55) 100%
  );
  pointer-events: none;
}

/* 图片本体 */
.work-img {
  width: 100%;
  height: 15rem;
  display: block;          /* ⭐ 防止底部空白 */
  object-fit: cover;
}

/* 底部文字区域（绝对贴合图片内部） */
.overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  padding: 0.55rem 0.6rem;
  box-sizing: border-box;

  pointer-events: none; /* ⭐ 不挡父级点击 */
}

/* 标题文本 */
.title {
  font-size: 0.85rem;
  color: #fff;
  margin: 0;
  font-weight: 400;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.35);

  pointer-events: auto; 
}

/* ❤️ 点赞按钮（不会挡住 open 点击） */
.likes {
  font-size: 0.78rem;
  color: #fff;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.35);

  pointer-events: auto;        /* ⭐ 允许点击 */
}
</style>
