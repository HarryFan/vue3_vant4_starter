import * as Vant from 'vant'
import 'vant/lib/index.css'

export default {
  install(app) {
    // 全局配置
    if (Vant.Toast) {
      Vant.Toast.setDefaultOptions({
        duration: 2000,
        position: 'bottom',
      })
      app.config.globalProperties.$toast = Vant.Toast
    }

    if (Vant.Dialog) {
      Vant.Dialog.setDefaultOptions({
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      })
      app.config.globalProperties.$dialog = Vant.Dialog
    }

    if (Vant.Notify) {
      Vant.Notify.setDefaultOptions({
        duration: 2000,
      })
      app.config.globalProperties.$notify = Vant.Notify
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
