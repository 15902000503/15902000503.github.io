<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  User,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { categories } from '@/data/categories'
import { useLocalized } from '@/composables/useLocalized'
import { useCartStore } from '@/stores/cart'
import LanguageSwitch from './LanguageSwitch.vue'

const { t } = useI18n()
const { pick } = useLocalized()
const route = useRoute()
const router = useRouter()
const cart = useCartStore()

const keyword = ref('')
const mobileOpen = ref(false)

const navLinks = computed(() => [
  { to: '/', label: t('menu.home') },
  ...categories.map((c) => ({
    to: `/products?category=${c.slug}`,
    label: pick(c.name),
  })),
  { to: '/about', label: t('menu.about') },
])

function search() {
  const q = keyword.value.trim()
  mobileOpen.value = false
  router.push({ path: '/products', query: q ? { q } : {} })
}

function isActive(to: string) {
  return route.fullPath === to
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full">
    <!-- 顶部促销条 -->
    <div
      class="bg-primary px-4 py-1.5 text-center text-xs font-medium text-primary-foreground sm:text-sm"
    >
      {{ t('header.topBanner') }}
    </div>

    <!-- 主栏 -->
    <div class="border-b bg-background">
      <div
        class="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6"
      >
        <Sheet v-model:open="mobileOpen">
          <SheetTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="lg:hidden"
              :aria-label="t('header.menu')"
            >
              <Menu class="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="w-72 p-0">
            <SheetHeader class="border-b px-4 py-3 text-left">
              <SheetTitle class="flex items-center gap-1.5 text-lg">
                <Sparkles class="size-5 text-primary" />
                Bagisto Store
              </SheetTitle>
            </SheetHeader>
            <nav class="flex flex-col p-2">
              <RouterLink
                v-for="link in navLinks"
                :key="link.to"
                :to="link.to"
                class="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent"
                :class="isActive(link.to) && 'text-primary'"
                @click="mobileOpen = false"
              >
                {{ link.label }}
              </RouterLink>
            </nav>
          </SheetContent>
        </Sheet>

        <RouterLink
          to="/"
          class="flex shrink-0 items-center gap-1.5 text-xl font-bold tracking-tight"
        >
          <Sparkles class="size-6 text-primary" />
          <span>Bagisto <span class="text-primary">Store</span></span>
        </RouterLink>

        <!-- 搜索框 -->
        <form
          class="mx-auto hidden max-w-xl flex-1 items-center gap-2 md:flex"
          @submit.prevent="search"
        >
          <div class="relative flex-1">
            <Input
              v-model="keyword"
              :placeholder="t('header.searchPlaceholder')"
              class="h-10 pr-10"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              class="absolute right-0 top-0 h-10 w-10"
              :aria-label="t('header.search')"
            >
              <Search class="size-4" />
            </Button>
          </div>
        </form>

        <div class="ml-auto flex items-center gap-1">
          <LanguageSwitch />
          <Button variant="ghost" size="icon" :title="t('header.account')">
            <User class="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            class="hidden sm:inline-flex"
            :title="t('header.wishlist')"
          >
            <Heart class="size-5" />
          </Button>
          <RouterLink to="/cart">
            <Button variant="ghost" size="icon" :title="t('header.cart')">
              <ShoppingBag class="size-5" />
              <Badge
                v-if="cart.count > 0"
                class="absolute -right-0.5 -top-0.5 size-5 rounded-full p-0 text-center text-[10px] leading-5"
              >
                {{ cart.count }}
              </Badge>
            </Button>
          </RouterLink>
        </div>
      </div>

      <!-- 移动端搜索 -->
      <div class="px-4 pb-3 md:hidden">
        <form class="relative" @submit.prevent="search">
          <Input
            v-model="keyword"
            :placeholder="t('header.searchPlaceholder')"
            class="h-10 pr-10"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            class="absolute right-0 top-0 h-10 w-10"
            :aria-label="t('header.search')"
          >
            <Search class="size-4" />
          </Button>
        </form>
      </div>
    </div>

    <!-- 分类导航 -->
    <nav class="hidden border-b bg-background lg:block">
      <ul
        class="mx-auto flex max-w-7xl items-center gap-1 px-6 text-sm font-semibold tracking-wide"
      >
        <li v-for="link in navLinks" :key="link.to">
          <RouterLink
            :to="link.to"
            class="inline-block border-b-2 border-transparent px-3 py-3 uppercase transition-colors hover:border-primary hover:text-primary"
            :class="isActive(link.to) && 'border-primary text-primary'"
          >
            {{ link.label }}
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/products?badge=sale"
            class="inline-block border-b-2 border-transparent px-3 py-3 uppercase text-red-600 hover:border-red-600"
          >
            {{ t('common.sale') }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
