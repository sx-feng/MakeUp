<template>
  <div class="tabs">
    <button
      v-for="item in list"
      :key="item.value"
      class="tab"
      :class="{ active: modelValue === item.value }"
      @click="$emit('update:modelValue', item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: "OrderTabs",
  props: {
    modelValue: String
  },
  data() {
    return {
      list: [
        { label: "全部", value: "all" },
        { label: "期待", value: "wait" }
      ]
    };
  }
};
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tab {
  padding: 6px 16px;
  border-radius: 999px;
  border: 1px solid #cce0ff;
  background: #f4faff;
  font-size: 0.8rem;
}

.tab.active {
  background: #337ecc;
  color: #fff;
  border-color: #337ecc;
}
</style>
