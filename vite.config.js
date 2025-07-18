import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    // 自動導入 Vue 相關函數
    AutoImport({
      imports: ['vue', 'vue-router']
    }),
    // 自動導入 Vant 組件
    Components({
      resolvers: [VantResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  },
  server: {
    proxy: {
      '/api/librivox': {
        target: 'https://librivox.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/librivox/, '/api')
      }
    }
  }
});
