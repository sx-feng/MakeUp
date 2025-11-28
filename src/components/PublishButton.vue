<template>
  <button
    class="publish-btn"
    :class="{ active }"
    type="button"
    @click="$emit('click')"
  >
    <span class="plus">+</span>
  </button>
</template>

<script>
export default {
  name: "PublishButton",
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.publish-btn {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #ff6f91, #ff2f6c);
  box-shadow: 0 10px 22px rgba(255, 63, 121, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 2.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.publish-btn.active {
  transform: translateY(-4px);
  box-shadow: 0 12px 26px rgba(255, 63, 121, 0.32);
}

.publish-btn:active {
  transform: translateY(0);
}

.plus {
  line-height: 1;
}
</style>
