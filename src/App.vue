<template>
  <div class="app-container">
    <div :style="themeVars">
      <router-view v-slot="{ Component: RouteComponent }">
        <keep-alive :include="cachedViews">
          <component :is="RouteComponent" v-if="RouteComponent" />
        </keep-alive>
      </router-view>
      
      <!-- 全局 loading -->
      <van-loading v-if="loadingStore.loading" class="global-loading" />
      
      <!-- 全局 toast -->
      <van-toast />
      
      <!-- 全局 dialog -->
      <van-dialog />
      
      <van-tabbar v-model="activeTab" route>
        <van-tabbar-item to="/home">
          <template #icon><Icon icon="mdi:home" /></template>
          首頁
        </van-tabbar-item>
        <van-tabbar-item to="/about">
          <template #icon><Icon icon="mdi:information" /></template>
          關於
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useLoadingStore } from './store/loading.js';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';

export default {
  name: 'App',
  components: { 
    Icon
  },
  
  setup() {
    // 定義主題變量
    const themeVars = {
      // 主色
      '--van-primary-color': '#1989fa',
      '--van-success-color': '#07c160',
      '--van-warning-color': '#ff976a',
      '--van-danger-color': '#ee0a24',
      // 文字
      '--van-text-color': '#323233',
      '--van-text-color-2': '#969799',
      '--van-text-color-3': '#c8c9cc',
      // 背景
      '--van-background-color': '#f7f8fa',
      // 間距
      '--van-padding-sm': '8px',
      '--van-padding-md': '12px',
      '--van-padding-lg': '16px',
      // 圓角
      '--van-border-radius-sm': '2px',
      '--van-border-radius-md': '4px',
      '--van-border-radius-lg': '8px',
      '--van-border-radius-max': '999px'
    };
    
    const activeTab = ref(0);
    const cachedViews = ref([]);
    
    // 獲取 loading store 和 route
    const loadingStore = useLoadingStore();
    const route = useRoute();

    // 根據當前路由更新激活的標籤
    const updateActiveTab = () => {
      const path = route.path;
      if (path.includes('/home')) activeTab.value = 0;
      else if (path.includes('/about')) activeTab.value = 1;
    };

    // 監聽路由變化
    watch(() => route.path, updateActiveTab);

    // 初始化時更新激活的標籤
    onMounted(updateActiveTab);

    return {
      themeVars,
      activeTab,
      cachedViews,
      loadingStore
    };
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  min-height: 100vh;
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: var(--font-size-md);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// 全局 loading 樣式
:deep(.van-loading) {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
}

// 響應式調整
@media (max-width: 768px) {
  .app-container {
    padding-bottom: 50px; // 為底部導航欄留出空間
  }
}

.global-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

.test-box {
  padding: 20px;
  margin: 20px;
  background-color: #007bff;
  color: white;
  text-align: center;
  border-radius: 8px;
}
</style>
