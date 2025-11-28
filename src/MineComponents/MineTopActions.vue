<template>
  <div class="top-actions">
    <button class="icon-btn" @click="$emit('setting')">
      <img src="/icons/设置.png" alt="设置" />
    </button>
    <button class="icon-btn" @click="$emit('service')">
      <img src="/icons/客服.png" alt="客服" />
    </button>
  </div>
</template>

<script>
export default {
  name: "MineTopActions",
  emits: ["setting", "service"]
};
</script>

<style scoped>
.top-actions {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.75rem;
  z-index: 2;
}
.icon-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: #ffffff;
  border: none;
  display: grid;
  place-items: center;
  box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.08);
}
.icon-btn img {
  width: 1.2rem;
  height: 1.2rem;
}
</style>
