<template>
  <div class="w-full">
    <div
      class="relative w-full h-[180px] bg-gradient-to-r from-pink-100 to-pink-50 rounded-b-3xl overflow-hidden"
    >
      <img
        v-if="profile.background"
        :src="profile.background"
        alt="背景图"
        class="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent" />
      <button
        class="absolute top-4 right-4 w-10 h-10 bg-white/90 text-gray-700 text-sm rounded-full shadow-md border border-white flex items-center justify-center"
        type="button"
      >
        ✎
      </button>
    </div>

    <div class="flex items-center w-full px-4 -mt-10 relative z-10">
      <div class="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
        <img :src="profile.avatar" alt="用户头像" class="w-full h-full object-cover" />
      </div>
      <div class="ml-4">
        <h1 class="text-xl font-semibold text-gray-900">{{ profile.name }}</h1>
      </div>
    </div>

    <div class="w-full px-4 mt-4 mb-6">
      <div class="bg-white rounded-xl p-4 shadow-sm border border-pink-50">
        <p class="text-gray-600 text-sm leading-relaxed text-left">
          {{ profile.bio }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatorProfileHero",
  props: {
    profile: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
button {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
}
</style>
