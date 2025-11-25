import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import BottomNav from '@/components/BottomNav.vue'

const app = createApp(App)

app.component('BottomNav', BottomNav)

app.use(router)

app.mount('#app')
