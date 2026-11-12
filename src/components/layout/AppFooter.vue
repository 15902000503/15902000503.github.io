<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import { CreditCard, Mail, MapPin, Phone, ShieldCheck, Sparkles, Truck } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const { t } = useI18n()

const email = ref('')

function subscribe() {
  const value = email.value.trim()
  if (!value || !/^\S+@\S+\.\S+$/.test(value)) {
    toast.error(t('footer.invalidEmail'))
    return
  }
  toast.success(t('footer.subscribed'))
  email.value = ''
}

const quickLinks = [
  { to: '/', label: 'footer.home' },
  { to: '/products', label: 'footer.products' },
  { to: '/about', label: 'footer.about' },
  { to: '/cart', label: 'header.cart' },
]

const careLinks = [
  { label: 'footer.contact' },
  { label: 'footer.faq' },
  { label: 'footer.shipping' },
  { label: 'footer.returns' },
]
</script>

<template>
  <footer class="mt-16 border-t bg-muted/40">
    <div
      class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4"
    >
      <!-- 品牌 -->
      <div class="space-y-4">
        <div class="flex items-center gap-1.5 text-lg font-bold">
          <Sparkles class="size-5 text-primary" />
          Bagisto Store
        </div>
        <p class="text-sm leading-6 text-muted-foreground">
          {{ t('footer.aboutDesc') }}
        </p>
        <div class="space-y-2 text-sm text-muted-foreground">
          <p class="flex items-center gap-2">
            <MapPin class="size-4 shrink-0" /> 123 Commerce Ave, Suite 100
          </p>
          <p class="flex items-center gap-2">
            <Phone class="size-4 shrink-0" /> +1 (555) 000-1234
          </p>
          <p class="flex items-center gap-2">
            <Mail class="size-4 shrink-0" /> support@bagisto.store
          </p>
        </div>
      </div>

      <!-- 快捷入口 -->
      <div>
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider">
          {{ t('footer.quickLinks') }}
        </h3>
        <ul class="space-y-2.5 text-sm">
          <li v-for="link in quickLinks" :key="link.to">
            <RouterLink
              :to="link.to"
              class="text-muted-foreground transition-colors hover:text-primary"
            >
              {{ t(link.label) }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- 客户服务 -->
      <div>
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider">
          {{ t('footer.customerCare') }}
        </h3>
        <ul class="space-y-2.5 text-sm">
          <li v-for="link in careLinks" :key="link.label">
            <a
              href="#"
              class="text-muted-foreground transition-colors hover:text-primary"
              @click.prevent
            >
              {{ t(link.label) }}
            </a>
          </li>
        </ul>
        <div class="mt-5 flex flex-col gap-2 text-xs text-muted-foreground">
          <span class="flex items-center gap-2">
            <Truck class="size-4" /> {{ t('footer.shippingPolicy') }}
          </span>
          <span class="flex items-center gap-2">
            <ShieldCheck class="size-4" /> {{ t('footer.privacy') }}
          </span>
          <span class="flex items-center gap-2">
            <CreditCard class="size-4" /> {{ t('footer.payment') }}
          </span>
        </div>
      </div>

      <!-- 订阅 -->
      <div>
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider">
          {{ t('footer.newsletter') }}
        </h3>
        <p class="mb-4 text-sm text-muted-foreground">
          {{ t('footer.newsletterDesc') }}
        </p>
        <form class="flex gap-2" @submit.prevent="subscribe">
          <Input
            v-model="email"
            type="email"
            :placeholder="t('footer.emailPlaceholder')"
            class="h-10"
          />
          <Button type="submit" class="shrink-0">
            {{ t('footer.subscribe') }}
          </Button>
        </form>
      </div>
    </div>

    <div class="border-t">
      <div
        class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6"
      >
        <p>© {{ new Date().getFullYear() }} Bagisto Store. {{ t('footer.rights') }}</p>
        <div class="flex gap-4">
          <a href="#" class="hover:text-primary" @click.prevent>{{ t('footer.privacy') }}</a>
          <a href="#" class="hover:text-primary" @click.prevent>{{ t('footer.terms') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>
