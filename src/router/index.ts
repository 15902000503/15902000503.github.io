import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import homeRoutes from './modules/home'
import shopRoutes from './modules/shop'
import pageRoutes from './modules/pages'

/**
 * 路由按业务域拆分在 ./modules 下，新增页面只需在对应模块追加一条记录。
 * 所有前台页面共用 DefaultLayout（页头 / 页脚 / Toast）。
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        ...homeRoutes,
        ...shopRoutes,
        ...pageRoutes,
        {
          path: '/:pathMatch(.*)*',
          name: 'FallbackNotFound',
          component: () => import('@/views/_core/fallback/not-found.vue'),
        },
      ],
    },
  ],
})

export default router
