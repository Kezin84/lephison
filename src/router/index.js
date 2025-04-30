import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import DealReg from '@/views/DealReg.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/dealreg', name: 'DealReg', component: DealReg }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
