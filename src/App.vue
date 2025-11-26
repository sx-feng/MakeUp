<template>
  <div id="app" class="app-container">
    <!-- 主内容区域（路由页面）-->
    <router-view />
    <!-- 固定底部导航 -->

  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // 与当前路由名称同步，保证高亮与跳转一致
      currentTab: this.$route.name || "shop"
    };
  },
  
};
</script>

<style>
/* 整个应用全局样式 */
.app-container {
  width: 100%;
  max-width: 480px; /* 设置为适合手机设备 */
  margin: 0 auto;
  background: #ffffff;
  min-height: 100vh;
  position: relative;
  padding-bottom: 70px; /* 给底部导航预留空间 */
  box-sizing: border-box;
}

/* 去掉默认 margin 和 padding */
body, html {
  margin: 0;
  padding: 0;
  background: #f5f6fa;
}
</style>
