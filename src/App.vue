<script lang="ts" setup>
import { Toaster } from '@/components/ui/sonner'
import { onMounted, onUnmounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'

defineOptions({ name: 'App' })

const auth = useAuthStore()

// 使用 ReturnType 自动推导出正确的类型，替代 any
let authListener:
  | ReturnType<typeof supabase.auth.onAuthStateChange>['data']['subscription']
  | null = null

onMounted(() => {
  // 1. 只有当 URL 中包含 access_token（说明刚从 GitHub 跳回来）时，才注册监听
  if (window.location.hash.includes('access_token')) {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      // 确保是登录成功的事件，并且存在 session
      if (event === 'SIGNED_IN' && session) {
        const user = session.user
        if (!user) return

        // 2. 清理 URL 里的 Hash token，防止路由报错和暴露敏感信息
        // 将地址栏重置为干净的根路径
        window.history.replaceState(null, '', '/')

        // 3. 只处理 GitHub 来源的登录
        if (user.app_metadata?.provider !== 'github') return

        // 4. 提取 GitHub 的用户信息
        const ghIdentity =
          user.identities?.find((item) => item.provider === 'github')?.identity_data ?? {}
        const meta = { ...ghIdentity, ...user.user_metadata }

        console.log('GitHub 登录成功，用户信息：', user.user_metadata)

        // 5. 将数据同步到你的 Pinia Store 和后端
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
    })
    authListener = data.subscription
  }
})

onUnmounted(() => {
  // 组件销毁时清理监听器
  if (authListener) {
    authListener.unsubscribe()
  }
})
</script>

<template>
  <RouterView />
  <!-- Toaster 挂在根节点：auth 页不在 DefaultLayout 内，也必须能看到 toast -->
  <Toaster position="top-right" />
</template>
