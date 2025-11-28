import { createRouter, createWebHistory } from 'vue-router'

import MakeupHome from '@/pages/MakeupHome.vue'
import MessagePage from '@/pages/MessagePage.vue'
import ChatPage from '@/pages/ChatPage.vue'
import DiscoverPage from '@/pages/DiscoverPage.vue'
import MinePage from '@/pages/MinePage.vue'
import PublishPage from '@/pages/PublishPage.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'shop', component: MakeupHome },
    { path: '/message', name: 'message', component: MessagePage },
    { path: '/chat/:id', name: 'chat', component: ChatPage, props: true },
    { path: '/discover', name: 'discover', component: DiscoverPage },
    { path: '/publish', name: 'publish', component: PublishPage },
    { path: '/mine', name: 'mine', component: MinePage },
    { 
      path: '/work/:id', 
      name: 'workDetail', 
      component: () => import('@/pages/WorkDetail.vue'),
      props: true 
    }
  ]
})

export default router
