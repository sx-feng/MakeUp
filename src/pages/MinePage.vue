<template>
  <div class="mine-page">
    <MineTopActions
      @setting="onSetting"
      @service="onService"
    />

    <MineUserCard :user="user" @edit="editProfile" />

    <MineFinanceCard
      :money="{ balance: user.balance, withdraw: user.withdraw }"
      @withdraw="onWithdraw"
    />

    <MineMenuList :list="menu" @select="onSelect" />

    <BottomNav v-model="currentTab" />
  </div>
</template>

<script>
import MineTopActions from "@/MineComponents/MineTopActions.vue";
import MineUserCard from "@/MineComponents/MineUserCard.vue";
import MineFinanceCard from "@/MineComponents/MineFinanceCard.vue";
import MineMenuList from "@/MineComponents/MineMenuList.vue";

import BottomNav from "@/components/BottomNav.vue";

export default {
  name: "MinePage",
  components: {
    MineTopActions,
    MineUserCard,
    MineFinanceCard,
    MineMenuList,
    BottomNav
  },
  data() {
    return {
      currentTab: "mine",
      user: {
        name: "李雅婷",
        title: "专注新娘妆 5 年 | 服务 200+ 客户",
        badge: "金牌化妆师",
        balance: "3,280.00",
        withdraw: "2,150.00",
        avatar: "/icons/image.png"
      },
      menu: [
        { key: "order", name: "订单管理", icon: "/icons/订单.png" },
        { key: "service", name: "服务项目", icon: "/icons/服务项目.png" },
        { key: "review", name: "客户评价", icon: "/icons/客户评价 (2).png", badge: 12 },
        { key: "schedule", name: "预约日程", icon: "/icons/预约日程.png" },
        { key: "income", name: "收入统计", icon: "/icons/收入统计.png" }
      ]
    };
  },
  methods: {
    onSetting() {
      this.$router.push({ name: "setting" });
    },
    onService() {
      this.$router.push({ name: "service" });
    },
    editProfile() {
      this.$router.push({ name: "profile" });
    },
    onWithdraw() {
      console.log("点击提现");
    },
    onSelect(item) {
      this.$router.push({ name: item.key });
    }
  }
};
</script>

<style scoped>
.mine-page {
  min-height: 100vh;
  background: #fff;
  padding: 0.75rem 0.75rem 5.5rem;
  box-sizing: border-box;
  position: relative;
}
</style>
