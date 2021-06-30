import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router'
import store from '@/store'

const api = axios.create()

// 요청 인터셉터 추가
api.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 응답 인터셉터 추가
api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if ([401, 403].includes(error.response.status)) {
      Vue.axios.defaults.headers.common.Authorization = null
      store.dispatch('LOGOUT').then((res) => {
        alert('로그인 정보가 만료되어 로그아웃 되었습니다.')
        router.push({ name: 'Login', query: { redirect: window.location.pathname } })
      })
    } else if (error.response.status === 304) {
      return Promise.resolve({ status: 304 })
    }

    alert('에러가 발생했습니다.')
    return Promise.reject(error)
  }
)

Vue.use(VueAxios, api)
