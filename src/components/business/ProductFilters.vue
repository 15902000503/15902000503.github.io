<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { FilterState } from '@/data/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { categories } from '@/data/categories'
import { products } from '@/data/products'
import { useLocalized } from '@/composables/useLocalized'

const props = defineProps<{ model: FilterState }>()
const emit = defineEmits<{ 'update:model': [value: FilterState] }>()

const { t } = useI18n()
const { pick } = useLocalized()

const allSizes = [...new Set(products.flatMap((p) => p.sizes))]
const allColors = [
  ...new Map(
    products.flatMap((p) => p.colors).map((c) => [c.hex, c]),
  ).values(),
]

function patch(value: Partial<FilterState>) {
  emit('update:model', { ...props.model, ...value })
}

function toggleIn(list: string[], item: string) {
  return list.includes(item)
    ? list.filter((v) => v !== item)
    : [...list, item]
}

function reset() {
  patch({
    category: '',
    badge: '',
    priceMin: '',
    priceMax: '',
    sizes: [],
    colors: [],
  })
}
</script>

<template>
  <div class="space-y-6">
    <!-- 分类 -->
    <div>
      <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide">
        {{ t('products.category') }}
      </h3>
      <ul class="space-y-1 text-sm">
        <li>
          <button
            type="button"
            class="w-full rounded px-2 py-1.5 text-left transition-colors hover:bg-accent"
            :class="!model.category && 'font-semibold text-primary'"
            @click="patch({ category: '' })"
          >
            {{ t('products.allProducts') }}
          </button>
        </li>
        <li v-for="cat in categories" :key="cat.slug">
          <button
            type="button"
            class="w-full rounded px-2 py-1.5 text-left transition-colors hover:bg-accent"
            :class="model.category === cat.slug && 'font-semibold text-primary'"
            @click="patch({ category: cat.slug })"
          >
            {{ pick(cat.name) }}
          </button>
        </li>
      </ul>
    </div>

    <Separator />

    <!-- 标签 -->
    <div>
      <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide">
        {{ t('products.filters') }}
      </h3>
      <div class="flex flex-wrap gap-2">
        <Button
          v-for="b in ['new', 'sale', 'hot']"
          :key="b"
          type="button"
          size="sm"
          variant="outline"
          :class="model.badge === b && 'border-primary text-primary'"
          @click="patch({ badge: model.badge === b ? '' : b })"
        >
          {{ t(`common.${b}`) }}
        </Button>
      </div>
    </div>

    <Separator />

    <!-- 价格区间 -->
    <div>
      <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide">
        {{ t('products.priceRange') }}
      </h3>
      <form
        class="flex items-center gap-2"
        @submit.prevent="() => {}"
      >
        <Input
          :model-value="model.priceMin"
          type="number"
          min="0"
          :placeholder="t('products.min')"
          class="h-9"
          @update:model-value="patch({ priceMin: String($event ?? '') })"
        />
        <span class="text-muted-foreground">–</span>
        <Input
          :model-value="model.priceMax"
          type="number"
          min="0"
          :placeholder="t('products.max')"
          class="h-9"
          @update:model-value="patch({ priceMax: String($event ?? '') })"
        />
      </form>
    </div>

    <Separator />

    <!-- 尺码 -->
    <div>
      <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide">
        {{ t('products.sizes') }}
      </h3>
      <div class="flex flex-wrap gap-2">
        <Button
          v-for="size in allSizes"
          :key="size"
          type="button"
          size="sm"
          variant="outline"
          class="min-w-10"
          :class="
            model.sizes.includes(size) && 'border-primary bg-primary text-primary-foreground'
          "
          @click="patch({ sizes: toggleIn(model.sizes, size) })"
        >
          {{ size }}
        </Button>
      </div>
    </div>

    <Separator />

    <!-- 颜色 -->
    <div>
      <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide">
        {{ t('products.colors') }}
      </h3>
      <div class="flex flex-wrap gap-2.5">
        <button
          v-for="color in allColors"
          :key="color.hex"
          type="button"
          :title="color.name"
          class="size-7 rounded-full border-2 transition-transform hover:scale-110"
          :style="{ backgroundColor: color.hex }"
          :class="
            model.colors.includes(color.name)
              ? 'border-primary ring-2 ring-primary/40'
              : 'border-border'
          "
          @click="patch({ colors: toggleIn(model.colors, color.name) })"
        />
      </div>
    </div>

    <Button variant="outline" size="sm" class="w-full" @click="reset">
      {{ t('products.reset') }}
    </Button>
  </div>
</template>
