import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/views/HomePage.vue') },
    { path: '/products', component: () => import('@/views/ProductsPage.vue') },
    { path: '/about', component: () => import('@/views/AboutPage.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('@/components/ui/fallback') },
  ],
})

export default router
