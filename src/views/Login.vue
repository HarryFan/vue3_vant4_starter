<template>
  <div class="login">
    <van-nav-bar title="登入" />
    
    <div class="login-form">
      <van-image
        width="100"
        height="100"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/logo.png"
        class="logo"
      />
      
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="form.username"
            name="username"
            label="用戶名"
            placeholder="請輸入用戶名"
            :rules="[{ required: true, message: '請輸入用戶名' }]"
          />
          <van-field
            v-model="form.password"
            type="password"
            name="password"
            label="密碼"
            placeholder="請輸入密碼"
            :rules="[{ required: true, message: '請輸入密碼' }]"
          />
        </van-cell-group>

        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" :loading="loading">
            登入
          </van-button>
          
          <div class="register-link">
            還沒有帳號？<a href="#" @click.prevent="onRegister">立即註冊</a>
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import { userStore } from '@/store/user'

const route = useRoute()
const router = useRouter()
const loading = ref(false)

const form = reactive({
  username: 'user1',
  password: '123456'
})

const onSubmit = async () => {
  try {
    loading.value = true
    const { success, message } = await userStore.login(form.username, form.password)
    
    if (success) {
      showToast('登入成功')
      const redirect = route.query.redirect || '/home'
      router.replace(redirect)
    } else {
      showToast(message || '登入失敗')
    }
  } catch (error) {
    console.error('登入錯誤:', error)
    showToast('登入失敗，請稍後再試')
  } finally {
    loading.value = false
  }
}

const onRegister = () => {
  showToast('註冊功能開發中')
}
</script>

<style scoped>
.login {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.login-form {
  padding: 20px;
  margin-top: 50px;
}

.logo {
  display: block;
  margin: 0 auto 30px;
  border-radius: 50%;
  overflow: hidden;
}

.register-link {
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
  color: #969799;
}

.register-link a {
  color: var(--primary-color);
  text-decoration: none;
}
</style>
