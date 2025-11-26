<template>
  <div class="category-bar">
    <div
      v-for="item in list"
      :key="item.value"
      class="cat-item"
      :class="{ active: modelValue === item.value }"
      @click="select(item.value)"
    >
      {{ item.label }}
    </div>
  </div>
</template>
                            
<script>
export default {
  name: "CategorySelector",
  props: {
    modelValue: {
      type: String,
      default: "all"
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      list: [
        { label: "全部", value: "all" },
        { label: "婚庆公司", value: "wedding" },
        { label: "用户", value: "user" }
      ]
    };
  },
  methods: {
    select(v) {
      this.$emit("update:modelValue", v);
    }
  }
};
</script>

<style scoped>
.category-bar {
  display: flex;
  padding: 0.4rem 0.6rem;
  background: #fff;
  gap: 0.6rem;
}

/* 圆角 pill 按钮 */
.cat-item {
  padding: 0.35rem 1rem;
  font-size: 0.85rem;
  border-radius: 999px;    /* 让按钮变得非常圆 */
  background: #f3f4f6;
  color: #666;
  cursor: pointer;
  transition: 0.2s;
  border: 1px solid transparent;
}

/* 激活时 */
.cat-item.active {
  background: #fdd4f3;
  color: #fa0678;
  border-color: #ffa5e4;
  font-weight: 600;
}
</style>
