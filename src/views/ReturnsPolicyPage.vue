<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import {
  BadgeCheck,
  ChevronRight,
  Mail,
  PackageCheck,
  RotateCcw,
  Truck,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const { t } = useI18n()

const sections = [
  { id: 'eligibility', label: 'returns.eligibilityTitle' },
  { id: 'non-returnable', label: 'returns.nonReturnableTitle' },
  { id: 'process', label: 'returns.processTitle' },
  { id: 'refunds', label: 'returns.refundTitle' },
  { id: 'exchanges', label: 'returns.exchangeTitle' },
  { id: 'shipping-fees', label: 'returns.shippingTitle' },
  { id: 'damaged', label: 'returns.damagedTitle' },
  { id: 'faq', label: 'returns.faqTitle' },
]

const steps = [
  { icon: Mail, title: 'returns.step1Title', desc: 'returns.step1Desc' },
  { icon: BadgeCheck, title: 'returns.step2Title', desc: 'returns.step2Desc' },
  { icon: Truck, title: 'returns.step3Title', desc: 'returns.step3Desc' },
  {
    icon: PackageCheck,
    title: 'returns.step4Title',
    desc: 'returns.step4Desc',
  },
]

const faqs = [1, 2, 3, 4, 5]
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
    <!-- 面包屑 -->
    <nav
      class="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
    >
      <RouterLink to="/" class="hover:text-primary">
        {{ t('detail.home') }}
      </RouterLink>
      <ChevronRight class="size-3.5" />
      <span class="text-foreground">{{ t('returns.title') }}</span>
    </nav>

    <!-- 页头 -->
    <header class="mb-8">
      <div class="flex items-center gap-3">
        <RotateCcw class="size-7 text-primary" stroke-width="1.5" />
        <h1 class="text-3xl font-bold tracking-tight">
          {{ t('returns.title') }}
        </h1>
      </div>
      <p class="mt-3 max-w-3xl leading-6 text-muted-foreground">
        {{ t('returns.intro') }}
      </p>
      <p class="mt-2 text-xs text-muted-foreground/70">
        {{ t('returns.updated') }}
      </p>
    </header>

    <div class="grid gap-10 lg:grid-cols-[220px_1fr]">
      <!-- 锚点导航 -->
      <aside class="hidden lg:block">
        <nav
          class="sticky top-32 rounded-lg border bg-muted/30 p-4 text-sm"
        >
          <p class="mb-3 font-semibold">
            {{ t('returns.tocTitle') }}
          </p>
          <ul class="space-y-2">
            <li v-for="s in sections" :key="s.id">
              <a
                :href="`#${s.id}`"
                class="text-muted-foreground transition-colors hover:text-primary"
              >
                {{ t(s.label) }}
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <div class="max-w-3xl space-y-10">
        <!-- 退货条件 -->
        <section id="eligibility" class="scroll-mt-32">
          <h2 class="mb-3 text-xl font-bold">{{ t('returns.eligibilityTitle') }}</h2>
          <p class="mb-3 text-sm leading-6 text-muted-foreground">
            {{ t('returns.eligibilityIntro') }}
          </p>
          <ul class="list-inside list-disc space-y-1.5 text-sm leading-6">
            <li v-for="i in 4" :key="i">{{ t(`returns.eligibility${i}`) }}</li>
          </ul>
        </section>

        <Separator />

        <!-- 不可退商品 -->
        <section id="non-returnable" class="scroll-mt-32">
          <h2 class="mb-3 text-xl font-bold">
            {{ t('returns.nonReturnableTitle') }}
          </h2>
          <p class="mb-3 text-sm leading-6 text-muted-foreground">
            {{ t('returns.nonReturnableIntro') }}
          </p>
          <ul class="list-inside list-disc space-y-1.5 text-sm leading-6">
            <li v-for="i in 4" :key="i">
              {{ t(`returns.nonReturnable${i}`) }}
            </li>
          </ul>
        </section>

        <Separator />

        <!-- 流程四步 -->
        <section id="process" class="scroll-mt-32">
          <h2 class="mb-5 text-xl font-bold">{{ t('returns.processTitle') }}</h2>
          <div class="grid gap-4 sm:grid-cols-2">
            <Card v-for="(step, i) in steps" :key="step.title">
              <CardContent class="flex gap-4 p-5">
                <div
                  class="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <component :is="step.icon" class="size-5" />
                </div>
                <div>
                  <p class="font-semibold">
                    {{ i + 1 }}. {{ t(step.title) }}
                  </p>
                  <p class="mt-1 text-sm leading-6 text-muted-foreground">
                    {{ t(step.desc) }}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        <!-- 退款 -->
        <section id="refunds" class="scroll-mt-32">
          <h2 class="mb-3 text-xl font-bold">{{ t('returns.refundTitle') }}</h2>
          <p class="text-sm leading-7 text-muted-foreground">
            {{ t('returns.refundBody') }}
          </p>
        </section>

        <Separator />

        <!-- 换货 -->
        <section id="exchanges" class="scroll-mt-32">
          <h2 class="mb-3 text-xl font-bold">
            {{ t('returns.exchangeTitle') }}
          </h2>
          <p class="text-sm leading-7 text-muted-foreground">
            {{ t('returns.exchangeBody') }}
          </p>
        </section>

        <Separator />

        <!-- 运费 -->
        <section id="shipping-fees" class="scroll-mt-32">
          <h2 class="mb-3 text-xl font-bold">
            {{ t('returns.shippingTitle') }}
          </h2>
          <p class="text-sm leading-7 text-muted-foreground">
            {{ t('returns.shippingBody') }}
          </p>
        </section>

        <Separator />

        <!-- 破损/错发 -->
        <section id="damaged" class="scroll-mt-32">
          <h2 class="mb-3 text-xl font-bold">
            {{ t('returns.damagedTitle') }}
          </h2>
          <p class="text-sm leading-7 text-muted-foreground">
            {{ t('returns.damagedBody') }}
          </p>
        </section>

        <Separator />

        <!-- FAQ -->
        <section id="faq" class="scroll-mt-32">
          <h2 class="mb-4 text-xl font-bold">{{ t('returns.faqTitle') }}</h2>
          <Accordion type="single" collapsible class="w-full">
            <AccordionItem
              v-for="n in faqs"
              :key="n"
              :value="`faq-${n}`"
            >
              <AccordionTrigger>{{ t(`returns.faq${n}Q`) }}</AccordionTrigger>
              <AccordionContent class="text-sm leading-6 text-muted-foreground">
                {{ t(`returns.faq${n}A`) }}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <!-- 联系客服 -->
        <Card class="bg-muted/40">
          <CardContent
            class="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center"
          >
            <div>
              <p class="font-semibold">{{ t('returns.contactTitle') }}</p>
              <p class="mt-1 text-sm text-muted-foreground">
                {{ t('returns.contactBody') }}
              </p>
            </div>
            <div class="flex shrink-0 gap-3">
              <RouterLink to="/about">
                <Button variant="outline">{{ t('returns.contactCta') }}</Button>
              </RouterLink>
              <RouterLink to="/products">
                <Button>{{ t('returns.backToShop') }}</Button>
              </RouterLink>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
