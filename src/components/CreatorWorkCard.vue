<template>
  <div class="work-card relative bg-white rounded-xl border border-pink-100 overflow-hidden">
    <div class="h-64 overflow-hidden">
      <img :src="work.image" :alt="work.title" class="w-full h-full object-cover" />
    </div>
    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
      <h3 class="text-sm font-medium text-white truncate">{{ work.title }}</h3>
      <div class="flex items-center mt-1 text-white text-xs">
        <span class="mr-1">❤️</span>
        <span>{{ likeText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatorWorkCard",
  props: {
    work: {
      type: Object,
      required: true
    }
  },
  computed: {
    likeText() {
      const likes = Number(this.work.likes || 0);
      if (likes >= 1000) {
        return `${(likes / 1000).toFixed(1)}k`;
      }
      return likes;
    }
  }
};
</script>

<style scoped>
.work-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.work-card:hover {
  transform: translateY(-4px);
}
</style>
