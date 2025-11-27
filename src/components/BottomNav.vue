<template>
  <div class="bottom-nav">
    <div
      v-for="item in tabs"
      :key="item.name"
      class="nav-item"
      :class="{ active: current === item.name }"
      @click="onClick(item.name)"
    >
      <img
        :src="current === item.name ? item.selectedIcon : item.icon"
        class="nav-icon"
      />
      <div class="nav-text">{{ item.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomNav",
  props: {
    modelValue: {
      type: String,
      default: "shop"
    }
  },
  emits: ["update:modelValue"],
  computed: {
    current() {
      return this.modelValue;
    },
    tabs() {
      return [
        {
          name: "shop",
          label: "订单",
          icon: new URL("@/assets/dingdan.png", import.meta.url).href,
          selectedIcon: new URL("@/assets/订单 (1).png", import.meta.url).href
        },
        {
          name: "message",
          label: "消息",
          icon: new URL("@/assets/消息 (2).png", import.meta.url).href,
          selectedIcon: new URL("@/assets/消息 (4).png", import.meta.url).href
        },
        {
          name: "discover",
          label: "发现",
          icon: new URL("@/assets/发现.png", import.meta.url).href,
          selectedIcon: new URL("@/assets/发现 (1).png", import.meta.url).href
        },
        {
          name: "mine",
          label: "我的",
          icon: new URL("@/assets/我的.png", import.meta.url).href,
          selectedIcon: new URL("@/assets/我的 (3).png", import.meta.url).href
        }
      ];
    }
  },
  methods: {
    onClick(name) {
      this.$emit("update:modelValue", name);
    }
  }
};
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4.25rem;
  background: #fff;
  border-top: 0.0625rem solid #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 99;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8125rem;
  color: #666;
}

.nav-item.active {
  color: #ff3b6b;
}

.nav-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-bottom: 0.25rem;
}
</style>
