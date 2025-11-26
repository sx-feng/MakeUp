<template>
  <div class="top-bar">
    <div class="search-box">
      <img src="@/assets/search.png" class="search-icon" />
   <input
  type="text"
  class="search-input"
  placeholder="搜索"
  :value="modelValue"
  @input="$emit('update:modelValue', $event.target.value)"
/>

    </div>
  </div>
</template>

<script>
export default {
  name: "MessageTopBar",
  props: {
    modelValue: String
  },
  emits: ["update:modelValue"]
};
</script>

<style scoped>
.top-bar {
  padding: 0.7rem 1rem;
  background: #fff;
  border-bottom: 1px solid #ffffff;
}

/* 外层圆角输入框 */
.search-box {
  width: 90%;
  height: 2rem;
  background: #f8f8f8;
  border-radius:0.5rem;
  border: 1px solid #ffffff;
  display: flex;
  align-items: center;
  padding: 0 1rem;
}

/* 搜索图标 */
.search-icon {
  width: 1.1rem;
  height: 1.1rem;
  opacity: 0.6;
}

/* 输入框 */
.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.95rem;
  color: #333;
}

.search-input::placeholder {
  color: #999;
}
</style>
