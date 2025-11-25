<template>
  <div class="home">
    <h3 class="title">化妆师端首页</h3>
    <!-- 顶部 Tab -->
    <OrderTabs v-model="currentTab" />
    <!-- 订单列表 -->
    <OrderCard
      v-for="item in filteredList"
      :key="item.id"
      :data="item"
    />

    <!-- 底部导航 -->
  
  </div>
</template>

<script>
import OrderTabs from "@/components/OrderTabs.vue";
import OrderCard from "@/components/OrderCard.vue";


export default {
  name: "MakeupHome",
  components: { OrderTabs, OrderCard },

  data() {
    return {
      currentTab: "all",
      list: [
        {
          id: 1,
          company: "婚庆公司",
          orderNo: "xxxxxx",
          title: "妆发+半天+全天+是否跟妆",
          time: "2025年11月29日 上午5：00",
          address: "合肥市瑶海区万达广场",
          color: "#409EFF",
          bgColor: "#ecf5ff"
        },
        {
          id: 2,
          company: "婚庆公司",
          orderNo: "xxxxxx",
          title: "妆发+半天+全天+是否跟妆",
          time: "2025年11月29日 上午5：00",
          address: "合肥市瑶海区万达广场",
          color: "#67c23a",
          bgColor: "#f0f9eb"
        },
        {
          id: 3,
          company: "婚庆公司",
          orderNo: "xxxxxx",
          title: "妆发+半天+全天+是否跟妆",
          time: "2025年11月29日 上午5：00",
          address: "合肥市瑶海区万达广场",
          color: "#e35b9a",
          bgColor: "#fdeaf2"
        },
         {
          id: 3,
          company: "婚庆公司",
          orderNo: "xxxxxx",
          title: "妆发+半天+全天+是否跟妆",
          time: "2025年11月29日 上午5：00",
          address: "合肥市瑶海区万达广场",
          color: "#e35b9a",
          bgColor: "#fdeaf2"
        }
        ,
         {
          id: 3,
          company: "婚庆公司",
          orderNo: "xxxxxx",
          title: "妆发+半天+全天+是否跟妆",
          time: "2025年11月29日 上午5：00",
          address: "合肥市瑶海区万达广场",
          color: "#e35b9a",
          bgColor: "#fdeaf2"
        }
      ]
    };
  },

  computed: {
    filteredList() {
      if (this.currentTab === "all") return this.list;
      return this.list.slice(0, 1); // 示例：待接只显示一部分
    }
  }
};
</script>

<style scoped>
.home {
  padding: 16px;
  padding-bottom: 70px; /* 预留底部导航空间 */
}

.title {
  margin-bottom: 10px;
  font-size: 1.1rem;
  font-weight: bold;
}
</style>
