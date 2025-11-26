<template>
  <div class="w-full px-4 pb-24">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-lg font-medium">我的作品</h2>
      <span class="text-xs text-gray-400">{{ works.length }} 个作品</span>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <CreatorWorkCard
        v-for="item in works"
        :key="item.id"
        :work="item"
      />
    </div>
  </div>
</template>

<script>
import CreatorWorkCard from "./CreatorWorkCard.vue";

export default {
  name: "CreatorWorkGrid",
  components: {
    CreatorWorkCard
  },
  props: {
    works: {
      type: Array,
      default: () => []
    }
  }
};
</script>
