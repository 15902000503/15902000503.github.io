<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { SlidersHorizontal } from '@lucide/vue'
import type { FilterState } from '@/data/types'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import ProductCard from '@/components/business/ProductCard.vue'
import ProductFilters from '@/components/business/ProductFilters.vue'
import { products } from '@/data/products'
import { useLocalized } from '@/composables/useLocalized'

const { t } = useI18n()
const { pick } = useLocalized()
const route = useRoute()
const router = useRouter()

const filters = reactive<FilterState>({
  category: String(route.query.category ?? ''),
  badge: String(route.query.badge ?? ''),
  priceMin: '',
  priceMax: '',
  sizes: [],
  colors: [],
})

const sort = ref('default')
const mobileOpen = ref(false)

// URL -> 筛选（浏览器前进/后退、头部分类导航都会改 query）
watch(
  () => route.query,
  (q) => {
    filters.category = String(q.category ?? '')
    filters.badge = String(q.badge ?? '')
  },
)

// 筛选 -> URL（仅分类/标签，保持链接可分享）
watch(
  () => [filters.category, filters.badge] as const,
  ([category, badge]) => {
    const query: Record<string, string> = {}
    if (category) query.category = category
    if (badge) query.badge = badge
    if (
      String(route.query.category ?? '') !== category ||
      String(route.query.badge ?? '') !== badge
    ) {
      router.replace({ path: '/products', query })
    }
  },
)

const filtered = computed(() => {
  const q = String(route.query.q ?? '').trim().toLowerCase()
  const min = Number.parseFloat(filters.priceMin)
  const max = Number.parseFloat(filters.priceMax)

  let list = products.filter((p) => {
    if (filters.category && p.category !== filters.category) return false
    if (filters.badge && !p.badges.includes(filters.badge as never))
      return false
    if (!Number.isNaN(min) && p.price < min) return false
    if (!Number.isNaN(max) && p.price > max) return false
    if (
      filters.sizes.length &&
      !filters.sizes.some((s) => p.sizes.includes(s))
    )
      return false
    if (
      filters.colors.length &&
      !filters.colors.some((c) => p.colors.some((pc) => pc.name === c))
    )
      return false
    if (q) {
      const haystack = [
        p.name.en,
        p.name.zh,
        p.brand,
        p.shortDescription.en,
        p.shortDescription.zh,
      ]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })

  list = [...list].sort((a, b) => {
    switch (sort.value) {
      case 'priceAsc':
        return a.price - b.price
      case 'priceDesc':
        return b.price - a.price
      case 'nameAsc':
        return pick(a.name).localeCompare(pick(b.name))
      case 'ratingDesc':
        return b.rating - a.rating
      case 'newest':
        return Number(b.badges.includes('new')) - Number(a.badges.includes('new'))
      default:
        return a.id - b.id
    }
  })
  return list
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
    <div class="mb-6 flex items-center justify-between gap-4">
      <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">
        {{ t('products.title') }}
      </h1>

      <!-- 移动端筛选抽屉 -->
      <Sheet v-model:open="mobileOpen">
        <SheetTrigger as-child>
          <Button variant="outline" size="sm" class="gap-1.5 lg:hidden">
            <SlidersHorizontal class="size-4" />
            {{ t('products.filters') }}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" class="w-80 overflow-y-auto">
          <SheetHeader class="text-left">
            <SheetTitle>{{ t('products.filters') }}</SheetTitle>
          </SheetHeader>
          <ProductFilters
            :model="filters"
            class="px-4"
            @update:model="Object.assign(filters, $event)"
          />
        </SheetContent>
      </Sheet>
    </div>

    <div class="flex gap-8">
      <!-- 桌面端筛选侧栏 -->
      <aside class="hidden w-60 shrink-0 lg:block">
        <ProductFilters
          :model="filters"
          @update:model="Object.assign(filters, $event)"
        />
      </aside>

      <div class="min-w-0 flex-1">
        <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p class="text-sm text-muted-foreground">
            {{ t('products.showing', { count: filtered.length }) }}
          </p>
          <div class="flex items-center gap-2">
            <span class="text-sm text-muted-foreground">
              {{ t('products.sortBy') }}
            </span>
            <Select v-model="sort">
              <SelectTrigger class="h-9 w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="key in [
                    'default',
                    'newest',
                    'priceAsc',
                    'priceDesc',
                    'nameAsc',
                    'ratingDesc',
                  ]"
                  :key="key"
                  :value="key"
                >
                  {{ t(`products.sort.${key}`) }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div
          v-if="filtered.length"
          class="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4"
        >
          <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
        </div>

        <div
          v-else
          class="flex flex-col items-center gap-4 py-20 text-center"
        >
          <p class="text-muted-foreground">{{ t('products.noResults') }}</p>
          <Button
            variant="outline"
            @click="
              Object.assign(filters, {
                category: '',
                badge: '',
                priceMin: '',
                priceMax: '',
                sizes: [],
                colors: [],
              })
            "
          >
            {{ t('products.clearFilters') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
