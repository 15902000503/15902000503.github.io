<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Heart, Leaf, Sparkles, Truck } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const { t } = useI18n()

const stats = [
  { value: '50K+', label: 'about.statCustomers' },
  { value: '1,200+', label: 'about.statProducts' },
  { value: '30+', label: 'about.statCountries' },
  { value: '24/7', label: 'about.statSupport' },
]

const values = [
  { icon: Heart, title: 'about.value1Title', desc: 'about.value1Desc' },
  { icon: Leaf, title: 'about.value2Title', desc: 'about.value2Desc' },
  { icon: Truck, title: 'about.value3Title', desc: 'about.value3Desc' },
  { icon: Sparkles, title: 'about.value4Title', desc: 'about.value4Desc' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative h-72 overflow-hidden sm:h-96">
      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop"
        alt="about"
        class="absolute inset-0 size-full object-cover"
      />
      <div class="absolute inset-0 bg-black/55" />
      <div
        class="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center text-white"
      >
        <h1 class="text-3xl font-bold sm:text-4xl">{{ t('about.title') }}</h1>
        <p class="max-w-2xl text-sm text-white/90 sm:text-base">
          {{ t('about.heroSubtitle') }}
        </p>
      </div>
    </section>

    <!-- 数据 -->
    <section class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="-mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card v-for="s in stats" :key="s.label" class="text-center">
          <CardContent class="p-5">
            <p class="text-2xl font-bold text-primary">{{ s.value }}</p>
            <p class="mt-1 text-xs text-muted-foreground sm:text-sm">
              {{ t(s.label) }}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- 故事 -->
    <section class="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h2 class="mb-4 text-2xl font-bold">{{ t('about.storyTitle') }}</h2>
      <p class="mb-4 leading-7 text-muted-foreground">{{ t('about.story1') }}</p>
      <p class="leading-7 text-muted-foreground">{{ t('about.story2') }}</p>
    </section>

    <!-- 价值观 -->
    <section class="bg-muted/40 py-14">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 class="mb-8 text-center text-2xl font-bold">
          {{ t('about.valuesTitle') }}
        </h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card v-for="v in values" :key="v.title">
            <CardContent class="flex flex-col items-center gap-3 p-6 text-center">
              <component :is="v.icon" class="size-8 text-primary" stroke-width="1.5" />
              <p class="font-semibold">{{ t(v.title) }}</p>
              <p class="text-sm text-muted-foreground">{{ t(v.desc) }}</p>
            </CardContent>
          </Card>
        </div>
        <div class="mt-10 text-center">
          <RouterLink to="/products">
            <Button size="lg">{{ t('about.cta') }}</Button>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
