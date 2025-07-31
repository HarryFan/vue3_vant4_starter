/// <reference types="vite/client" />

// 環境變量類型
export interface EnvConfig {
  VITE_APP_TITLE: string
  VITE_APP_API_BASE_URL: string
  VITE_APP_USE_MOCK: string
  [key: string]: string
}

// API 响應類型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}

// 分頁參數類型
export interface PaginationParams {
  current?: number
  pageSize?: number
  total?: number
  [key: string]: any
}

// 分頁響應類型
export interface PaginationResponse<T = any> {
  code: number
  message: string
  data: {
    list: T[]
    total: number
    current: number
    pageSize: number
  }
  success: boolean
}

// 錯誤類型
export interface ErrorType {
  code: number
  message: string
}

// 請求配置類型
export interface RequestConfig {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  params?: any
  data?: any
  headers?: Record<string, string>
  showLoading?: boolean
  timeout?: number
  [key: string]: any
}

// 存儲類型
export interface StorageConfig {
  key: string
  value: any
  expires?: number | string
  [key: string]: any
}

// 驗證規則類型
export interface ValidateRule {
  required?: boolean
  message?: string
  pattern?: RegExp
  validator?: (rule: any, value: any, callback: (error?: Error) => void) => void
  [key: string]: any
}

// 頁面路由類型
export interface RouteMeta {
  title?: string
  icon?: string
  cache?: boolean
  requiresAuth?: boolean
  roles?: string[]
  [key: string]: any
}

// 菜單項類型
export interface MenuItem {
  path: string
  name: string
  meta: RouteMeta
  children?: MenuItem[]
  [key: string]: any
}

// 全局狀態類型
export interface GlobalState {
  loading: boolean
  error: ErrorType | null
  token: string | null
  userInfo: any
  [key: string]: any
}

// 全局屬性類型
export interface GlobalProperties {
  $filters: {
    formatDate: (value: string | number, format?: string) => string
    formatCurrency: (value: number | string, decimals?: number) => string
    formatPhone: (phone: string) => string
    formatFileSize: (bytes: number) => string
  }
  [key: string]: any
}

// Vant 組件類型
export interface VantComponent {
  name: string
  props: Record<string, any>
  emits: Record<string, any>
  [key: string]: any
}

// 自定義指令類型
export interface DirectiveOptions {
  mounted: (el: Element, binding: any, vnode: any) => void
  updated: (el: Element, binding: any, vnode: any) => void
  unmounted?: (el: Element) => void
  [key: string]: any
}

// 配置類型
export interface Config {
  theme: {
    primaryColor: string
    successColor: string
    warningColor: string
    dangerColor: string
    [key: string]: any
  }
  api: {
    baseURL: string
    timeout: number
    [key: string]: any
  }
  [key: string]: any
}
