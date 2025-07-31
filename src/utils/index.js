/**
 * 工具函數入口文件
 * 集中導出所有工具函數，方便全局引入
 */

// 導入並重新導出所有工具函數
export * from './validate'
export * from './storage'

// 防抖函數
export function debounce(fn, delay = 300) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 節流函數
export function throttle(fn, delay = 300) {
  let canRun = true
  return function(...args) {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(this, args)
      canRun = true
    }, delay)
  }
}

// 格式化日期
export function formatDate(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return ''
  
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  
  const o = {
    'M+': d.getMonth() + 1, // 月份
    'D+': d.getDate(), // 日
    'H+': d.getHours(), // 小時
    'm+': d.getMinutes(), // 分
    's+': d.getSeconds(), // 秒
    'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
    'S': d.getMilliseconds() // 毫秒
  }
  
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) 
        ? o[k] 
        : (`00${o[k]}`).substr((`${o[k]}`).length))
    }
  }
  
  return fmt
}

// 格式化金額
export function formatMoney(money, decimals = 2, sep = ',') {
  if (money === null || money === undefined || isNaN(money)) return '0.00'
  
  let s = parseFloat((money + '').replace(/[^\d.-]/g, '')).toFixed(decimals) + ''
  const l = s.split('.')[0].split('').reverse()
  const r = s.split('.')[1]
  let t = ''
  
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? sep : '')
  }
  
  return t.split('').reverse().join('') + (r ? '.' + r : '')
}

// 深拷貝
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  
  const cloneObj = new obj.constructor()
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = deepClone(obj[key])
    }
  }
  
  return cloneObj
}

// 過濾對象中的空值
export function filterEmptyValue(obj) {
  const newObj = {}
  
  Object.keys(obj).forEach(key => {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      newObj[key] = obj[key]
    }
  })
  
  return newObj
}

// 生成唯一ID
export function generateId(prefix = '') {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).substr(2)}`
}

// 獲取URL參數
export function getUrlParam(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}

// 複製文本到剪貼板
export function copyToClipboard(text) {
  return new Promise((resolve, reject) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    document.body.appendChild(textarea)
    textarea.select()
    
    try {
      const successful = document.execCommand('copy')
      document.body.removeChild(textarea)
      if (successful) {
        resolve()
      } else {
        reject(new Error('複製失敗'))
      }
    } catch (err) {
      document.body.removeChild(textarea)
      reject(err)
    }
  })
}

// 判斷是否為移動設備
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// 判斷是否為微信瀏覽器
export function isWechat() {
  return /MicroMessenger/i.test(navigator.userAgent)
}

// 判斷是否為iOS設備
export function isIOS() {
  return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
}

// 判斷是否為Android設備
export function isAndroid() {
  return /(Android|Adr)/i.test(navigator.userAgent)
}

// 獲取圖片URL的Base64
export function getImageBase64(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      canvas.width = img.width
      canvas.height = img.height
      
      ctx.drawImage(img, 0, 0, img.width, img.height)
      
      const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
      const dataURL = canvas.toDataURL(`image/${ext}`)
      
      resolve(dataURL)
    }
    
    img.onerror = () => {
      reject(new Error('圖片加載失敗'))
    }
    
    img.src = url
  })
}

// 下載文件
export function downloadFile(url, filename) {
  const a = document.createElement('a')
  a.href = url
  a.download = filename || 'download'
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

// 生成隨機顏色
export function getRandomColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')}`
}

// 數字轉大寫金額
export function digitUppercase(n) {
  if (!n) return '零元整'
  
  const fraction = ['角', '分']
  const digit = [
    '零', '壹', '貳', '叄', '肆',
    '伍', '陸', '柒', '捌', '玖'
  ]
  const unit = [
    ['元', '萬', '億'],
    ['', '拾', '佰', '仟']
  ]
  
  let num = Math.abs(n)
  let s = ''
  
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(num * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  
  s = s || '整'
  num = Math.floor(num)
  
  for (let i = 0; i < unit[0].length && num > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && num > 0; j++) {
      p = digit[num % 10] + unit[1][j] + p
      num = Math.floor(num / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  
  return s.replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整')
}
