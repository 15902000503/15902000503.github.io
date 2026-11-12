/** 中英双语静态文本 */
export interface LocalizedText {
  en: string
  zh: string
}

export interface ProductColor {
  name: string
  hex: string
}

export interface ProductReview {
  id: number
  author: string
  rating: number
  date: string
  content: LocalizedText
}

export interface Product {
  id: number
  slug: string
  name: LocalizedText
  brand: string
  category: CategorySlug
  price: number
  oldPrice?: number
  rating: number
  reviewCount: number
  images: string[]
  colors: ProductColor[]
  sizes: string[]
  badges: Array<'new' | 'sale' | 'hot'>
  shortDescription: LocalizedText
  description: LocalizedText
  features: LocalizedText[]
  inStock: boolean
  reviews: ProductReview[]
}

export type CategorySlug = 'mens' | 'women' | 'kids' | 'wellness'

export interface Category {
  slug: CategorySlug
  name: LocalizedText
  image: string
  productCount: number
}

/** 商品列表页筛选状态 */
export interface FilterState {
  category: string
  badge: string
  priceMin: string
  priceMax: string
  sizes: string[]
  colors: string[]
}
