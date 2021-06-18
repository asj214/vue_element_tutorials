export default [
  {
    path: 'users',
    meta: {
      name: '직원 관리'
    },
    component: {
      render (c) {
        return c('router-view')
      }
    },
    children: [
      {
        path: '/users',
        name: 'UserList',
        meta: {
          name: '목록'
        },
        component: () => import('../views/users/UserList')
      },
      {
        path: 'create',
        name: 'UserForm',
        meta: {
          name: '등록'
        },
        component: () => import('../views/users/UserForm')
      },
      {
        path: ':id',
        name: 'UserDetail',
        meta: {
          name: '상세'
        },
        component: () => import('../views/users/UserForm')
      }
    ]
  }
]
