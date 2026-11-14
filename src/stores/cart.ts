import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface CartItem {
  productId: number
  name: string
  price: number
  image: string
  color?: string
  size?: string
  qty: number
}

/** 简易购物车（本地静态演示，无后端） */
export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const count = computed(() => items.value.reduce((s, i) => s + i.qty, 0))
  const total = computed(() =>
    items.value.reduce((s, i) => s + i.price * i.qty, 0),
  )

  function addItem(item: Omit<CartItem, 'qty'>, qty = 1) {
    if (!Number.isSafeInteger(qty) || qty < 1) return

    const key = `${item.productId}-${item.color ?? ''}-${item.size ?? ''}`
    const found = items.value.find(
      (i) =>
        `${i.productId}-${i.color ?? ''}-${i.size ?? ''}` === key,
    )
    if (found) {
      const nextQty = found.qty + qty
      if (Number.isSafeInteger(nextQty)) found.qty = nextQty
    }
    else items.value.push({ ...item, qty })
  }

  function removeItem(index: number) {
    items.value.splice(index, 1)
  }

  function clear() {
    items.value = []
  }

  return { items, count, total, addItem, removeItem, clear }
})
