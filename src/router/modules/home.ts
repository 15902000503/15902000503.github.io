import type { RouteRecordRaw } from 'vue-router'

/** 首页相关路由 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
    meta: { titleKey: 'menu.home' },
  },
]

export default routes
