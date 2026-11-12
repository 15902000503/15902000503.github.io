<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import { Minus, Plus, ShoppingBag, Trash2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { usePrice } from '@/composables/usePrice'
import { useCartStore } from '@/stores/cart'

const { t } = useI18n()
const { format } = usePrice()
const cart = useCartStore()

const FREE_SHIPPING_THRESHOLD = 50

function changeQty(index: number, delta: number) {
  const item = cart.items[index]!
  item.qty = Math.max(1, item.qty + delta)
}

function removeItem(index: number) {
  cart.removeItem(index)
  toast.success(t('cartPage.removed'))
}

function checkout() {
  toast.success(t('cartPage.checkoutToast'))
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
    <h1 class="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
      {{ t('cartPage.title') }}
    </h1>

    <!-- 空车 -->
    <div
      v-if="!cart.items.length"
      class="flex flex-col items-center gap-4 py-20 text-center"
    >
      <ShoppingBag class="size-14 text-muted-foreground/40" />
      <p class="text-lg font-medium">{{ t('cartPage.empty') }}</p>
      <p class="text-sm text-muted-foreground">{{ t('cartPage.emptyDesc') }}</p>
      <RouterLink to="/products">
        <Button>{{ t('cartPage.continueShopping') }}</Button>
      </RouterLink>
    </div>

    <div v-else class="grid gap-8 lg:grid-cols-3">
      <!-- 商品列表 -->
      <div class="space-y-4 lg:col-span-2">
        <Card v-for="(item, index) in cart.items" :key="index">
          <CardContent
            class="flex items-center gap-4 p-4"
          >
            <RouterLink :to="`/products/${item.productId}`">
              <img
                :src="item.image"
                :alt="item.name"
                class="size-20 shrink-0 rounded-md bg-muted object-cover sm:size-24"
              />
            </RouterLink>
            <div class="min-w-0 flex-1">
              <p class="truncate font-medium">{{ item.name }}</p>
              <p class="mt-0.5 text-sm text-muted-foreground">
                {{ format(item.price) }}
                <template v-if="item.color">
                  · {{ t('common.color') }}: {{ item.color }}
                </template>
                <template v-if="item.size">
                  · {{ t('common.size') }}: {{ item.size }}
                </template>
              </p>
              <div class="mt-2 flex items-center gap-3">
                <div class="flex items-center rounded-md border">
                  <Button
                    variant="ghost"
                    size="icon"
                    class="size-8 rounded-none"
                    :disabled="item.qty <= 1"
                    @click="changeQty(index, -1)"
                  >
                    <Minus class="size-3.5" />
                  </Button>
                  <span class="w-8 text-center text-sm font-medium">
                    {{ item.qty }}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="size-8 rounded-none"
                    @click="changeQty(index, 1)"
                  >
                    <Plus class="size-3.5" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  class="h-8 gap-1.5 text-muted-foreground hover:text-destructive"
                  @click="removeItem(index)"
                >
                  <Trash2 class="size-4" />
                  {{ t('cartPage.remove') }}
                </Button>
              </div>
            </div>
            <p class="shrink-0 font-semibold">
              {{ format(item.price * item.qty) }}
            </p>
          </CardContent>
        </Card>

        <div class="flex justify-between">
          <RouterLink to="/products">
            <Button variant="outline">
              {{ t('cartPage.continueShopping') }}
            </Button>
          </RouterLink>
          <Button
            variant="ghost"
            class="text-muted-foreground hover:text-destructive"
            @click="
              cart.clear();
              toast.success(t('cartPage.cleared'))
            "
          >
            {{ t('cartPage.clear') }}
          </Button>
        </div>
      </div>

      <!-- 订单汇总 -->
      <div>
        <Card>
          <CardHeader>
            <CardTitle>{{ t('cartPage.summary') }}</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">
                {{ t('cartPage.subtotal') }}
              </span>
              <span class="font-medium">{{ format(cart.total) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">
                {{ t('cartPage.shipping') }}
              </span>
              <span class="font-medium">
                {{
                  cart.total >= FREE_SHIPPING_THRESHOLD
                    ? t('cartPage.free')
                    : format(5)
                }}
              </span>
            </div>
            <Separator />
            <div class="flex justify-between text-base font-semibold">
              <span>{{ t('cartPage.total') }}</span>
              <span class="text-primary">
                {{
                  format(
                    cart.total +
                      (cart.total >= FREE_SHIPPING_THRESHOLD ? 0 : 5),
                  )
                }}
              </span>
            </div>
            <Button size="lg" class="mt-2 w-full" @click="checkout">
              {{ t('cartPage.checkout') }}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
