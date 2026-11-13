import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { clearAuthOrigin, isAuthRoute, recordAuthOrigin } from '@/composables/useAuthRedirect'
import homeRoutes from './modules/home'
import shopRoutes from './modules/shop'
import pageRoutes from './modules/pages'
import authRoutes from './modules/auth'

/**
 * 路由按业务域拆分在 ./modules 下，新增页面只需在对应模块追加一条记录。
 * 所有前台页面共用 DefaultLayout（页头 / 页脚 / Toast）。
 */
const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === 'hash'
      ? createWebHashHistory(import.meta.env.VITE_BASE)
      : createWebHistory(import.meta.env.VITE_BASE),
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }
    return to.hash ? { behavior: 'smooth', el: to.hash } : { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [...homeRoutes, ...shopRoutes, ...pageRoutes],
    },
    // auth 页无页头页脚（全屏卡片式），置于通配路由之前，避免依赖排序巧合
    ...authRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'FallbackNotFound',
      component: () => import('@/views/_core/fallback/not-found.vue'),
    },
  ],
})

// 进入登录/注册/找回密码页前记录来源页面，供登录成功后回跳
router.beforeEach((to, from) => {
  if (isAuthRoute(to.name)) {
    // 从非 auth 页进入时记录；auth 页之间互相切换（如登录↔注册）保留原来源
    // 404 兜底页不作为来源，否则登录成功后会跳回坏地址
    if (from.name && !isAuthRoute(from.name) && from.name !== 'FallbackNotFound') {
      recordAuthOrigin(from.fullPath)
    }
  } else if (isAuthRoute(from.name)) {
    // 离开 auth 页（未登录直接离开）时清除来源记录
    clearAuthOrigin()
  }
})

export default router
