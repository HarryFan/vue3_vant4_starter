import axios from 'axios'
import { showToast } from 'vant'
import { useUserStore } from '@/store/user'

// 創建 axios 實例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 10000, // 請求超時時間
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// 請求攔截器
service.interceptors.request.use(
  (config) => {
    // 在發送請求之前做些什麼
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    // 對請求錯誤做些什麼
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// 響應攔截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 這裡根據後端返回的狀態碼進行判斷
    if (res.code !== 200) {
      showToast(res.message || 'Error')
      // 未登錄或 token 過期
      if (res.code === 401) {
        // 重新登錄
        const userStore = useUserStore()
        userStore.logout()
        // 重定向到登錄頁
        window.location.href = '/login'
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.error('Response Error:', error)
    let message = error.message
    if (error.response) {
      // 服務器返回的錯誤狀態碼
      const status = error.response.status
      switch (status) {
        case 400:
          message = '請求參數錯誤'
          break
        case 401:
          message = '未授權，請重新登錄'
          // 清除 token 並跳轉到登錄頁
          const userStore = useUserStore()
          userStore.logout()
          window.location.href = '/login'
          break
        case 403:
          message = '拒絕訪問'
          break
        case 404:
          message = '請求地址出錯'
          break
        case 500:
          message = '服務器內部錯誤'
          break
        default:
          message = '網絡錯誤'
      }
    } else if (error.message.includes('timeout')) {
      message = '請求超時，請稍後再試'
    } else if (error.message.includes('Network Error')) {
      message = '網絡連接失敗，請檢查網絡'
    }
    showToast(message)
    return Promise.reject(error)
  }
)

export default service
