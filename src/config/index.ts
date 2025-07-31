import { EnvConfig } from '@/types'

// 項目基本信息
export const APP_INFO = {
  name: import.meta.env.VITE_APP_TITLE || 'Vue3 Vant4 Starter',
  version: '1.0.0',
  description: 'Vue3 + Vant4 快速開發框架',
  author: 'HarryFan',
  website: 'https://github.com/HarryFan/vue3_vant4_starter',
}

// API 配置
export const API_CONFIG = {
  // API 基址
  baseURL: import.meta.env.VITE_APP_API_BASE_URL || '/api',
  // 請求超時時間
  timeout: 30000,
  // 是否使用 mock
  useMock: import.meta.env.VITE_APP_USE_MOCK === 'true',
  // 錯誤碼映射
  errorCodes: {
    401: '未登錄或登錄已過期',
    403: '無權限訪問',
    404: '請求資源不存在',
    500: '服務器內部錯誤',
    502: '網關錯誤',
    503: '服務不可用',
    504: '網關超時',
  },
}

// 主題配置
export const THEME_CONFIG = {
  // 主色
  primaryColor: '#1989fa',
  // 成功色
  successColor: '#07c160',
  // 警告色
  warningColor: '#ff976a',
  // 危險色
  dangerColor: '#ee0a24',
  // 字體
  fontFamily: '-apple-system, BlinkMacSystemFont',
}

// 存儲配置
export const STORAGE_CONFIG = {
  // token 存儲 key
  tokenKey: 'vue3_vant4_token',
  // 用戶信息存儲 key
  userInfoKey: 'vue3_vant4_userInfo',
  // 過期時間（毫秒）
  expireTime: 7 * 24 * 60 * 60 * 1000, // 7天
}

// 錯誤處理配置
export const ERROR_CONFIG = {
  // 是否顯示錯誤提示
  showErrorMessage: true,
  // 錯誤提示位置
  errorPosition: 'bottom',
  // 錯誤提示持續時間（毫秒）
  errorDuration: 2000,
}

// 路由配置
export const ROUTER_CONFIG = {
  // 是否啟用路由守衛
  enableRouterGuard: true,
  // 是否啟用路由緩存
  enableRouteCache: true,
  // 預設路由名稱
  defaultRouteName: 'home',
}

// 頁面配置
export const PAGE_CONFIG = {
  // 頁面過渡動畫
  pageTransition: {
    name: 'fade',
    mode: 'out-in',
  },
  // 頁面加載動畫
  pageLoading: {
    duration: 500,
    color: '#1989fa',
  },
}

// 系統配置
export const SYSTEM_CONFIG = {
  // 是否啟用暗色模式
  darkMode: false,
  // 是否啟用多語言
  i18n: true,
  // 默認語言
  defaultLang: 'zh-CN',
  // 系統時區
  timezone: 'Asia/Shanghai',
}
