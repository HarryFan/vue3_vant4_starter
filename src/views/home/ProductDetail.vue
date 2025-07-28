<template>
  <div class="product-detail">
    <van-nav-bar
      :title="product.name || '商品詳情'"
      left-arrow
      @click-left="$router.back()"
    />
    
    <van-swipe class="product-swipe" :autoplay="3000" v-if="product.images">
      <van-swipe-item v-for="(image, index) in product.images" :key="index">
        <img :src="image" class="product-image" />
      </van-swipe-item>
    </van-swipe>
    
    <div class="product-info">
      <div class="product-price">
        <span class="current-price">${{ product.price }}</span>
        <van-tag type="danger" v-if="product.price < 200">特價</van-tag>
      </div>
      <div class="product-title">{{ product.name }}</div>
      <div class="product-desc">{{ product.description }}</div>
    </div>
    
    <van-cell-group class="product-cell-group">
      <van-cell title="商品規格" value="請選擇" is-link />
      <van-cell title="商品評價" value="4.9分" is-link />
      <van-cell title="優惠活動" value="滿100減10元" />
    </van-cell-group>
    
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="onClickService" />
      <van-goods-action-icon icon="cart-o" text="購物車" :badge="cartCount" @click="onClickCart" />
      <van-goods-action-button 
        type="warning" 
        text="加入購物車" 
        @click="addToCart" 
      />
      <van-goods-action-button 
        type="danger" 
        text="立即購買" 
        @click="buyNow" 
      />
    </van-goods-action>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { showToast } from 'vant'
import { api } from '@/api/mock'

const route = useRoute()
const productId = route.params.id
const product = ref({})
const cartCount = ref(0)

// 加載商品詳情
const loadProductDetail = async () => {
  try {
    const { data } = await api.getProductDetail(productId)
    product.value = data
  } catch (error) {
    showToast('加載商品詳情失敗')
    console.error(error)
  }
}

// 加入購物車
const addToCart = () => {
  cartCount.value++
  showToast('已加入購物車')
}

// 立即購買
const buyNow = () => {
  showToast('開始結算')
}

// 點擊客服
const onClickService = () => {
  showToast('聯繫客服')
}

// 點擊購物車
const onClickCart = () => {
  showToast('查看購物車')
}

onMounted(() => {
  loadProductDetail()
})
</script>

<style scoped>
.product-detail {
  padding-bottom: 50px;
  min-height: 100vh;
  background-color: #f7f8fa;
}

.product-swipe {
  height: 300px;
  background-color: #fff;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 15px;
  background-color: #fff;
  margin-bottom: 10px;
}

.product-price {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.current-price {
  color: var(--danger-color);
  font-size: 24px;
  font-weight: bold;
  margin-right: 10px;
}

.product-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-desc {
  color: #666;
  line-height: 1.6;
  font-size: 14px;
}

.product-cell-group {
  margin-bottom: 10px;
}
</style>
