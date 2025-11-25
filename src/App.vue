<template>
  <div id="app" class="app-container">
    <!-- 主内容区域（路由页面） -->
    <router-view />
    <!-- 固定底部导航 --> 
      <BottomNav v-model="currentTab" />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
/* 整个应用全局样式 */
.app-container {
  width: 100%;
  max-width: 480px; /* 设置为适合手机设备 */
  margin: 0 auto;
  background: #f5f6fa;
  min-height: 100vh;
  position: relative;
  padding-bottom: 70px; /* 给底部导航预留空间 */
  box-sizing: border-box;
}

/* 去掉默认 margin 与 padding */
body, html {
  margin: 0;
  padding: 0;
  background: #f5f6fa;
}

</style>
