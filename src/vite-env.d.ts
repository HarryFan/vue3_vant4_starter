/// <reference types="vite/client" />

// 聲明 .vue 文件模塊
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 環境變量類型定義
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_API_BASE_URL: string
  readonly VITE_APP_USE_MOCK: string
  // 更多環境變量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
