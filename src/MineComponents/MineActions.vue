<template>
  <div class="actions-box">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="action-item"
      @click="clickItem(item)"
    >
      <div class="icon-wrapper">
   <img :src="item.icon" class="action-icon" />

      </div>
      <div class="text">{{ item.name }}</div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["select"]);

const clickItem = (item) => {
  emit("select", item);
};
</script>

<style scoped>
.actions-box {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.05);
  margin: 0 1rem;
  margin-top: 0.7rem;
}

.action-item {
  flex: 1;
  text-align: center;
}

.icon-wrapper {
  width: 2rem;
  height: 2rem;
  margin: 0 auto 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 1.6rem;
  color: #444;
}

.text {
  font-size: 0.8rem;
  color: #333;
}
.action-icon {
  width: 2rem;
  height: 2rem;
  object-fit: contain;
}

</style>
