<script lang="ts" setup>
import { onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
async function setGithub(user: Record<string, any>) {
  if (!user) return
  if (user.app_metadata?.provider !== 'github') return

  const ghIdentity =
    user.identities?.find((item: any) => item.provider === 'github')?.identity_data ?? {}
  const meta = { ...ghIdentity, ...user.user_metadata }

  console.log('登录成功，用户信息：', user.user_metadata)

  await auth.signInWithProfile({
    name:
      meta.full_name ??
      meta.user_name ??
      meta.preferred_username ??
      `GitHub User ${user.id.slice(0, 6)}`,
    email:
      user.email ??
      meta.email ??
      `${meta.user_name ?? `gh-${user.id.slice(0, 6)}`}@users.noreply.github.com`,
    provider: 'github',
  })
}
onMounted(async () => {
  const fullHash = window.location.hash

  // 1. 判断是不是从 GitHub 登录回来的
  if (fullHash.includes('#access_token')) {
    // 2. 精准切割：只保留 #access_token 之前的路径
    const cleanHash = fullHash.split('#access_token')[0]
    const cleanUrl =
      window.location.origin + window.location.pathname + window.location.search + cleanHash

    const {
      data: { session },
    } = await supabase.auth.getSession()
    window.history.replaceState(null, '', cleanUrl)
    if (session) {
      console.log('登录成功，用户信息：', session)
      const user = session.user
      setGithub(user);
    } else {
      const { data, error } = await supabase.auth.getUser()
      const user: any = data.user
      setGithub(user);
    }
  }
})
</script>

<template>
  <RouterView />
</template>
