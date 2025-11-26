<template>
  <div class="flex flex-col items-center w-full min-h-screen mx-auto bg-white">
    <CreatorProfileHero v-if="profile" :profile="profile" />
    <CreatorWorkGrid :works="works" />
    <BottomNav v-model="navTab" />
  </div>
</template>

<script>
import { fetchCreatorProfile, fetchCreatorWorks } from "@/api/mockCreator";
import CreatorProfileHero from "@/components/CreatorProfileHero.vue";
import CreatorWorkGrid from "@/components/CreatorWorkGrid.vue";
import BottomNav from "@/components/BottomNav.vue";

export default {
  name: "TestPage",
  components: {
    CreatorProfileHero,
    CreatorWorkGrid,
    BottomNav
  },
  data() {
    return {
      navTab: "test",
      profile: null,
      works: []
    };
  },
  async created() {
    await this.loadData();
    if (this.$route.name) {
      this.navTab = this.$route.name;
    }
  },
  methods: {
    async loadData() {
      const [profile, works] = await Promise.all([
        fetchCreatorProfile(),
        fetchCreatorWorks()
      ]);
      this.profile = profile;
      this.works = works;
    }
  },
  watch: {
    navTab(newName) {
      if (newName && newName !== this.$route.name) {
        this.$router.push({ name: newName });
      }
    },
    $route(to) {
      if (to.name && to.name !== this.navTab) {
        this.navTab = to.name;
      }
    }
  }
};
</script>
