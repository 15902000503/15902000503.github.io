<script lang="ts" setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import { Toaster } from '@/components/ui/sonner'
import { useAuthStore } from '@/stores/auth'
import { supabase } from '@/lib/supabase'

defineOptions({ name: 'App' })

const auth = useAuthStore()
const { t } = useI18n()

// Supabase OAuth（GitHub）是整页重定向：应用启动时消费回调会话，把资料写入
// auth store——导航头像等登录态均以 store 为准，与 Facebook/Google 弹窗流
// 成功后 signInWithProfile 的落库动作保持一致
onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  const user = data.session?.user
  // 已登录（store 持久化过）时不重复写、不重复提示
  if (!user || auth.isLoggedIn) return
  const meta = user.user_metadata ?? {}
  await auth.signInWithProfile({
    name: meta.full_name ?? meta.user_name ?? `GitHub User ${user.id.slice(0, 6)}`,
    email: user.email ?? `gh-${user.id.slice(0, 6)}@github.example`,
    provider: 'github',
  })
  toast.success(t('auth.socialConnected', { provider: 'GitHub' }))
})
</script>

<template>
  <RouterView />
  <!-- Toaster 挂在根节点：auth 页不在 DefaultLayout 内，也必须能看到 toast -->
  <Toaster position="top-right" />
</template>
