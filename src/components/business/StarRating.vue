<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { Star } from '@lucide/vue'
import { cn } from 'cn'

const props = withDefaults(
  defineProps<{
    rating: number
    size?: 'sm' | 'md'
    class?: HTMLAttributes['class']
  }>(),
  { size: 'md' },
)

const pct = computed(() =>
  `${Math.min(100, Math.max(0, (props.rating / 5) * 100))}%`,
)
const starClass = computed(() =>
  props.size === 'sm' ? 'size-3.5 shrink-0' : 'size-4 shrink-0',
)
</script>

<template>
  <div
    :class="cn('relative inline-flex', props.class)"
    :aria-label="`${rating} / 5`"
    role="img"
  >
    <div class="flex text-muted-foreground/30">
      <Star v-for="i in 5" :key="i" :class="starClass" />
    </div>
    <div
      class="absolute inset-0 flex overflow-hidden text-amber-400"
      :style="{ width: pct }"
    >
      <Star v-for="i in 5" :key="i" :class="starClass" fill="currentColor" :stroke-width="0" />
    </div>
  </div>
</template>
