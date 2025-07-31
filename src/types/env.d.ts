/// <reference types="vite/client" />

// 環境變量類型定義
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_API_BASE_URL: string
    readonly VITE_APP_USE_MOCK: string
    [key: string]: string
  }
}

// 擴展 Window 接口
interface Window {
  __VUE_APP__: any
}

// 擴展 ImportMeta 接口
interface ImportMetaEnv {
  readonly MODE: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean
  [key: string]: string | boolean | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
