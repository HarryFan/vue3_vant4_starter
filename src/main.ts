import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 導入插件
import vant from './plugins/vant'
import axios from './plugins/axios'
import directives from './directives'

// 導入全局樣式
import './styles/index.scss'

// 創建應用實例
const app = createApp(App)

// 使用 Pinia
const pinia = createPinia()
app.use(pinia)

// 使用路由
app.use(router)

// 使用插件
app.use(vant)
app.use(axios)
app.use(directives)

// 全局錯誤處理
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err)
  console.error('Error in component:', vm)
  console.error('Error info:', info)
  
  // 調用統一的錯誤提示組件
  import('vant').then(({ Toast }) => {
    Toast({
      type: 'fail',
      message: '發生錯誤，請稍後再試',
      position: 'bottom',
    })
  })
}

// 全局屬性
app.config.globalProperties.$filters = {
  /**
   * 格式化日期
   * @param {string|number} value - 日期字符串或時間戳
   * @param {string} format - 格式，默認 'YYYY-MM-DD'
   * @returns {string} 格式化後的日期字符串
   */
  formatDate(value, format = 'YYYY-MM-DD') {
    if (!value) return ''
    
    const date = new Date(value)
    if (isNaN(date.getTime())) return ''
    
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    
    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds)
  },
  
  /**
   * 格式化金額
   * @param {number|string} value - 金額
   * @param {number} decimals - 小數位數，默認 2
   * @returns {string} 格式化後的金額字符串
   */
  formatCurrency(value, decimals = 2) {
    if (value === null || value === undefined || value === '') return '0.00'
    
    const num = parseFloat(value)
    if (isNaN(num)) return '0.00'
    
    return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  
  /**
   * 格式化手機號碼
   * @param {string} phone - 手機號碼
   * @returns {string} 格式化後的手機號碼，如：138****8888
   */
  formatPhone(phone) {
    if (!phone) return ''
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  },
  
  /**
   * 格式化文件大小
   * @param {number} bytes - 字節數
   * @returns {string} 格式化後的文件大小，如：1.23 MB
   */
  formatFileSize(bytes) {
    if (bytes === 0) return '0 B'
    
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
}

// 掛載應用
app.mount('#app')

// 開發環境下暴露 app 實例，方便調試
if (import.meta.env.MODE === 'development') {
  window.__VUE_APP__ = app
}
