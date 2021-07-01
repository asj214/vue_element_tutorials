import Vue from 'vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import locale from 'element-ui/lib/locale/lang/ko'
import App from './App.vue'
import './common/api.service'
import { ID_TOKEN_KEY } from '@/common/configs'

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

const enhanceAccessToken = () => {
  const accessToken = localStorage.getItem(ID_TOKEN_KEY)
  if (!accessToken) {
    return store.dispatch('LOGOUT')
  }
  Vue.axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  store.dispatch('CHECK_AUTH')
}

enhanceAccessToken()

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
