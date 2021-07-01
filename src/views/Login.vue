<template>
  <div>
    <div class="g-center login-page" @keyup.enter="login">
      <el-form class="login-form">
        <h1 class="main-title">Authentication</h1>
        <p class="des">You Need Authorization</p>
          <el-form-item required>
            <el-input
              v-model="credentials.email"
              :autofocus="true"
              placeholder="Email"
            >
              <template slot="prepend"><i class="el-icon-message"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item required>
            <el-input
              v-model="credentials.password"
              type="password"
              placeholder="Password"
            >
              <template slot="prepend"><i class="el-icon-lock"></i></template>
            </el-input>
          </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            style="width:100%" @click.native="login" type="primary">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style scoped>
#app { display: table; width: 100%; }
.main-title { text-align: center; }
.des { text-align: center; color: #999; margin-bottom: 2em; }
.login-form { width: 400px; margin: 13% auto 0; }
.login-page { background: #fff; }
.validate-error { color : red; display: block; line-height: 20px }
</style>
<script>
export default {
  data () {
    return {
      loading: false,
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      const { status } = await this.$store.dispatch('LOGIN', { ...this.credentials })
      if (status === 200) {
        this.$router.push({ name: 'Main' })
      }
    }
  }
}
</script>
