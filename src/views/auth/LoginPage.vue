<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { Eye, EyeOff, LoaderCircle, Lock, Mail } from '@lucide/vue'
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import SocialLoginButtons from '@/components/business/SocialLoginButtons.vue'
import { useAuthStore } from '@/stores/auth'
import { useSocialLogin } from '@/composables/useSocialLogin'
import { resolveLoginRedirect } from '@/composables/useAuthRedirect'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const logoSrc = `${import.meta.env.BASE_URL}favicon.svg`
const showPassword = ref(false)

const schema = computed(() =>
  toTypedSchema(
    z.object({
      email: z
        .string()
        .min(1, t('auth.validation.emailRequired'))
        .email(t('auth.validation.emailInvalid')),
      password: z.string().min(1, t('auth.validation.passwordRequired')),
    }),
  ),
)

type LoginValues = { email: string; password: string }

function goAfterLogin() {
  router.replace(resolveLoginRedirect(route.query.redirect))
}

const { handleSubmit } = useForm<LoginValues>({ validationSchema: schema })

const submitting = ref(false)

const onSubmit = handleSubmit(async (values) => {
  if (submitting.value) return
  submitting.value = true
  try {
    await auth.signIn(values.email, values.password)
    toast.success(t('auth.welcomeBack', { name: auth.user?.name ?? '' }))
    goAfterLogin()
  } catch (error) {
    console.error('[login]', error)
    toast.error(String((error as Error)?.message ?? error))
  } finally {
    submitting.value = false
  }
})

// 社媒登录：facebook 走 @healerlab/vue3-facebook-login，其余为演示 mock
const {
  socialLoading,
  handleSocial: onSocial,
  handleFacebookSuccess: onFacebookSuccess,
  handleFacebookFailure: onFacebookFailure,
} = useSocialLogin(goAfterLogin)
</script>

<template>
  <div class="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-12 sm:py-16">
    <!-- Logo -->
    <RouterLink to="/" class="mb-8 flex items-center gap-2">
      <img :src="logoSrc" alt="" class="size-8 text-primary" />
      <span class="text-xl font-bold tracking-tight"
        >Stitch <span class="text-primary">Store</span></span
      >
    </RouterLink>

    <Card class="w-full">
      <CardContent class="px-6 sm:px-10">
        <h1 class="font-heading text-3xl font-bold">{{ t('auth.loginTitle') }}</h1>
        <p class="mt-2 text-muted-foreground">{{ t('auth.loginSubtitle') }}</p>

        <form class="mt-8 space-y-5" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>{{ t('auth.email') }}</FormLabel>
              <FormControl>
                <div class="relative">
                  <Mail
                    class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    v-bind="componentField"
                    type="email"
                    autocomplete="email"
                    :placeholder="t('auth.emailPlaceholder')"
                    class="pl-9"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>{{ t('auth.password') }}</FormLabel>
              <FormControl>
                <div class="relative">
                  <Lock
                    class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    v-bind="componentField"
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete="current-password"
                    :placeholder="t('auth.passwordPlaceholder')"
                    class="pl-9 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    class="absolute right-0 top-0 h-full rounded-none text-muted-foreground"
                    :aria-label="showPassword ? t('auth.hidePassword') : t('auth.showPassword')"
                    @click="showPassword = !showPassword"
                  >
                    <EyeOff v-if="showPassword" class="size-4" />
                    <Eye v-else class="size-4" />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="text-right">
            <RouterLink
              to="/forgot-password"
              class="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {{ t('auth.forgotPassword') }}
            </RouterLink>
          </div>

          <Button type="submit" class="h-11 w-full text-base font-semibold" :disabled="submitting">
            <LoaderCircle v-if="submitting" class="size-4 animate-spin" />
            {{ t('auth.signIn') }}
          </Button>
        </form>

        <div class="my-6 flex items-center gap-4">
          <Separator class="flex-1" />
          <span class="text-xs uppercase tracking-wide text-muted-foreground">{{
            t('auth.orContinueWith')
          }}</span>
          <Separator class="flex-1" />
        </div>

        <SocialLoginButtons
          :loading-provider="socialLoading"
          @select="onSocial"
          @facebook-success="onFacebookSuccess"
          @facebook-failure="onFacebookFailure"
        />

        <p class="mt-8 text-sm text-muted-foreground">
          {{ t('auth.newCustomer') }}
          <RouterLink
            to="/register"
            class="font-semibold text-primary underline-offset-4 hover:underline"
          >
            {{ t('auth.createAccount') }}
          </RouterLink>
        </p>
      </CardContent>
    </Card>
  </div>
</template>
