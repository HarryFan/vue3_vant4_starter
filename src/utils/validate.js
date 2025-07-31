/**
 * 校驗手機號碼
 * @param {string} phone 手機號碼
 * @returns {boolean} 是否為有效手機號碼
 */
export function validatePhone(phone) {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(phone)
}

/**
 * 校驗郵箱
 * @param {string} email 郵箱
 * @returns {boolean} 是否為有效郵箱
 */
export function validateEmail(email) {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(email)
}

/**
 * 校驗身份證號碼
 * @param {string} idCard 身份證號碼
 * @returns {boolean} 是否為有效身份證號碼
 */
export function validateIdCard(idCard) {
  const reg = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/
  if (!reg.test(idCard)) return false
  
  // 校驗碼校驗
  const weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 加權因子
  const checkCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] // 校驗碼
  
  let sum = 0
  for (let i = 0; i < 17; i++) {
    sum += parseInt(idCard[i]) * weight[i]
  }
  
  const mod = sum % 11
  return idCard[17].toUpperCase() === checkCode[mod]
}

/**
 * 校驗密碼強度
 * @param {string} password 密碼
 * @returns {number} 密碼強度：0-弱 1-中 2-強
 */
export function checkPasswordStrength(password) {
  if (!password) return 0
  
  let strength = 0
  
  // 長度大於等於8
  if (password.length >= 8) strength++
  
  // 包含大小寫字母
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  
  // 包含數字和特殊字符
  if (/\d/.test(password) && /[^a-zA-Z0-9]/.test(password)) strength++
  
  return Math.min(strength, 2)
}

/**
 * 校驗是否為空
 * @param {*} value 值
 * @returns {boolean} 是否為空
 */
export function isEmpty(value) {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' && value.trim() === '') return true
  if (Array.isArray(value) && value.length === 0) return true
  if (typeof value === 'object' && Object.keys(value).length === 0) return true
  return false
}

/**
 * 校驗URL
 * @param {string} url URL地址
 * @returns {boolean} 是否為有效URL
 */
export function validateURL(url) {
  const reg = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/
  return reg.test(url)
}

/**
 * 校驗IP地址
 * @param {string} ip IP地址
 * @returns {boolean} 是否為有效IP地址
 */
export function validateIP(ip) {
  const reg = /^(\d{1,3}\.){3}\d{1,3}$/
  if (!reg.test(ip)) return false
  
  return ip.split('.').every(segment => {
    const num = parseInt(segment, 10)
    return num >= 0 && num <= 255
  })
}

/**
 * 校驗是否為數字
 * @param {*} value 值
 * @returns {boolean} 是否為數字
 */
export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * 校驗是否為整數
 * @param {*} value 值
 * @returns {boolean} 是否為整數
 */
export function isInteger(value) {
  return isNumber(value) && value % 1 === 0
}

/**
 * 校驗是否為浮點數
 * @param {*} value 值
 * @returns {boolean} 是否為浮點數
 */
export function isFloat(value) {
  return isNumber(value) && value % 1 !== 0
}

/**
 * 校驗是否為正數
 * @param {*} value 值
 * @returns {boolean} 是否為正數
 */
export function isPositive(value) {
  return isNumber(value) && value > 0
}

/**
 * 校驗是否為負數
 * @param {*} value 值
 * @returns {boolean} 是否為負數
 */
export function isNegative(value) {
  return isNumber(value) && value < 0
}

/**
 * 校驗是否在指定範圍內
 * @param {number} value 值
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {boolean} 是否在範圍內
 */
export function isInRange(value, min, max) {
  if (!isNumber(value)) return false
  return value >= min && value <= max
}

/**
 * 校驗是否為有效的日期字符串
 * @param {string} dateStr 日期字符串
 * @returns {boolean} 是否為有效日期
 */
export function isValidDate(dateStr) {
  if (typeof dateStr !== 'string') return false
  const date = new Date(dateStr)
  return date.toString() !== 'Invalid Date' && !isNaN(date.getTime())
}

/**
 * 校驗是否為有效的JSON字符串
 * @param {string} str 字符串
 * @returns {boolean} 是否為有效JSON
 */
export function isValidJSON(str) {
  if (typeof str !== 'string') return false
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}

/**
 * 校驗是否為有效的URL參數
 * @param {string} param 參數
 * @returns {boolean} 是否為有效URL參數
 */
export function isValidURLParam(param) {
  return typeof param === 'string' && /^[a-zA-Z0-9-_]+$/.test(param)
}

export default {
  validatePhone,
  validateEmail,
  validateIdCard,
  checkPasswordStrength,
  isEmpty,
  validateURL,
  validateIP,
  isNumber,
  isInteger,
  isFloat,
  isPositive,
  isNegative,
  isInRange,
  isValidDate,
  isValidJSON,
  isValidURLParam,
}
