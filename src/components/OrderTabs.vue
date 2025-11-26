<template>
  <div class="tabs-box">

    <!-- QQ 风格搜索框 -->
    <div class="search">
      <img src="@/assets/搜索.png" class="search-icon" />
       <input
        type="text"
        class="search-input"
        :value="keyword"                     
        @input="$emit('update:keyword', $event.target.value)" 
        placeholder="搜索公司/标题/订单号/地址"
      />
    </div>

    <!-- tabs 切换 -->
    <div class="tabs">
      <button v-for="item in list"
              :key="item.value"
              class="tab"
              :class="{ active: modelValue === item.value }"
              @click="$emit('update:modelValue', item.value)">
        {{ item.label }}
      </button>
    </div>

    <div class="divider"></div>

  </div>
</template>

<script>
export default {
  name: "OrderTabs",
  props: {
    modelValue: String,
     keyword: String  
  },
  data() {
    return {
      list: [
        { label: "全部", value: "all" },
        { label: "期待", value: "wait" }
      ]
    };
  }
};
</script>

<style scoped>

/* 外层布局 */
.tabs-box {
  display: flex;
  flex-direction: column;
  gap: 1rem;

}

/* ===========================
   QQ 风格搜索框
=========================== */
.search {
  display: flex;
  align-items: center;
  background: #f2f3f5;        /* QQ/微信同款浅灰底 */
  padding: 0.5rem 0.8rem;
  border-radius: 1.2rem;       /* 大圆角更柔和 */
}

.search-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.6;
  margin-right: 0.5rem;
}

.search-input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 0.9rem;
   color: #999;
  outline: none;
}

/* ===========================
   Tabs 区域
=========================== */
.tabs {
  display: flex;
  gap: 0.6rem;
}

.tab {
  padding: 0.4rem 1rem;
  border-radius: 999px;
  background: #f4faff;
  border: 0.0625rem solid #cce0ff;
  font-size: 0.8rem;
  color: #3a3a3a;
}

.tab.active {
  background: #337ecc;
  color: #fff;
  border-color: #337ecc;
}

/* ===========================
   更高级的下划线
=========================== */
.divider {
  width: 100%;
  border-bottom: 0.05rem solid #e6e6e6;
  margin-top: -0.5rem;
}

</style>
