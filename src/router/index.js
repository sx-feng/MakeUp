import { createRouter, createWebHistory } from 'vue-router'
import MakeupHome from '@/pages/MakeupHome.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MakeupHome,
  },

]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
