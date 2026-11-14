<script lang="ts" setup>
import { onMounted } from 'vue'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
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
  const fullHash = window.location.hash

  if (fullHash.includes('access_token=')) {
    const cleanHash = fullHash.split('#access_token')[0]
    const cleanUrl =
      window.location.origin + window.location.pathname + window.location.search + cleanHash

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) throw sessionError

      let user = session?.user
      if (!user) {
        const { data, error } = await supabase.auth.getUser()
        if (error) throw error
        user = data.user
      }

      if (user) {
        await setGithub(user)
        window.history.replaceState(null, '', cleanUrl)
      }
    } catch (error) {
      console.error('[github-login] failed to load user profile', error)
    }
  }
})
</script>

<template>
  <RouterView />
</template>
