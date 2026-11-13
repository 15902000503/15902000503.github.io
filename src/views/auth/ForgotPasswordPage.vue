<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { LoaderCircle, Mail } from '@lucide/vue'
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const auth = useAuthStore()

const logoSrc = `${import.meta.env.BASE_URL}favicon.svg`
const submittedEmail = ref<string | null>(null)

const schema = computed(() =>
  toTypedSchema(
    z.object({
      email: z
        .string()
        .min(1, t('auth.validation.emailRequired'))
        .email(t('auth.validation.emailInvalid')),
    }),
  ),
)

const { handleSubmit } = useForm<{ email: string }>({ validationSchema: schema })

const submitting = ref(false)

const onSubmit = handleSubmit(async (values) => {
  if (submitting.value) return
  submitting.value = true
  try {
    await auth.requestPasswordReset(values.email)
    submittedEmail.value = values.email
    toast.success(t('auth.resetLinkSent', { email: values.email }))
  } catch (error) {
    console.error('[forgot-password]', error)
    toast.error(String((error as Error)?.message ?? error))
  } finally {
    submitting.value = false
  }
})
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
        <h1 class="font-heading text-3xl font-bold">{{ t('auth.forgotTitle') }}</h1>
        <p class="mt-2 text-muted-foreground">{{ t('auth.forgotSubtitle') }}</p>

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

          <Button type="submit" class="h-11 w-full text-base font-semibold" :disabled="submitting">
            <LoaderCircle v-if="submitting" class="size-4 animate-spin" />
            {{ t('auth.resetPassword') }}
          </Button>
        </form>

        <p
          v-if="submittedEmail"
          class="mt-6 rounded-md bg-muted px-4 py-3 text-sm text-muted-foreground"
        >
          {{ t('auth.resetLinkSent', { email: submittedEmail }) }}
        </p>

        <p class="mt-6 text-sm text-muted-foreground">
          {{ t('auth.backToSignIn') }}
          <RouterLink
            to="/login"
            class="font-semibold text-primary underline-offset-4 hover:underline"
          >
            {{ t('auth.signIn') }}
          </RouterLink>
        </p>
      </CardContent>
    </Card>
  </div>
</template>
