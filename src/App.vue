<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'
import { consumeOAuthRedirect, resolveLoginRedirect } from '@/composables/useAuthRedirect'

const auth = useAuthStore()
const router = useRouter()
async function setGithub(user: User) {
  const metadata = user.user_metadata ?? {}
  const name = [metadata.name, metadata.full_name, metadata.user_name, metadata.preferred_username]
    .find((value): value is string => typeof value === 'string' && value.trim().length > 0)
    ?.trim()

  await auth.signInWithProfile({
    name: name ?? user.email?.split('@')[0] ?? 'GitHub User',
    email: user.email ?? metadata.email ?? '',
    provider: 'github',
  })
}

onMounted(async () => {
  const callbackUrl = new URL(window.location.href)
  const hasAccessToken = callbackUrl.hash.includes('access_token=')
  const hasAuthorizationCode = callbackUrl.searchParams.has('code')

  if (hasAccessToken || hasAuthorizationCode) {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) throw sessionError
      if (!session?.user) throw new Error('GitHub OAuth callback did not create an auth session')

      await setGithub(session.user)
      if (hasAccessToken) callbackUrl.hash = ''
      if (hasAuthorizationCode) callbackUrl.searchParams.delete('code')
      window.history.replaceState(
        null,
        '',
        `${callbackUrl.pathname}${callbackUrl.search}${callbackUrl.hash}`,
      )

      const target = consumeOAuthRedirect()
      await router.replace(resolveLoginRedirect(target ?? undefined))
    } catch (error) {
      console.error('[github-login] failed to load user profile', error)
    }
  }
})
</script>

<template>
  <RouterView />
</template>
