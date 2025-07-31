import axios from 'axios'
import { Toast } from 'vant'
import { userStore } from '@/store/user'
import router from '@/router'

// 創建 axios 實例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL || '/api',
  timeout: 30000, // 請求超時時間
  withCredentials: true, // 跨域請求時發送 cookies
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// 請求攔截器
service.interceptors.request.use(
  (config) => {
    console.log('[Axios] 請求發起:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      hasToken: !!userStore.userInfo?.token
    })
    
    // 如果 token 存在，則在請求頭中添加 token
    if (userStore.userInfo?.token) {
      config.headers['Authorization'] = `Bearer ${userStore.userInfo.token}`
    }
    
    // 添加時間戳，防止緩存
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: new Date().getTime(),
      }
    }
    
    // 顯示 loading
    if (config.showLoading !== false) {
      Toast.loading({
        message: '加載中...',
        forbidClick: true,
        loadingType: 'spinner',
      })
    }
    
    return config
  },
  (error) => {
    // 對請求錯誤做些什麼
    Toast.clear()
    return Promise.reject(error)
  }
)

// 響應攔截器
service.interceptors.response.use(
  (response) => {
    // 隱藏 loading
    Toast.clear()
    
    console.log('[Axios] 請求成功:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    })
    
    const res = response.data
    
    // 這裡根據後端返回的狀態碼進行判斷
    if (res.code === 200) {
      return res.data
    } else {
      console.warn('[Axios] 請求異常:', {
        url: response.config.url,
        code: res.code,
        message: res.message
      })
      
      // 彈出錯誤提示
      if (res.message) {
        Toast({
          message: res.message,
          position: 'bottom',
        })
      }
      
      // 未登錄或 token 過期
      if (res.code === 401) {
        // 直接使用導入的 userStore
        userStore.logout()
        
        // 跳轉到登錄頁
        router.push({
          path: '/login',
          query: { redirect: router.currentRoute.value.fullPath },
        })
      }
      
      return Promise.reject(res.message || 'Error')
    }
  },
  (error) => {
    // 隱藏 loading
    Toast.clear()
    
    console.error('[Axios] 請求錯誤:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message
    })
    
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
          // 直接使用導入的 userStore
          userStore.logout()
          
          router.push({
            path: '/login',
            query: { redirect: router.currentRoute.value.fullPath },
          })
          break
        case 403:
          message = '拒絕訪問'
          break
        case 404:
          message = '請求地址出錯'
          break
        case 408:
          message = '請求超時'
          break
        case 500:
          message = '服務器內部錯誤'
          break
        case 501:
          message = '服務未實現'
          break
        case 502:
          message = '網關錯誤'
          break
        case 503:
          message = '服務不可用'
          break
        case 504:
          message = '網關超時'
          break
        case 505:
          message = 'HTTP版本不受支持'
          break
        default:
          message = '網絡錯誤'
      }
      
      // 服務器返回的錯誤信息
      if (error.response.data && error.response.data.message) {
        message = error.response.data.message
      }
    } else if (error.message.includes('timeout')) {
      message = '請求超時，請稍後再試'
    } else if (error.message.includes('Network Error')) {
      message = '網絡連接失敗，請檢查網絡'
    }
    
    // 彈出錯誤提示
    Toast({
      message,
      position: 'bottom',
    })
    
    return Promise.reject(error)
  }
)

// 導出 axios 實例
export default service

// 導出常用的請求方法
export const get = (url, params = {}, config = {}) => {
  return service({
    url,
    method: 'get',
    params,
    ...config,
  })
}

export const post = (url, data = {}, config = {}) => {
  return service({
    url,
    method: 'post',
    data,
    ...config,
  })
}

export const put = (url, data = {}, config = {}) => {
  return service({
    url,
    method: 'put',
    data,
    ...config,
  })
}

export const del = (url, data = {}, config = {}) => {
  return service({
    url,
    method: 'delete',
    data,
    ...config,
  })
}

// 導出文件上傳方法
export const upload = (url, file, data = {}, config = {}) => {
  const formData = new FormData()
  formData.append('file', file)
  
  // 添加其他表單數據
  Object.keys(data).forEach(key => {
    formData.append(key, data[key])
  })
  
  return service({
    url,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...config,
  })
}
