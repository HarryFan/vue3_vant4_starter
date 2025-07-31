<template>
  <div class="home">
    <h1>Welcome to Vant Starter</h1>
    <p>This is a minimal starter template with Vue 3, Vant 4, and Tailwind CSS.</p>
    <van-button type="primary" to="/about">Go to About</van-button>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

p {
  margin-bottom: 20px;
  color: #666;
}
</style>
