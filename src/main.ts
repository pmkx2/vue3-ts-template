/*
  路由: vue-router [https://router.vuejs.org/zh/guide/]
  状态管理: pinia [https://pinia.vuejs.org]
*/

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
