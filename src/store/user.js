import { reactive } from 'vue'
import { api } from '@/api/mock'
import router from '@/router'

export const userStore = reactive({
  isLoggedIn: !!localStorage.getItem('token'),
  userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null'),

  // 登入
  async login(username, password) {
    try {
      const { data } = await api.login(username, password)
      this.isLoggedIn = true
      this.userInfo = data
      localStorage.setItem('token', data.token)
      localStorage.setItem('userInfo', JSON.stringify(data))
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.message || '登入失敗，請稍後再試' 
      }
    }
  },

  // 登出
  logout() {
    this.isLoggedIn = false
    this.userInfo = null
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    router.push('/login')
  },

  // 檢查登入狀態
  checkAuth() {
    if (!this.isLoggedIn && router.currentRoute.value.meta.requiresAuth) {
      router.push({ 
        name: 'Login', 
        query: { redirect: router.currentRoute.value.fullPath } 
      })
      return false
    }
    return true
  }
})
