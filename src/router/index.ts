import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import publicRouter from './modules/public' // public

import Home from '@/pages/Home/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes.concat(publicRouter),
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
