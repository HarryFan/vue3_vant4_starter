<template>
  <div class="about">
    <h1>About This Project</h1>
    <p>This is a minimal starter template with the following technologies:</p>
    <ul class="tech-list">
      <li>Vue 3</li>
      <li>Vant 4</li>
      <li>Tailwind CSS</li>
      <li>Vite</li>
    </ul>
    <van-button type="default" to="/">Back to Home</van-button>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
}
</script>

<style scoped>
.about {
  padding: 20px;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.tech-list {
  margin: 20px 0;
  text-align: left;
  display: inline-block;
}

.tech-list li {
  margin: 10px 0;
  padding: 5px 10px;
  background-color: #f7f8fa;
  border-radius: 4px;
}

.van-button {
  margin-top: 20px;
}
</style>
