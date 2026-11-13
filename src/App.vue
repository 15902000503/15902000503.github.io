<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import { Toaster } from '@/components/ui/sonner'
import { useAuthStore } from '@/stores/auth'
import { resolveLoginRedirect } from '@/composables/useAuthRedirect'
import {
  GithubLoginError,
  cleanGithubCallbackUrl,
  completeGithubLogin,
  readGithubCallback,
} from '@/lib/github'

defineOptions({ name: 'App' })

const router = useRouter()
const auth = useAuthStore()
const { t } = useI18n()

// GitHub 授权是整页重定向：应用启动时消费 URL 上的 code/state 回调参数
onMounted(async () => {
  const callback = readGithubCallback()
  if (!callback) return
  cleanGithubCallbackUrl()

  if ('error' in callback) {
    if (callback.error === 'access_denied') toast.info(t('auth.githubCancelled'))
    else toast.error(t('auth.githubFailed', { reason: callback.error }))
    return
  }

  try {
    const profile = await completeGithubLogin(callback.code, callback.state)
    await auth.signInWithProfile({
      name: profile.name ?? profile.login,
      email: profile.email ?? `${profile.id}@users.noreply.github.com`,
      provider: 'github',
    })
    toast.success(t('auth.socialConnected', { provider: 'GitHub' }))
    // 来源记录经 sessionStorage 跨重定向存活，登录后回到进入登录页前的页面
    router.replace(resolveLoginRedirect(null))
  } catch (error) {
    const kind = (error as GithubLoginError)?.kind
    if (kind === 'not-configured') {
      // 配置类信息仅控制台记录，不在页面弹提示
      console.warn('[social-login] github not configured:', (error as Error)?.message)
    } else {
      toast.error(t('auth.githubFailed', { reason: String((error as Error)?.message ?? error) }))
    }
  }
})
</script>

<template>
  <RouterView />
  <!-- Toaster 挂在根节点：auth 页不在 DefaultLayout 内，也必须能看到 toast -->
  <Toaster position="top-right" />
</template>
