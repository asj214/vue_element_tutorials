import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import { ID_TOKEN_KEY } from '@/common/configs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: 'administrator',
      email: 'admin@test.com'
    },
    token: null,
    isAuthenticated: false
  },
  getters: {
    currentUser (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.isAuthenticated
    }
  },
  mutations: {
    SET_AUTH (state, user) {
      state.isAuthenticated = true
      state.user = user
      state.token = user.token
      localStorage.setItem(ID_TOKEN_KEY, user.token)
      Vue.axios.defaults.headers.common.Authorization = `Bearer ${user.token}`
    },
    SET_CHECK_AUTH (state, user) {
      state.isAuthenticated = true
      state.user = user
      state.token = user.token
    },
    PURGE_AUTH (state) {
      state.isAuthenticated = false
      state.user = {}
      localStorage.removeItem(ID_TOKEN_KEY)
    }
  },
  actions: {
    async LOGIN_INIT (context, credentials) {
      await context.dispatch('LOGIN', credentials)
      await context.dispatch('LOGIN_CHECK_AUTH')
    },
    async LOGIN (context, credentials) {
      const resp = await Vue.axios.post('auth/login', credentials)
      if (resp.status === 200) {
        context.commit('SET_AUTH', resp.data)
      }
      return resp
    },
    LOGOUT (context) {
      context.commit('PURGE_AUTH')
    },
    async CHECK_AUTH (context) {
      const { status, data } = await Vue.axios.get('auth/me')
      if ([401].includes(status)) {
        context.commit('PURGE_AUTH')
        router.push({ name: 'Login', query: { redirect: window.location.pathname } })
      } else {
        context.commit('SET_CHECK_AUTH', data)
      }
    }
  }
})
