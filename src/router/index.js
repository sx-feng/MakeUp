import { createRouter, createWebHistory } from 'vue-router'

import MakeupHome from '@/pages/MakeupHome.vue'
import MessagePage from '@/pages/MessagePage.vue'
import ChatPage from '@/pages/ChatPage.vue'
import DiscoverPage from '@/pages/DiscoverPage.vue'
import MinePage from '@/pages/MinePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'shop', component: MakeupHome },
    { path: '/message', name: 'message', component: MessagePage },
    { path: '/chat/:id', name: 'chat', component: ChatPage, props: true },
    { path: '/discover', name: 'discover', component: DiscoverPage },
    { path: '/mine', name: 'mine', component: MinePage }
  ]
})

export default router
