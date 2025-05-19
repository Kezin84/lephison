import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import DealReg from '@/views/DealReg.vue'
import CustomerManage from '@/views/CustomerManage.vue'
import DataList from '@/views/DataList.vue'
import ImportExcel from '@/views/ImportExcel.vue' // ✅ thêm dòng này

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/dealreg', name: 'DealReg', component: DealReg },
  { path: '/customers', name: 'CustomerManage', component: CustomerManage },
  { path: '/datalist', name: 'DataList', component: DataList },
  { path: '/import-excel', name: 'ImportExcel', component: ImportExcel } // ✅ thêm route mới
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
