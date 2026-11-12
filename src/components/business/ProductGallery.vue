<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { Button } from '@/components/ui/button'

const props = defineProps<{ images: string[]; alt: string }>()

const active = ref(0)

function prev() {
  active.value =
    (active.value - 1 + props.images.length) % props.images.length
}
function next() {
  active.value = (active.value + 1) % props.images.length
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="group relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
      <img
        :src="images[active]"
        :alt="alt"
        class="size-full cursor-zoom-in object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <Button
        v-if="images.length > 1"
        variant="ghost"
        size="icon"
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur transition-opacity lg:opacity-0 lg:group-hover:opacity-100"
        @click="prev"
      >
        <ChevronLeft class="size-5" />
      </Button>
      <Button
        v-if="images.length > 1"
        variant="ghost"
        size="icon"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur transition-opacity lg:opacity-0 lg:group-hover:opacity-100"
        @click="next"
      >
        <ChevronRight class="size-5" />
      </Button>
    </div>

    <div v-if="images.length > 1" class="grid grid-cols-5 gap-2">
      <button
        v-for="(src, i) in images"
        :key="src"
        type="button"
        class="aspect-[3/4] overflow-hidden rounded-md border-2 transition-colors"
        :class="
          i === active
            ? 'border-primary'
            : 'border-transparent hover:border-muted-foreground/40'
        "
        @click="active = i"
      >
        <img :src="src" :alt="`${alt} ${i + 1}`" class="size-full object-cover" />
      </button>
    </div>
  </div>
</template>
