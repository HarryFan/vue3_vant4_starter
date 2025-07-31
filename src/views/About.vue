<template>
  <div class="about">
    <van-nav-bar title="關於我們" />
    
    <div class="about-content">
      <van-image
        round
        width="100"
        height="100"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/logo.png"
        class="logo"
      />
      
      <h1>Vue3 + Vant4 移動端模板</h1>
      
      <van-cell-group inset class="info-group">
        <van-cell title="版本" value="v1.0.0" />
        <van-cell title="作者" value="Vue3 Vant4 團隊" />
        <van-cell title="GitHub" is-link url="https://github.com/yourusername/vue3-vant4-starter" />
      </van-cell-group>
      
      <div class="tech-section">
        <h2>技術棧</h2>
        <van-grid :column-num="2" :border="false">
          <van-grid-item
            v-for="(tech, index) in techStack"
            :key="index"
            :icon="tech.icon"
            :text="tech.name"
          />
        </van-grid>
      </div>
      
      <div class="contact-section">
        <h2>聯繫我們</h2>
        <van-button type="primary" block icon="envelop-o" class="contact-btn">
          發送郵件
        </van-button>
      </div>
    </div>
    
    <div class="copyright">
      <p>© 2025 Vue3 Vant4 模板</p>
      <p>僅供學習交流使用</p>
    </div>
  </div>
</template>

<script setup>
const techStack = [
  { name: 'Vue 3', icon: 'gem-o' },
  { name: 'Vant 4', icon: 'shop-o' },
  { name: 'Vite', icon: 'lightning-o' },
  { name: 'Pinia', icon: 'bag-o' }
]
</script>

<style scoped>
.about {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.about-content {
  flex: 1;
  padding: 0 16px;
  text-align: center;
}

.logo {
  margin: 30px 0 20px;
  background-color: #fff;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 20px;
  margin-bottom: 30px;
  color: #323233;
  font-weight: 500;
}

h2 {
  font-size: 16px;
  color: #969799;
  margin: 25px 0 15px;
  font-weight: normal;
  text-align: left;
  padding-left: 10px;
}

.info-group {
  margin: 0 0 20px;
  border-radius: 8px;
  overflow: hidden;
}

.tech-section {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  margin: 0 16px 20px;
}

.contact-section {
  padding: 0 10px;
}

.contact-btn {
  margin-top: 10px;
  border-radius: 20px;
}

.copyright {
  margin-top: 30px;
  color: #969799;
  font-size: 12px;
  line-height: 1.6;
}

:deep(.van-grid-item__content) {
  padding: 16px 8px;
  background-color: transparent;
}

:deep(.van-grid-item__text) {
  margin-top: 8px;
  font-size: 12px;
  color: #646566;
}
</style>
