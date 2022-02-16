import { RouteRecordRaw } from 'vue-router'
import Login from '@/pages/public/Login/Login.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '用户登录',
    },
  },
]

// routes.forEach((v: RouteRecordRaw) => {
//   v.meta.check = false
// })

export default routes
