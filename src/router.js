import { createRouter, createWebHistory } from 'vue-router'
import List from './views/List.vue'
const AddData = () => import('./views/AddData')


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/add',
      name: 'AddData',
      component: AddData
    },
  ]
})

export default router
