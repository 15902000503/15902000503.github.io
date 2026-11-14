<script lang="ts" setup>
import { onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

onMounted(async () => {
  const hash = window.location.hash

  // 1. 判断是不是从 GitHub 登录回来的
  if (hash.includes('access_token')) {
    // 2. 清除 URL 里的 token，但【保留路由】
    // 寻找第二个 '#'（即 access_token 前面的那个 #）
    const secondHashIndex = hash.indexOf('#', 1)

    if (secondHashIndex !== -1) {
      // 截取第一段 hash（例如 "#/products/floral-summer-dress"）
      const routeHash = hash.slice(0, secondHashIndex)

      // 重新拼接 URL：路径 + 查询参数 + 路由 hash
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search + routeHash,
      )
    }

    // 3. 获取用户信息（此时 Supabase 应该已经解析了 Token）
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      console.log('登录成功，用户信息：', session)
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
