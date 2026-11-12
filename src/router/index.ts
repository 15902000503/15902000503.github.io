import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: () => import('@/views/HomePage.vue') },
    { path: '/products', name: 'Products', component: () => import('@/views/ProductsPage.vue') },
    { path: '/about', name: 'About', component: () => import('@/views/AboutPage.vue') },
    {
      path: '/:pathMatch(.*)*',
      name: 'FallbackNotFound',
      component: () => import('@/views/_core/fallback/not-found.vue'),
    },
  ],
})

export default router
