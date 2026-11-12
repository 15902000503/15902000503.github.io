import type { RouteRecordRaw } from 'vue-router'

/** 商城相关路由：列表 / 详情 / 购物车。新增商品域页面在此扩展 */
const routes: RouteRecordRaw[] = [
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/ProductsPage.vue'),
    meta: { titleKey: 'products.title' },
  },
  {
    path: '/products/:slug',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetailPage.vue'),
    meta: { titleKey: 'products.title', parent: 'Products' },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/CartPage.vue'),
    meta: { titleKey: 'header.cart' },
  },
]

export default routes
