import type { Category } from './types'

/** 分类静态数据，可自行增删改 */
export const categories: Category[] = [
  {
    slug: 'mens',
    name: { en: 'Men', zh: '男士' },
    image:
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=600&auto=format&fit=crop',
    productCount: 3,
  },
  {
    slug: 'women',
    name: { en: 'Women', zh: '女士' },
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop',
    productCount: 3,
  },
  {
    slug: 'kids',
    name: { en: 'Kids', zh: '童装' },
    image:
      'https://images.unsplash.com/photo-1519238203854-03560f2e1d4e?q=80&w=600&auto=format&fit=crop',
    productCount: 3,
  },
  {
    slug: 'wellness',
    name: { en: 'Wellness', zh: '健康' },
    image:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop',
    productCount: 3,
  },
]

export function findCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}
