import request from '@/plugins/axios'

// 用戶相關 API
export const userApi = {
  // 登錄
  login(data) {
    return request({
      url: '/user/login',
      method: 'post',
      data,
    })
  },
  // 獲取用戶信息
  getUserInfo() {
    return request({
      url: '/user/info',
      method: 'get',
    })
  },
  // 登出
  logout() {
    return request({
      url: '/user/logout',
      method: 'post',
    })
  },
}

// 商品相關 API
export const productApi = {
  // 獲取商品列表
  getProducts(params) {
    return request({
      url: '/products',
      method: 'get',
      params,
    })
  },
  // 獲取商品詳情
  getProductDetail(id) {
    return request({
      url: `/products/${id}`,
      method: 'get',
    })
  },
  // 搜索商品
  searchProducts(keyword, params = {}) {
    return request({
      url: '/products/search',
      method: 'get',
      params: {
        keyword,
        ...params,
      },
    })
  },
}

// 購物車相關 API
export const cartApi = {
  // 獲取購物車列表
  getCartList() {
    return request({
      url: '/cart/list',
      method: 'get',
    })
  },
  // 添加商品到購物車
  addToCart(data) {
    return request({
      url: '/cart/add',
      method: 'post',
      data,
    })
  },
  // 更新購物車商品數量
  updateCartItem(id, data) {
    return request({
      url: `/cart/update/${id}`,
      method: 'put',
      data,
    })
  },
  // 刪除購物車商品
  removeCartItem(id) {
    return request({
      url: `/cart/remove/${id}`,
      method: 'delete',
    })
  },
  // 清空購物車
  clearCart() {
    return request({
      url: '/cart/clear',
      method: 'post',
    })
  },
}

// 訂單相關 API
export const orderApi = {
  // 創建訂單
  createOrder(data) {
    return request({
      url: '/order/create',
      method: 'post',
      data,
    })
  },
  // 獲取訂單列表
  getOrderList(params) {
    return request({
      url: '/order/list',
      method: 'get',
      params,
    })
  },
  // 獲取訂單詳情
  getOrderDetail(orderNo) {
    return request({
      url: `/order/detail/${orderNo}`,
      method: 'get',
    })
  },
  // 取消訂單
  cancelOrder(orderNo) {
    return request({
      url: `/order/cancel/${orderNo}`,
      method: 'put',
    })
  },
  // 確認收貨
  confirmReceipt(orderNo) {
    return request({
      url: `/order/confirm/${orderNo}`,
      method: 'put',
    })
  },
}

// 上傳文件
export const uploadFile = (file, onUploadProgress) => {
  const formData = new FormData()
  formData.append('file', file)
  
  return request({
    url: '/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  })
}

// 導出所有 API
export default {
  user: userApi,
  product: productApi,
  cart: cartApi,
  order: orderApi,
  uploadFile,
}
