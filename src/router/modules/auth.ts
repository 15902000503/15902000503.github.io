import type { RouteRecordRaw } from 'vue-router'

/** 账户域路由：登录 / 注册 / 忘记密码 */
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginPage.vue'),
    meta: { titleKey: 'auth.loginTitle' },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/RegisterPage.vue'),
    meta: { titleKey: 'auth.registerTitle' },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/auth/ForgotPasswordPage.vue'),
    meta: { titleKey: 'auth.forgotTitle' },
  },
]

export default routes
