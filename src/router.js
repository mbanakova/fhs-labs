import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import AddData from './views/AddData.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/add',
      name: 'AddData',
      component: AddData
    },
  ]
})

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth) {
    next('/');
  } else {
    next();
  }
});
export default router
