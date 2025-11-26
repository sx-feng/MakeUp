<template>
    <div class="chat-switch">
        <div
      class="switch-item"
      :class="{ active: modelValue === 'chat' }"
      @click="onSelect('chat')"
    >
      聊天
    </div>

    <div
      class="switch-item"
      :class="{ active: modelValue === 'interact' }"
      @click="onSelect('interact')"
    >
      互动
    </div>

    </div>
</template>
<script>
export default {
  name: "ChatSwitch",
  props: {
    /* 当前选中值：'chat' 或 'interact' */
    modelValue: {
      type: String,
      default: "chat"
    }
  },
  emits: ["update:modelValue"],
  methods: {
    onSelect(val) {
      if (val !== this.modelValue) {
        this.$emit("update:modelValue", val);
      }
    }
  }
};
</script>
<style scoped>
.chat-switch {
  width: 90%;
  margin: 0.3rem auto;
  padding: 0.1rem;
  background: #eeeeee;
  border-radius: 999px;
  display: flex;
  box-sizing: border-box;
}

.switch-item {
  flex: 1;
  text-align: center;
  padding: 0.2rem 0;
  font-size: 0.8rem;
  color: #555;
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  transition: all 0.18s ease;
}

/* 选中态：白底 + 阴影 */
.switch-item.active {
  background: #ffffff;
  color: #000;
  font-weight: 600;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.08);
}
</style>