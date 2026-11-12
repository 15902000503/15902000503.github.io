import type { LocalizedText } from '@/data/types'

export interface BannerItem {
  id: number
  image: string
  title: LocalizedText
  subtitle: LocalizedText
  buttonText: LocalizedText
  link: string
}

/** 轮播图静态数据，可自行增删改 */
export function bannerLoopData(): BannerItem[] {
  return [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop',
      title: { en: 'Bold Collections', zh: '潮流新品' },
      subtitle: {
        en: 'Elevate your style with daring designs.',
        zh: '大胆设计，升级你的风格。',
      },
      buttonText: { en: 'Shop Now', zh: '立即选购' },
      link: '/products',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop',
      title: { en: 'Summer Sale', zh: '夏季大促' },
      subtitle: {
        en: 'Get UPTO 40% OFF on your 1st order.',
        zh: '首单立享最高 40% 优惠。',
      },
      buttonText: { en: 'Explore Deals', zh: '查看折扣' },
      link: '/products?badge=sale',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
      title: { en: 'New Arrivals', zh: '新品上市' },
      subtitle: {
        en: 'Discover the latest trends for the season.',
        zh: '探索本季最新潮流。',
      },
      buttonText: { en: 'View More', zh: '了解更多' },
      link: '/products?badge=new',
    },
  ]
}
