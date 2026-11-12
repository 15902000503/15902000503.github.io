import type { RouteRecordRaw } from 'vue-router'

/** 内容页路由：关于 / 帮助等静态页面在此扩展 */
const routes: RouteRecordRaw[] = [
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutPage.vue'),
    meta: { titleKey: 'menu.about' },
  },
]

export default routes
