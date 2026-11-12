<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { bannerLoopData } from '@/utils/banner'
import { useLocalized } from '@/composables/useLocalized'

const { pick } = useLocalized()
const router = useRouter()
const banners = bannerLoopData()

const api = ref<CarouselApi>()
const selectedIndex = ref(0)
const count = ref(0)

const onSelect = (value: CarouselApi) => {
  if (!value) return
  selectedIndex.value = value.selectedScrollSnap()
}

const plugins = [
  Autoplay({ delay: 4000, stopOnMouseEnter: true, stopOnInteraction: false }),
]

function setApi(value?: CarouselApi) {
  if (!value) return
  api.value = value
  count.value = value.scrollSnapList().length
  selectedIndex.value = value.selectedScrollSnap()
  value.on('select', onSelect)
}

onBeforeUnmount(() => {
  api.value?.off('select', onSelect)
})
</script>

<template>
  <Carousel
    :opts="{ loop: true }"
    :plugins="plugins"
    class="w-full"
    @init-api="setApi"
  >
    <div class="relative">
      <CarouselContent>
        <CarouselItem v-for="banner in banners" :key="banner.id">
          <RouterLink :to="banner.link" class="block">
            <div class="relative h-[260px] overflow-hidden sm:h-[360px] lg:h-[480px]">
              <img
                :src="banner.image"
                :alt="pick(banner.title)"
                class="absolute inset-0 size-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent"
              />
              <div
                class="absolute inset-0 flex flex-col justify-center gap-3 px-6 sm:px-12 lg:px-20"
              >
                <h2
                  class="max-w-xl text-2xl font-bold text-white sm:text-4xl lg:text-5xl"
                >
                  {{ pick(banner.title) }}
                </h2>
                <p class="max-w-md text-sm text-white/90 sm:text-lg">
                  {{ pick(banner.subtitle) }}
                </p>
                <Button
                  class="mt-2 w-fit bg-white text-black hover:bg-white/85"
                  size="lg"
                  @click.prevent="router.push(banner.link)"
                >
                  {{ pick(banner.buttonText) }}
                </Button>
              </div>
            </div>
          </RouterLink>
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious
        class="hidden sm:inline-flex"
        variant="secondary"
      />
      <CarouselNext class="hidden sm:inline-flex" variant="secondary" />
    </div>

    <!-- 指示器（小圆点） -->
    <div class="mt-4 flex items-center justify-center gap-2">
      <button
        v-for="(_, i) in count"
        :key="i"
        type="button"
        aria-label="go to slide"
        class="size-2.5 rounded-full transition-all"
        :class="
          i === selectedIndex
            ? 'w-6 bg-primary'
            : 'bg-muted-foreground/40 hover:bg-muted-foreground/70'
        "
        @click="api?.scrollTo(i)"
      />
    </div>
  </Carousel>
</template>
