<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowRight, Headset, RotateCcw, ShieldCheck, Truck } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import BannerCarousel from '@/components/business/BannerCarousel.vue'
import ProductCard from '@/components/business/ProductCard.vue'
import SectionTitle from '@/components/business/SectionTitle.vue'
import { categories } from '@/data/categories'
import { products } from '@/data/products'
import { useLocalized } from '@/composables/useLocalized'

const { t } = useI18n()
const { pick } = useLocalized()

const featured = products.filter((p) => p.badges.includes('hot')).slice(0, 4)
const arrivals = products.filter((p) => p.badges.includes('new')).slice(0, 4)

const services = [
  { icon: Truck, key: 'freeShipping' },
  { icon: RotateCcw, key: 'returns' },
  { icon: Headset, key: 'support' },
  { icon: ShieldCheck, key: 'payment' },
]
</script>

<template>
  <div>
    <div class="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <BannerCarousel />
    </div>

    <!-- 分类选购 -->
    <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <SectionTitle
        :title="t('home.categoriesTitle')"
        :subtitle="t('home.categoriesSubtitle')"
        :view-all-to="`/products`"
        :view-all-label="t('common.viewAll')"
      />
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <RouterLink
          v-for="cat in categories"
          :key="cat.slug"
          :to="`/products?category=${cat.slug}`"
        >
          <Card class="group relative overflow-hidden">
            <div class="aspect-[4/3] overflow-hidden">
              <img
                :src="cat.image"
                :alt="pick(cat.name)"
                loading="lazy"
                class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
              />
            </div>
            <div class="absolute inset-x-0 bottom-0 p-4 text-white">
              <p class="font-semibold">{{ pick(cat.name) }}</p>
              <p class="text-xs text-white/80">
                {{ cat.productCount }} {{ t('products.title') }}
              </p>
            </div>
          </Card>
        </RouterLink>
      </div>
    </section>

    <!-- 精选推荐 -->
    <section class="bg-muted/40 py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          :title="t('home.featuredTitle')"
          :subtitle="t('home.featuredSubtitle')"
          view-all-to="/products"
          :view-all-label="t('common.viewAll')"
        />
        <div class="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          <ProductCard v-for="p in featured" :key="p.id" :product="p" />
        </div>
      </div>
    </section>

    <!-- 双促销位 -->
    <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div class="grid gap-4 md:grid-cols-2">
        <RouterLink to="/products?category=mens">
          <div
            class="group relative h-64 overflow-hidden rounded-xl sm:h-80"
          >
            <img
              src="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1200&auto=format&fit=crop"
              :alt="t('home.promoMenTitle')"
              loading="lazy"
              class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-black/40" />
            <div
              class="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-white"
            >
              <h3 class="text-2xl font-bold sm:text-3xl">
                {{ t('home.promoMenTitle') }}
              </h3>
              <p class="text-sm text-white/90">
                {{ t('home.promoMenSubtitle') }}
              </p>
              <Button
                variant="secondary"
                class="mt-2 gap-1"
              >
                {{ t('common.shopNow') }} <ArrowRight class="size-4" />
              </Button>
            </div>
          </div>
        </RouterLink>
        <RouterLink to="/products?category=women">
          <div
            class="group relative h-64 overflow-hidden rounded-xl sm:h-80"
          >
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
              :alt="t('home.promoWomenTitle')"
              loading="lazy"
              class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-black/40" />
            <div
              class="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-white"
            >
              <h3 class="text-2xl font-bold sm:text-3xl">
                {{ t('home.promoWomenTitle') }}
              </h3>
              <p class="text-sm text-white/90">
                {{ t('home.promoWomenSubtitle') }}
              </p>
              <Button variant="secondary" class="mt-2 gap-1">
                {{ t('common.shopNow') }} <ArrowRight class="size-4" />
              </Button>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- 新品上市 -->
    <section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
      <SectionTitle
        :title="t('home.newArrivalsTitle')"
        :subtitle="t('home.newArrivalsSubtitle')"
        view-all-to="/products?badge=new"
        :view-all-label="t('common.viewAll')"
      />
      <div class="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
        <ProductCard v-for="p in arrivals" :key="p.id" :product="p" />
      </div>
    </section>

    <!-- 服务保障 -->
    <section class="border-t bg-muted/40">
      <div
        class="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4"
      >
        <div
          v-for="s in services"
          :key="s.key"
          class="flex items-center gap-3"
        >
          <component
            :is="s.icon"
            class="size-8 shrink-0 text-primary"
            stroke-width="1.5"
          />
          <div>
            <p class="text-sm font-semibold">
              {{ t(`home.services.${s.key}.title`) }}
            </p>
            <p class="text-xs text-muted-foreground">
              {{ t(`home.services.${s.key}.desc`) }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
