<template>
  <div class="app">
    <!-- 頁面內容 -->
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedViews">
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <!-- 底部導航 -->
    <van-tabbar route v-if="showTabbar">
      <van-tabbar-item to="/home" icon="home-o">首頁</van-tabbar-item>
      <van-tabbar-item to="/about" icon="user-o">關於</van-tabbar-item>
    </van-tabbar>
    
    <!-- 全局組件 -->
    <van-toast />
    <van-dialog />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 需要緩存的組件
const cachedViews = ref(['Home', 'About'])

// 是否顯示底部導航
const showTabbar = computed(() => {
  return ['/home', '/about'].includes(route.path)
})
</script>

<style>
/* 全局樣式 */
:root {
  --primary-color: #1989fa;
  --success-color: #07c160;
  --warning-color: #ff976a;
  --danger-color: #ee0a24;
  --text-color: #323233;
  --text-secondary: #969799;
  --border-color: #ebedf0;
  --background-color: #f7f8fa;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-color);
  background-color: var(--background-color);
  -webkit-font-smoothing: antialiased;
}

/* 修復 Vant 標籤欄遮擋內容的問題 */
body {
  padding-bottom: 50px;
}

/* 全局工具類 */
.text-center {
  text-align: center;
}

.mt-10 {
  margin-top: 10px;
}

.mb-10 {
  margin-bottom: 10px;
}

.p-10 {
  padding: 10px;
}

/* 修復圖片默認樣式 */
img {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}

/* 修復表單元素 */
input, button, select, textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

/* 修復 iOS 按鈕點擊高亮 */
a, button, input, textarea {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
