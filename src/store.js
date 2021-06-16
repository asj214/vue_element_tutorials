import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import { ID_TOKEN_KEY } from '@/common/configs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Sidebar_drawer: null,
    Customizer_drawer: false,
    SidebarColor: 'white',
    SidebarBg: '',
    user: {},
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
    SET_SIDEBAR_DRAWER (state, payload) {
      state.Sidebar_drawer = payload
    },
    SET_CUSTOMIZER_DRAWER (state, payload) {
      state.Customizer_drawer = payload
    },
    SET_SIDEBAR_COLOR (state, payload) {
      state.SidebarColor = payload
    },
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
      const resp = await Vue.axios.post('login', credentials)
      if (resp.status === 200) {
        context.commit('SET_AUTH', resp.data)
      }
    },
    LOGOUT (context) {
      context.commit('PURGE_AUTH')
    },
    async CHECK_AUTH (context) {
      const { status, data } = await Vue.axios.get('users/me')
      if ([401, 403].includes(status)) {
        context.commit('PURGE_AUTH')
        router.push({ name: 'Login', query: { redirect: window.location.pathname } })
      } else {
        context.commit('SET_CHECK_AUTH', data)
      }
    }
  }
})
