<template>
  <section class="card list-card">
    <ul class="menu">
      <li
        v-for="item in list"
        :key="item.key"
        class="menu-item"
        @click="$emit('select', item)"
      >
        <div class="item-left">
          <img :src="item.icon" class="item-icon" />
          <span class="item-text">{{ item.name }}</span>
        </div>

        <span v-if="item.badge" class="badge">{{ item.badge }}</span>
        <span class="arrow">›</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "MineMenuList",
  props: { list: Array },
  emits: ["select"]
};
</script>

<style scoped>
.list-card {
  padding: 0.4rem 0.4rem 0.2rem;
  margin-top: 0.85rem;
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.8rem;
}
.item-left {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  flex: 1;
}
.item-icon {
  width: 1.25rem;
  height: 1.25rem;
}
.badge {
  background: #ffe2e7;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
}
.arrow {
  color: #a0a0b4;
}
</style>
