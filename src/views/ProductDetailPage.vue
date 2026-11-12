<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import { Check, Minus, Plus, Truck } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import ProductGallery from '@/components/business/ProductGallery.vue'
import ProductCard from '@/components/business/ProductCard.vue'
import SectionTitle from '@/components/business/SectionTitle.vue'
import StarRating from '@/components/business/StarRating.vue'
import { findCategory } from '@/data/categories'
import { findProduct, relatedProducts } from '@/data/products'
import { useLocalized } from '@/composables/useLocalized'
import { usePrice } from '@/composables/usePrice'
import { useCartStore } from '@/stores/cart'

const { t } = useI18n()
const { pick } = useLocalized()
const { format } = usePrice()
const route = useRoute()
const router = useRouter()
const cart = useCartStore()

const product = computed(() => findProduct(String(route.params.slug)))
const related = computed(() =>
  product.value ? relatedProducts(product.value) : [],
)
const category = computed(() =>
  product.value ? findCategory(product.value.category) : undefined,
)

const selectedColor = ref<string | undefined>()
const selectedSize = ref<string | undefined>()
const qty = ref(1)

// 切换商品时重置选择
watch(product, (p) => {
  selectedColor.value = p?.colors[0]?.name
  selectedSize.value = undefined
  qty.value = 1
})

const discount = computed(() => {
  const p = product.value
  return p?.oldPrice
    ? Math.round((1 - p.price / p.oldPrice) * 100)
    : 0
})

function validate(): boolean {
  const p = product.value
  if (!p) return false
  if (p.sizes.length && !selectedSize.value) {
    toast.error(t('detail.selectSize'))
    return false
  }
  return true
}

function addToCart() {
  const p = product.value
  if (!p || !validate()) return
  cart.addItem(
    {
      productId: p.id,
      name: pick(p.name),
      price: p.price,
      image: p.images[0]!,
      color: selectedColor.value,
      size: selectedSize.value,
    },
    qty.value,
  )
  toast.success(t('detail.addedToCart', { name: pick(p.name) }))
}

function buyNow() {
  addToCart()
  if (validate()) router.push('/cart')
}
</script>

<template>
  <div v-if="product" class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
    <!-- 面包屑 -->
    <nav
      class="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
    >
      <RouterLink to="/" class="hover:text-primary">
        {{ t('detail.home') }}
      </RouterLink>
      <span>/</span>
      <RouterLink to="/products" class="hover:text-primary">
        {{ t('detail.allProducts') }}
      </RouterLink>
      <template v-if="category">
        <span>/</span>
        <RouterLink
          :to="`/products?category=${category.slug}`"
          class="hover:text-primary"
        >
          {{ pick(category.name) }}
        </RouterLink>
      </template>
      <span>/</span>
      <span class="text-foreground">{{ pick(product.name) }}</span>
    </nav>

    <!-- 主信息区 -->
    <div class="grid gap-8 lg:grid-cols-2">
      <ProductGallery :images="product.images" :alt="pick(product.name)" />

      <div>
        <p class="text-sm uppercase tracking-wide text-muted-foreground">
          {{ product.brand }}
        </p>
        <h1 class="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          {{ pick(product.name) }}
        </h1>

        <div class="mt-3 flex items-center gap-3">
          <StarRating :rating="product.rating" />
          <a href="#reviews" class="text-sm text-muted-foreground hover:text-primary">
            {{ product.reviewCount }} {{ t('common.reviews') }}
          </a>
          <template v-for="b in product.badges" :key="b">
            <Badge :variant="b === 'sale' ? 'destructive' : 'default'">
              {{ t(`common.${b}`) }}
            </Badge>
          </template>
        </div>

        <div class="mt-5 flex items-baseline gap-3">
          <span class="text-3xl font-bold text-primary">
            {{ format(product.price) }}
          </span>
          <span
            v-if="product.oldPrice"
            class="text-lg text-muted-foreground line-through"
          >
            {{ format(product.oldPrice) }}
          </span>
          <span
            v-if="discount > 0"
            class="rounded bg-destructive/10 px-1.5 py-0.5 text-sm font-semibold text-destructive"
          >
            -{{ discount }}% {{ t('common.off') }}
          </span>
        </div>

        <p class="mt-4 leading-6 text-muted-foreground">
          {{ pick(product.shortDescription) }}
        </p>

        <Separator class="my-6" />

        <!-- 颜色 -->
        <div v-if="product.colors.length" class="mb-5">
          <p class="mb-2 text-sm font-semibold">
            {{ t('common.color') }}:
            <span class="font-normal text-muted-foreground">
              {{ selectedColor }}
            </span>
          </p>
          <div class="flex gap-2.5">
            <button
              v-for="color in product.colors"
              :key="color.hex"
              type="button"
              :title="color.name"
              class="flex size-9 items-center justify-center rounded-full border-2 transition-transform hover:scale-110"
              :class="
                selectedColor === color.name
                  ? 'border-primary'
                  : 'border-border'
              "
              @click="selectedColor = color.name"
            >
              <span
                class="size-6 rounded-full"
                :style="{ backgroundColor: color.hex }"
              />
            </button>
          </div>
        </div>

        <!-- 尺码 -->
        <div v-if="product.sizes.length" class="mb-5">
          <p class="mb-2 text-sm font-semibold">{{ t('common.size') }}</p>
          <div class="flex flex-wrap gap-2">
            <Button
              v-for="size in product.sizes"
              :key="size"
              type="button"
              variant="outline"
              class="min-w-12"
              :class="
                selectedSize === size &&
                'border-primary bg-primary text-primary-foreground hover:bg-primary/90'
              "
              @click="selectedSize = size"
            >
              {{ size }}
            </Button>
          </div>
        </div>

        <!-- 数量 + 操作 -->
        <div class="mb-5 flex items-center gap-4">
          <p class="text-sm font-semibold">{{ t('common.quantity') }}</p>
          <div class="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              class="rounded-none"
              :disabled="qty <= 1"
              @click="qty--"
            >
              <Minus class="size-4" />
            </Button>
            <Input
              v-model.number="qty"
              type="number"
              min="1"
              class="h-9 w-14 border-x text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Button
              variant="ghost"
              size="icon"
              class="rounded-none"
              @click="qty++"
            >
              <Plus class="size-4" />
            </Button>
          </div>
        </div>

        <div class="flex flex-wrap gap-3">
          <Button size="lg" class="flex-1 sm:flex-none" @click="addToCart">
            {{ t('detail.addToCart') }}
          </Button>
          <Button size="lg" variant="secondary" @click="buyNow">
            {{ t('detail.buyNow') }}
          </Button>
        </div>

        <div
          class="mt-5 flex flex-col gap-2 rounded-lg bg-muted/50 p-4 text-sm"
        >
          <p class="flex items-center gap-2">
            <Check
              class="size-4 text-green-600"
              :class="!product.inStock && 'text-destructive'"
            />
            {{ product.inStock ? t('common.inStock') : t('common.outOfStock') }}
          </p>
          <p class="flex items-center gap-2 text-muted-foreground">
            <Truck class="size-4" /> {{ t('home.services.freeShipping.title') }}
            — {{ t('home.services.freeShipping.desc') }}
          </p>
          <p class="text-muted-foreground">
            {{ t('common.sku') }}: {{ product.slug.toUpperCase() }}
          </p>
        </div>
      </div>
    </div>

    <!-- 描述 Tabs -->
    <div class="mt-12">
      <Tabs id="reviews" default-value="description">
        <TabsList>
          <TabsTrigger value="description">
            {{ t('detail.description') }}
          </TabsTrigger>
          <TabsTrigger value="info">
            {{ t('detail.additionalInfo') }}
          </TabsTrigger>
          <TabsTrigger value="reviews">
            {{ t('detail.reviews') }} ({{ product.reviews.length }})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" class="space-y-4">
          <p class="leading-7 text-muted-foreground">
            {{ pick(product.description) }}
          </p>
          <div>
            <h3 class="mb-2 font-semibold">
              {{ t('detail.features') }}
            </h3>
            <ul class="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li v-for="f in product.features" :key="f.en">
                {{ pick(f) }}
              </li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="info">
          <table class="w-full max-w-xl text-sm">
            <tbody>
              <tr class="border-b">
                <td class="py-2.5 pr-4 font-medium text-muted-foreground">
                  {{ t('common.brand') }}
                </td>
                <td class="py-2.5">{{ product.brand }}</td>
              </tr>
              <tr class="border-b">
                <td class="py-2.5 pr-4 font-medium text-muted-foreground">
                  {{ t('products.category') }}
                </td>
                <td class="py-2.5">
                  {{ category ? pick(category.name) : product.category }}
                </td>
              </tr>
              <tr class="border-b">
                <td class="py-2.5 pr-4 font-medium text-muted-foreground">
                  {{ t('common.sku') }}
                </td>
                <td class="py-2.5">{{ product.slug.toUpperCase() }}</td>
              </tr>
              <tr class="border-b">
                <td class="py-2.5 pr-4 font-medium text-muted-foreground">
                  {{ t('common.size') }}
                </td>
                <td class="py-2.5">
                  {{ product.sizes.join(' / ') || '—' }}
                </td>
              </tr>
              <tr>
                <td class="py-2.5 pr-4 font-medium text-muted-foreground">
                  {{ t('common.color') }}
                </td>
                <td class="py-2.5">
                  {{ product.colors.map((c) => c.name).join(' / ') || '—' }}
                </td>
              </tr>
            </tbody>
          </table>
        </TabsContent>
        <TabsContent value="reviews" class="max-w-3xl">
          <div v-if="product.reviews.length" class="space-y-6">
            <div
              v-for="review in product.reviews"
              :key="review.id"
              class="rounded-lg border p-4"
            >
              <div class="mb-2 flex items-center justify-between gap-2">
                <div class="flex items-center gap-3">
                  <StarRating :rating="review.rating" size="sm" />
                  <span class="text-sm font-medium">{{ review.author }}</span>
                </div>
                <span class="text-xs text-muted-foreground">
                  {{ review.date }}
                </span>
              </div>
              <p class="text-sm text-muted-foreground">
                {{ pick(review.content) }}
              </p>
              <p class="mt-2 text-xs text-green-600">
                ✓ {{ t('detail.reviewer') }}
              </p>
            </div>
          </div>
          <p v-else class="py-8 text-center text-sm text-muted-foreground">
            {{ t('detail.noReviews') }}
          </p>
        </TabsContent>
      </Tabs>
    </div>

    <!-- 相关推荐 -->
    <section v-if="related.length" class="mt-12">
      <SectionTitle :title="t('detail.relatedTitle')" />
      <div class="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
        <ProductCard v-for="p in related" :key="p.id" :product="p" />
      </div>
    </section>
  </div>

  <!-- 商品不存在 -->
  <div v-else class="mx-auto flex max-w-7xl flex-col items-center gap-4 py-24">
    <p class="text-lg font-medium">{{ t('detail.notFound') }}</p>
    <Button @click="router.push('/products')">
      {{ t('products.allProducts') }}
    </Button>
  </div>
</template>
