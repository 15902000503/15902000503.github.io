<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

// 模拟轮播图数据（在实际项目中，这些数据通常来自 API）
const banners = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop', // 替换为你的图片路径
    title: 'Bold Collections',
    subtitle: 'Elevate your style with daring designs.',
    buttonText: 'Shop Now',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop',
    title: 'Summer Sale',
    subtitle: 'Get UPTO 40% OFF on your 1st order.',
    buttonText: 'Explore Deals',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    title: 'New Arrivals',
    subtitle: 'Discover the latest trends for the season.',
    buttonText: 'View More',
  },
]

// 配置自动播放插件：每 4 秒切换，鼠标悬停时不停止
const plugin = Autoplay({ delay: 4000, stopOnInteraction: false })
</script>

<template>
  <!-- 容器全宽，高度响应式：手机端稍矮，PC端更高 -->
  <div class="w-full h-[300px] md:h-[500px] lg:h-[600px] relative group">
    <Carousel class="w-full h-full" :plugins="[plugin]" :opts="{ loop: true }">
      <CarouselContent class="h-full">
        <!-- 循环渲染每一屏 -->
        <CarouselItem v-for="banner in banners" :key="banner.id" class="h-full">
          <!-- 相对定位容器，用于放置图片和文字层 -->
          <div class="relative w-full h-full overflow-hidden">
            <!-- 图片：h-full w-full 配合 object-cover 保证铺满且不变形 -->
            <img
              :src="banner.image"
              :alt="banner.title"
              class="w-full h-full object-cover object-center h-[300px] md:h-[500px] lg:h-[600px]"
            />

            <!-- 黑色半透明遮罩层：确保白色文字在亮色图片上依然清晰 -->
            <div class="absolute inset-0 bg-black/40"></div>

            <!-- 文字内容层：绝对居中 -->
            <div
              class="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4"
            >
              <h2
                class="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 drop-shadow-md"
              >
                {{ banner.title }}
              </h2>
              <p class="text-sm md:text-lg lg:text-xl mb-8 max-w-xl drop-shadow">
                {{ banner.subtitle }}
              </p>

              <!-- 按钮：使用了 shadcn-vue 的 Button 组件，如果你想用原生的可以换成 <button> -->
              <button
                class="bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
              >
                {{ banner.buttonText }}
              </button>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>

      <!-- 左右切换箭头（shadcn 默认隐藏，鼠标移入容器时显示） -->
      <div
        class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
      >
        <CarouselPrevious
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white border-none"
        />
        <CarouselNext
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white border-none"
        />
      </div>
    </Carousel>
  </div>
</template>
