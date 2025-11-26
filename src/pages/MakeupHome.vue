<template>
  <div class="home">

    <!-- 顶部 Tab + 搜索框 -->
    <OrderTabs 
      v-model="currentTab"
      v-model:keyword="searchKey"
    />

    <!-- 订单列表 -->
    <OrderCard
      v-for="item in filteredList"
      :key="item.id"
      :data="item"
    />
        <BottomNav v-model="navTab" />
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
      currentTab: "all",   // ← 修复命名一致性
      searchKey: "",       // ← 新增搜索关键字
 navTab: "shop",
      list: [
        {
    id: 1,
    company: "婚庆公司",
    orderNo: "A10001",
    title: "新娘妆·全天跟妆",
    time: "2025-12-01 06:00",
    address: "合肥市瑶海区万达广场"
  },
  {
    id: 2,
    company: "摄影工作室",
    orderNo: "A10002",
    title: "写真妆·半天拍摄",
    time: "2025-12-02 14:00",
    address: "合肥市政务区银泰中心"
  },
  {
    id: 3,
    company: "剧组化妆",
    orderNo: "A10003",
    title: "电视剧拍摄·三天化妆",
    time: "2025-12-03 05:00",
    address: "合肥市经开区影视基地"
  },
  {
    id: 4,
    company: "舞台演出团",
    orderNo: "A10004",
    title: "舞台妆·晚会化妆",
    time: "2025-12-04 18:00",
    address: "合肥市滨湖新区会展中心"
  },
  {
    id: 5,
    company: "儿童摄影",
    orderNo: "A10005",
    title: "儿童写真·可爱妆",
    time: "2025-12-05 10:00",
    address: "合肥市包河区万象城"
  },
  {
    id: 6,
    company: "模特经纪公司",
    orderNo: "A10006",
    title: "走秀妆·时尚造型",
    time: "2025-12-06 16:00",
    address: "合肥市蜀山区1912街区"
  },
  {
    id: 7,
    company: "婚纱店合作",
    orderNo: "A10007",
    title: "婚纱拍摄·礼服妆",
    time: "2025-12-07 09:00",
    address: "合肥市政务区天鹅湖万达"
  }
      ]
    };
  },

  computed: {
    filteredList() {
      // ---- 1）先按 Tab 过滤 ----
      let arr = this.list;

      if (this.currentTab === "wait") {
        arr = arr.slice(0, 1);      
      }

      // ---- 2）再按搜索关键字过滤 ----
      if (this.searchKey.trim()) {
        const key = this.searchKey.trim();
        arr = arr.filter(item =>
          item.company.includes(key) ||
          item.title.includes(key) ||
          item.orderNo.includes(key) ||
          item.address.includes(key)
        );
      }

      return arr;
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

<style scoped>
.home {
  padding: 1rem;
  padding-bottom: 70px;
}
</style>
