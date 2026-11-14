<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import { Toaster } from '@/components/ui/sonner'
import { useAuthStore } from '@/stores/auth'
import { supabase } from '@/lib/supabase'

defineOptions({ name: 'App' })

const auth = useAuthStore()
const { t } = useI18n()

let syncing = false
let unsubscribeAuth: (() => void) | null = null

/**
 * 把 Supabase 会话资料写入 auth store（导航头像的姓名/邮箱均以 store 为准）。
 * 资料以服务端 getUser() 为准：OAuth 回调刚结束时，事件里带回来的
 * session.user 是本地会话缓存，user_metadata / email 可能尚未补全。
 */
async function syncProfileFromSupabase(notify: boolean) {
  if (auth.isLoggedIn || syncing) return
  syncing = true
  try {
    const { data, error } = await supabase.auth.getUser()
    const user = data.user
    // 调试：确认服务端返回的字段（user_metadata 里是否有 full_name/user_name 等）
    console.log('[supabase] getUser:', {
      error: error?.message,
      email: user?.email,
      user_metadata: user?.user_metadata,
      identities: user?.identities,
    })
    if (!user) return
    // 仅 GitHub OAuth 会话才写入 auth store（provider 由 Supabase 服务端标记），
    // 避免将来其它方式（如 Supabase 邮箱登录）建立的会话被误标为 github
    if (user.app_metadata?.provider !== 'github') return
    // GitHub 资料可能同时出现在 user_metadata 与 identities[].identity_data，
    // 两处合并取用（user_metadata 优先）
    const ghIdentity =
      user.identities?.find((item) => item.provider === 'github')?.identity_data ?? {}
    const meta = { ...ghIdentity, ...user.user_metadata }
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
    // 仅在授权回调刚完成时提示；刷新页面恢复会话时静默同步
    if (notify) toast.success(t('auth.socialConnected', { provider: 'GitHub' }))
  } finally {
    syncing = false
  }
}

// Supabase OAuth（GitHub）是整页重定向：回调会话由 supabase-js 消费后经
// onAuthStateChange 回流，这里写入 auth store，与 Facebook/Google 弹窗流
// 成功后 signInWithProfile 的表现保持一致
onMounted(() => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    if (!session?.user) return
    void syncProfileFromSupabase(event === 'SIGNED_IN')
  })
  unsubscribeAuth = () => data.subscription.unsubscribe()

  // 兜底：初始化换 code 与组件挂载存在竞态，事件可能早于订阅触发；
  // 主动查一次本地会话，有用户则同样完成同步（不弹提示）
  void (async () => {
    const { data: existing } = await supabase.auth.getSession()
    if (existing.session?.user) await syncProfileFromSupabase(false)
  })()
})

onUnmounted(() => unsubscribeAuth?.())
</script>

<template>
  <RouterView />
  <!-- Toaster 挂在根节点：auth 页不在 DefaultLayout 内，也必须能看到 toast -->
  <Toaster position="top-right" />
</template>
