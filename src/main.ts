import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// 引入 Tailwind CSS
import './style.css';

// Vant 4 按需引入
import { Button, showToast } from 'vant';
import 'vant/lib/index.css';

// 創建 Vue 實例
const app = createApp(App);

// 註冊 Vant 組件
app.use(Button);

// 使用 Pinia
const pinia = createPinia();
app.use(pinia);

// 使用路由
app.use(router);

// 全局錯誤處理
app.config.errorHandler = (err: unknown, vm, info) => {
  console.error('Global Error:', err);
  showToast({
    message: '發生錯誤，請稍後再試',
    position: 'bottom',
  });
};

// 掛載應用
app.mount('#app');
