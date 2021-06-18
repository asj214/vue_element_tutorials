import Vue from 'vue'
import VueRouter from 'vue-router'
import user from './users'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/',
    name: 'Main',
    redirect: 'dashboard',
    component: () => import('../components/BaseLayout'),
    children: [
      {
        name: 'Dashboard',
        path: 'dashboard',
        meta: {
          name: '대시보드'
        },
        component: () => import('../views/Main')
      },
      ...user
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  hashbang: false,
  routes
})

export default router
