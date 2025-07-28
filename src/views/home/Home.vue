<template>
  <div class="home">
    <van-nav-bar title="首頁" />
    
    <van-search
      v-model="searchText"
      placeholder="搜尋商品"
      shape="round"
      @search="onSearch"
    />

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(banner, index) in banners" :key="index">
        <img :src="banner.image" class="banner-img" />
      </van-swipe-item>
    </van-swipe>

    <van-grid :column-num="2" :gutter="10" class="product-grid">
      <van-grid-item
        v-for="product in products"
        :key="product.id"
        :to="`/product/${product.id}`"
      >
        <van-image
          :src="product.image"
          height="120"
          fit="cover"
        />
        <div class="product-info">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-price">${{ product.price }}</div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { showToast } from 'vant'
import { api } from '@/api/mock'

const searchText = ref('')
const products = ref([])
const banners = ref([
  { id: 1, image: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg' },
  { id: 2, image: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg' }
])

// 加載商品列表
const loadProducts = async () => {
  try {
    const { data } = await api.getProducts()
    products.value = data
  } catch (error) {
    showToast('加載商品失敗')
    console.error(error)
  }
}

// 搜尋功能
const onSearch = (val) => {
  showToast(`搜尋: ${val}`)
}

onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.home {
  padding-bottom: 20px;
}

.my-swipe {
  height: 200px;
  margin: 10px 0;
  border-radius: 8px;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-grid {
  margin-top: 10px;
}

.product-info {
  padding: 8px;
  text-align: left;
}

.product-name {
  font-size: 14px;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-price {
  color: var(--danger-color);
  font-weight: bold;
  font-size: 16px;
}
</style>
