/**
 * 本地存儲工具類
 * 封裝了 localStorage 和 sessionStorage 的常用操作
 */

const storage = {
  // 存儲類型：localStorage 或 sessionStorage
  type: 'localStorage',

  /**
   * 設置存儲類型
   * @param {string} type - 存儲類型：'local' 或 'session'
   */
  setType(type) {
    this.type = type === 'session' ? 'sessionStorage' : 'localStorage'
  },

  /**
   * 獲取存儲對象
   * @returns {Storage} 存儲對象
   */
  getStorage() {
    return this.type === 'localStorage' ? window.localStorage : window.sessionStorage
  },

  /**
   * 設置存儲項
   * @param {string} key - 鍵名
   * @param {*} value - 值（會自動轉為JSON字符串）
   */
  set(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    this.getStorage().setItem(key, value)
  },

  /**
   * 獲取存儲項
   * @param {string} key - 鍵名
   * @param {*} defaultValue - 默認值（可選）
   * @returns {*} 存儲的值或默認值
   */
  get(key, defaultValue = null) {
    const value = this.getStorage().getItem(key)
    if (value === null) return defaultValue
    try {
      return JSON.parse(value)
    } catch (e) {
      return value || defaultValue
    }
  },

  /**
   * 移除存儲項
   * @param {string} key - 鍵名
   */
  remove(key) {
    this.getStorage().removeItem(key)
  },

  /**
   * 清空所有存儲項
   */
  clear() {
    this.getStorage().clear()
  },

  /**
   * 檢查存儲項是否存在
   * @param {string} key - 鍵名
   * @returns {boolean} 是否存在
   */
  has(key) {
    return this.get(key) !== null
  },

  /**
   * 獲取所有存儲項的鍵名
   * @returns {string[]} 鍵名數組
   */
  keys() {
    return Object.keys(this.getStorage())
  },

  /**
   * 設置帶過期時間的存儲項
   * @param {string} key - 鍵名
   * @param {*} value - 值
   * @param {number} expire - 過期時間（秒）
   */
  setWithExpire(key, value, expire) {
    const item = {
      value,
      expire: Date.now() + expire * 1000,
    }
    this.set(key, item)
  },

  /**
   * 獲取帶過期時間的存儲項
   * @param {string} key - 鍵名
   * @param {*} defaultValue - 默認值（可選）
   * @returns {*} 存儲的值或默認值
   */
  getWithExpire(key, defaultValue = null) {
    const item = this.get(key)
    if (item === null) return defaultValue
    
    // 檢查是否過期
    if (Date.now() > item.expire) {
      this.remove(key)
      return defaultValue
    }
    
    return item.value
  },
}

// 導出默認實例
export default storage

// 導出快捷方法
export const local = {
  ...storage,
  type: 'localStorage',
}

export const session = {
  ...storage,
  type: 'sessionStorage',
}
