<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { Eye, EyeOff, LoaderCircle, User } from '@lucide/vue'
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
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
    z
      .object({
        firstName: z.string().min(1, t('auth.validation.firstNameRequired')),
        lastName: z.string().min(1, t('auth.validation.lastNameRequired')),
        email: z
          .string()
          .min(1, t('auth.validation.emailRequired'))
          .email(t('auth.validation.emailInvalid')),
        password: z.string().min(8, t('auth.validation.passwordMin')),
        confirmPassword: z.string().min(1, t('auth.validation.passwordConfirmRequired')),
        subscribe: z.boolean().optional().default(false),
      })
      .refine((v) => v.password === v.confirmPassword, {
        message: t('auth.validation.passwordsMismatch'),
        path: ['confirmPassword'],
      }),
  ),
)

interface RegisterValues {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  subscribe?: boolean
}

function goAfterLogin() {
  router.replace(resolveLoginRedirect(route.query.redirect))
}

const { handleSubmit } = useForm<RegisterValues>({ validationSchema: schema })

const submitting = ref(false)

const onSubmit = handleSubmit(async (values) => {
  if (submitting.value) return
  submitting.value = true
  try {
    await auth.register({ ...values, subscribe: values.subscribe ?? false })
    toast.success(t('auth.accountCreated', { name: auth.user?.name ?? '' }))
    goAfterLogin()
  } catch (error) {
    console.error('[register]', error)
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
        <h1 class="font-heading text-3xl font-bold">{{ t('auth.registerTitle') }}</h1>
        <p class="mt-2 text-muted-foreground">{{ t('auth.registerSubtitle') }}</p>

        <form class="mt-8 space-y-5" @submit="onSubmit">
          <div class="grid gap-5 sm:grid-cols-2">
            <FormField v-slot="{ componentField }" name="firstName">
              <FormItem>
                <FormLabel>{{ t('auth.firstName') }}</FormLabel>
                <FormControl>
                  <Input
                    v-bind="componentField"
                    autocomplete="given-name"
                    :placeholder="t('auth.firstName')"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="lastName">
              <FormItem>
                <FormLabel>{{ t('auth.lastName') }}</FormLabel>
                <FormControl>
                  <Input
                    v-bind="componentField"
                    autocomplete="family-name"
                    :placeholder="t('auth.lastName')"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>{{ t('auth.email') }}</FormLabel>
              <FormControl>
                <Input
                  v-bind="componentField"
                  type="email"
                  autocomplete="email"
                  :placeholder="t('auth.emailPlaceholder')"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>{{ t('auth.password') }}</FormLabel>
              <FormControl>
                <div class="relative">
                  <Input
                    v-bind="componentField"
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete="new-password"
                    :placeholder="t('auth.passwordPlaceholder')"
                    class="pr-10"
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

          <FormField v-slot="{ componentField }" name="confirmPassword">
            <FormItem>
              <FormLabel>{{ t('auth.confirmPassword') }}</FormLabel>
              <FormControl>
                <Input
                  v-bind="componentField"
                  type="password"
                  autocomplete="new-password"
                  :placeholder="t('auth.confirmPassword')"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="subscribe">
            <FormItem class="flex flex-row items-center gap-3">
              <Checkbox :checked="value" @update:checked="handleChange" />
              <FormLabel class="font-normal">{{ t('auth.subscribeNewsletter') }}</FormLabel>
            </FormItem>
          </FormField>

          <Button
            type="submit"
            class="h-11 w-full text-base font-semibold sm:max-w-xs"
            :disabled="submitting"
          >
            <LoaderCircle v-if="submitting" class="size-4 animate-spin" />
            <User v-else class="size-4" />
            {{ t('auth.register') }}
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

        <div class="mt-8 text-center">
          <p class="text-sm text-muted-foreground">
            {{ t('auth.alreadyAccount') }}
            <RouterLink
              to="/login"
              class="font-semibold text-primary underline-offset-4 hover:underline"
            >
              {{ t('auth.signIn') }}
            </RouterLink>
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
