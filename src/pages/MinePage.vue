<template>
  <div class="page">
    <MineHeader
      name="长风"
      account="2222222"
      :stats="{ orders: 3, totalAmount: 2580 }"
      tag="普通用户"
      @service-click="onService"
      @setting-click="onSetting"
    />
    <MineActions :list="actionList" @select="onSelect" />
    <!-- <MineCards :recent="recentList" :artists="favArtists" /> -->
   <BottomNav v-model="currentTab" />
  </div>
</template>

<script>
import MineHeader from "@/MineComponents/MineHeader.vue";
import MineActions from "@/MineComponents/MineActions.vue";
// import MineCards from "@/MineComponents/MineCards.vue";
import BottomNav from "../components/BottomNav.vue";
// eslint-disable-next-line no-unused-vars
const recentList = [
  { id: 1, name: "化妆师 · 小美", date: "2025-02-01" },
  { id: 2, name: "化妆师 · 阿雅", date: "2025-01-20" },
];

// eslint-disable-next-line no-unused-vars
const favArtists = [
  { id: 1, name: "小美", avatar: "https://xxx.jpg" },
  { id: 2, name: "小花", avatar: "https://xxx.jpg" },
];
export default {
  name: "MinePage",
  components: {
    MineHeader,
    MineActions,
    // MineCards,
    BottomNav 
  },
  data() {
    return {
       currentTab: "mine",
      actionList: [
  { name: "订单",     icon: "/icons/订单 (4).png",     key: "order" },
  { name: "收藏",     icon: "/icons/收藏 (4).png",     key:  "fav" },
  { name: "待评价",   icon: "/icons/待评价.png",   key: "review" },
  { name: "待付款",   icon: "/icons/待付款.png",   key: "pay" },
  { name: "钱包",     icon: "/icons/钱包.png",     key: "wallet" },
]
,
    };
  },
  methods: {
    onSelect(item) {
      console.log("点击：", item);
      if (item.key === "order") {
    this.$router.push("/orders");
  }
    },
    onService() {
      console.log("点击客服");
    },
    onSetting() {
      console.log("点击设置");
    },
  },
  mounted() {
    // 进页面时，用当前路由名同步一下底部导航高亮（防止直接输入地址访问）
    if (this.$route.name) {
      this.currentTab = this.$route.name;
    }
  },
   watch: {
    // ⭐ 点击底部导航时切换路由
    currentTab(newName) {
      if (newName && newName !== this.$route.name) {
        this.$router.push({ name: newName });
      }
    },
    // ⭐ 当路由通过其他方式变化时（比如代码跳转），同步底部导航高亮
    $route(to) {
      if (to.name && to.name !== this.currentTab) {
        this.currentTab = to.name;
      }
    },
  }
};
</script>

<style scoped>
.page {
  padding: 0.16rem;
}
</style>