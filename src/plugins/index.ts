import type { App } from 'vue'
import vant from './vant'
import axios from './axios'
import directives from '../directives'

const plugins = [
  {
    name: 'vant',
    plugin: vant,
  },
  {
    name: 'axios',
    plugin: axios,
  },
  {
    name: 'directives',
    plugin: directives,
  },
]

/**
 * 註冊所有插件
 * @param app Vue 應用實例
 */
export function setupPlugins(app: App) {
  // 註冊插件
  plugins.forEach(({ name, plugin }) => {
    app.use(plugin)
    console.log(`Plugin ${name} has been registered.`)
  })
}

// 導出所有插件
export * from './vant'
export * from './axios'

export default {
  install(app: App) {
    setupPlugins(app)
  },
}
