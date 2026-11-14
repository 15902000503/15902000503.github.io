<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import type { User } from '@supabase/supabase-js'
import { Toaster } from '@/components/ui/sonner'
import { useAuthStore } from '@/stores/auth'
import { supabase } from '@/lib/supabase'

defineOptions({ name: 'App' })

const auth = useAuthStore()
const { t } = useI18n()

/** 把 Supabase 会话资料写入 auth store（导航头像的姓名/邮箱均以 store 为准） */
function syncProfileFromSupabase(user: User, notify: boolean) {
  if (auth.isLoggedIn) return
  const meta = user.user_metadata ?? {}
  void auth.signInWithProfile({
    name: meta.full_name ?? meta.user_name ?? `GitHub User ${user.id.slice(0, 6)}`,
    email: user.email ?? `gh-${user.id.slice(0, 6)}@github.example`,
    provider: 'github',
  })
  // 仅在授权回调刚完成时提示；刷新页面恢复会话时静默同步
  if (notify) toast.success(t('auth.socialConnected', { provider: 'GitHub' }))
}

let unsubscribeAuth: (() => void) | null = null

// Supabase OAuth（GitHub）是整页重定向：回调会话由 supabase-js 消费后经
// onAuthStateChange 回流，这里写入 auth store，与 Facebook/Google 弹窗流
// 成功后 signInWithProfile 的表现保持一致
onMounted(() => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    const user = session?.user
    if (!user) return
    syncProfileFromSupabase(user, event === 'SIGNED_IN')
  })
  unsubscribeAuth = () => data.subscription.unsubscribe()
})

onUnmounted(() => unsubscribeAuth?.())
</script>

<template>
  <RouterView />
  <!-- Toaster 挂在根节点：auth 页不在 DefaultLayout 内，也必须能看到 toast -->
  <Toaster position="top-right" />
</template>
