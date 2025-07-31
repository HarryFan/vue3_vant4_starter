import * as Vant from 'vant'
import 'vant/lib/index.css'

export default {
  install(app) {
    // 全局配置
    // Vant 4 中不再需要手動設置默認選項
    // 可以直接在調用時傳入選項
    
    // 添加全局方法
    if (Vant.showToast) {
      app.config.globalProperties.$toast = Vant.showToast
    }

    if (Vant.showConfirmDialog) {
      app.config.globalProperties.$dialog = Vant.showConfirmDialog
    }

    if (Vant.showNotify) {
      app.config.globalProperties.$notify = Vant.showNotify
    }

    if (Vant.ImagePreview) {
      app.config.globalProperties.$imagePreview = Vant.ImagePreview
    }

    // 註冊所有組件
    Object.entries(Vant).forEach(([name, component]) => {
      // 跳過非組件的導出
      if (name.startsWith('set') || name === 'default' || name === 'version') {
        return
      }
      
      // 註冊組件，添加 van- 前綴
      const componentName = name.startsWith('van-') ? name : `van-${name}`
      app.component(componentName, component)
    })
  },
}
