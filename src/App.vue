<script lang="ts" setup>
import { onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
onMounted(async () => {
  // 1. 判断是不是从 GitHub 登录回来的
  console.log('start: ')
  alert('start')
  if (window.location.hash.includes('access_token')) {
    // 2. 清除 URL 里的 token，防止暴露在地址栏
    window.history.replaceState(null, '', window.location.pathname + window.location.search)

    // 3. 获取用户信息（此时 Supabase 已经处理好了 Token）
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      console.log('登录成功，用户信息：', session)
      alert(JSON.stringify(session))
      const user = session.user
      if (!user) return
      if (user.app_metadata?.provider !== 'github') return
      const ghIdentity =
        user.identities?.find((item) => item.provider === 'github')?.identity_data ?? {}
      const meta = { ...ghIdentity, ...user.user_metadata }
      console.log('登录成功，用户信息：', session.user.user_metadata)
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
  }
})
</script>

<template>
  <RouterView />
</template>
