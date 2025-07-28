// 模擬用戶數據
export const mockUsers = [
  { id: 1, username: 'user1', password: '123456', name: '張三', avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg' },
  { id: 2, username: 'user2', password: '123456', name: '李四', avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/dog.jpeg' }
]

// 模擬商品數據
export const mockProducts = [
  { 
    id: 1, 
    name: '商品A', 
    price: 100, 
    image: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg', 
    description: '這是一個很棒的產品A',
    images: [
      'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg',
      'https://fastly.jsdelivr.net/npm/@vant/assets/ipad2.jpeg'
    ]
  },
  { 
    id: 2, 
    name: '商品B', 
    price: 200, 
    image: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg', 
    description: '這是一個很棒的產品B',
    images: [
      'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg',
      'https://fastly.jsdelivr.net/npm/@vant/assets/ipad2.jpeg'
    ]
  },
  { 
    id: 3, 
    name: '商品C', 
    price: 300, 
    image: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg', 
    description: '這是一個很棒的產品C',
    images: [
      'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg',
      'https://fastly.jsdelivr.net/npm/@vant/assets/ipad2.jpeg'
    ]
  }
]

// 模擬 API 請求
export const api = {
  // 登入
  login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.username === username && u.password === password)
        if (user) {
          resolve({ code: 200, data: { ...user, token: 'mock_token_' + user.id } })
        } else {
          reject({ code: 401, message: '用戶名或密碼錯誤' })
        }
      }, 500)
    })
  },

  // 獲取商品列表
  getProducts() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ code: 200, data: mockProducts })
      }, 300)
    })
  },

  // 獲取商品詳情
  getProductDetail(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = mockProducts.find(p => p.id === Number(id))
        if (product) {
          resolve({ code: 200, data: product })
        } else {
          reject({ code: 404, message: '商品不存在' })
        }
      }, 300)
    })
  }
}
