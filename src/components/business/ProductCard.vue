<script setup lang="ts">
import { computed } from 'vue'
import { ShoppingBag } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import type { Product } from '@/data/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import StarRating from './StarRating.vue'
import { useLocalized } from '@/composables/useLocalized'
import { usePrice } from '@/composables/usePrice'
import { useCartStore } from '@/stores/cart'

const props = defineProps<{ product: Product }>()

const { t } = useI18n()
const { pick } = useLocalized()
const { format } = usePrice()
const cart = useCartStore()

const discount = computed(() =>
  props.product.oldPrice
    ? Math.round(
        (1 - props.product.price / props.product.oldPrice) * 100,
      )
    : 0,
)

function addToCart() {
  if (!props.product.inStock) {
    toast.error(t('common.outOfStock'))
    return
  }
  cart.addItem(
    {
      productId: props.product.id,
      name: pick(props.product.name),
      price: props.product.price,
      image: props.product.images[0]!,
      size: props.product.sizes[0],
    },
    1,
  )
  toast.success(t('detail.addedToCart', { name: pick(props.product.name) }))
}
</script>

<template>
  <Card
    class="group relative overflow-hidden border-0 bg-transparent shadow-none"
  >
    <RouterLink :to="`/products/${product.slug}`" class="block">
      <div
        class="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted"
      >
        <img
          :src="product.images[0]"
          :alt="pick(product.name)"
          loading="lazy"
          class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <img
          v-if="product.images[1]"
          :src="product.images[1]"
          :alt="pick(product.name)"
          loading="lazy"
          class="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <div class="absolute left-2 top-2 flex flex-col gap-1">
          <Badge
            v-for="b in product.badges"
            :key="b"
            class="rounded-none"
            :variant="b === 'sale' ? 'destructive' : 'default'"
          >
            {{ t(`common.${b}`) }}
          </Badge>
        </div>
        <span
          v-if="discount > 0"
          class="absolute right-2 top-2 rounded bg-destructive/90 px-1.5 py-0.5 text-xs font-semibold text-white"
        >
          -{{ discount }}%
        </span>
      </div>
    </RouterLink>

    <div class="flex flex-col gap-1 px-1 pt-3 pb-1">
      <p class="text-xs uppercase tracking-wide text-muted-foreground">
        {{ product.brand }}
      </p>
      <RouterLink
        :to="`/products/${product.slug}`"
        class="line-clamp-1 font-medium hover:text-primary"
      >
        {{ pick(product.name) }}
      </RouterLink>
      <div class="flex items-center gap-1.5">
        <StarRating :rating="product.rating" size="sm" />
        <span class="text-xs text-muted-foreground">
          ({{ product.reviewCount }} {{ t('common.reviews') }})
        </span>
      </div>
      <div class="mt-1 flex items-center justify-between">
        <div class="flex items-baseline gap-2">
          <span class="text-lg font-semibold text-primary">
            {{ format(product.price) }}
          </span>
          <span
            v-if="product.oldPrice"
            class="text-sm text-muted-foreground line-through"
          >
            {{ format(product.oldPrice) }}
          </span>
        </div>
        <Button
          size="icon"
          variant="outline"
          class="size-8 rounded-full opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100"
          :disabled="!product.inStock"
          :title="t(product.inStock ? 'detail.addToCart' : 'common.outOfStock')"
          @click="addToCart"
        >
          <ShoppingBag class="size-4" />
        </Button>
      </div>
    </div>
  </Card>
</template>
