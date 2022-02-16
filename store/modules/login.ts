import { defineStore } from 'pinia'

const login = defineStore({
  id: 'mian',
  state: () => ({
    name: '超级管理员',
  }),
  // getters
  getters: {
    nameLength: (state) => state.name.length,
  },
  // actions
  actions: {
    async insertPost(data: string) {
      // 可以做异步
      this.name = data
    },
  },
})

export default {
  login,
}
