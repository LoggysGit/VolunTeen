import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '../views/MainPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    }
  ]
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('user_token') 

    if (to.meta.requiresAuth && !isAuthenticated) { next({ name: 'login' }) } 
    else { next() }
})

export default router