import { onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import { googleTokenLogin } from 'vue3-google-login'
import { providerLabelKey, type SocialProviderId } from '@/components/business/social/providers'
import { useAuthStore } from '@/stores/auth'

/**
 * 社媒登录统一入口：
 * - facebook：由 @healerlab/vue3-facebook-login（HFaceBookLogin 组件）驱动，
 *   结果经组件事件回流到 handleFacebookSuccess / handleFacebookFailure；
 * - google：由 vue3-google-login 驱动（googleTokenLogin 弹窗取 access_token，
 *   再调 Google userinfo 端点取真实资料），无需全局注册插件，clientId 按调用传入；
 * - 其余 provider：演示 mock（后续可按同样模式接入各家 OAuth）。
 */

/** HFaceBookLogin onSuccess 载荷（源自 FB.login 响应 + Graph /me 结果） */
interface FacebookLoginPayload {
  status?: string
  authResponse?: { accessToken?: string; userID?: string; expiresIn?: number }
  authInfo?: { id?: string; name?: string; email?: string }
}

/** Google userinfo 端点返回资料 */
interface GoogleProfile {
  sub?: string
  name?: string
  email?: string
}

const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'
/** 弹窗被拦截 / 用户长时间未处理时，避免按钮无限转圈 */
const SOCIAL_WATCHDOG_MS = 120_000

export function useSocialLogin(onSuccess: () => void) {
  const { t } = useI18n()
  const auth = useAuthStore()
  const socialLoading = ref<SocialProviderId | null>(null)

  let watchdog: ReturnType<typeof setTimeout> | null = null
  // 看门狗触发后标记本轮流程失效：迟到的 success/failure 回调不再写登录态 / 跳转
  let flowExpired = false

  function clearWatchdog() {
    if (watchdog) {
      clearTimeout(watchdog)
      watchdog = null
    }
  }

  function startWatchdog() {
    clearWatchdog()
    flowExpired = false
    watchdog = setTimeout(() => {
      flowExpired = true
      socialLoading.value = null
      toast.error(t('auth.socialTimeout'))
    }, SOCIAL_WATCHDOG_MS)
  }

  function finishSocial() {
    if (flowExpired) return
    clearWatchdog()
    socialLoading.value = null
  }

  function handleSocial(provider: SocialProviderId) {
    if (provider === 'facebook') {
      // Facebook 流程由 HFaceBookLogin 组件异步驱动，结果走下面两个 handler
      socialLoading.value = 'facebook'
      startWatchdog()
      return
    }
    if (provider === 'google') {
      socialLoading.value = 'google'
      startWatchdog()
      void loginWithGoogle()
      return
    }
    // 其余 provider：演示 mock
    void (async () => {
      socialLoading.value = provider
      try {
        await auth.signInWithSocial(provider)
        toast.success(t('auth.socialConnected', { provider: t(providerLabelKey(provider)) }))
        onSuccess()
      } catch (error) {
        console.error('[social-login]', provider, error)
        toast.error(String((error as Error)?.message ?? error))
      } finally {
        socialLoading.value = null
      }
    })()
  }

  /** Google：popup 取 token → userinfo 取资料 → 写入 auth store */
  async function loginWithGoogle() {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''
    if (!clientId) {
      finishSocial()
      toast.warning(t('auth.googleNotConfigured'))
      return
    }
    try {
      const tokenResponse = await googleTokenLogin({ clientId })
      const profile = await fetchGoogleProfile(tokenResponse.access_token)
      if (!profile.sub) {
        throw new Error('empty profile')
      }
      await auth.signInWithProfile({
        name: profile.name ?? `Google User ${profile.sub.slice(0, 6)}`,
        email: profile.email ?? `google-${profile.sub}@google.example`,
        provider: 'google',
      })
      toast.success(t('auth.socialConnected', { provider: 'Google' }))
      onSuccess()
    } catch (error) {
      notifyGoogleError(error)
    } finally {
      finishSocial()
    }
  }

  async function fetchGoogleProfile(accessToken: string): Promise<GoogleProfile> {
    const response = await fetch(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (!response.ok) {
      throw new Error(`userinfo request failed (HTTP ${response.status})`)
    }
    return (await response.json()) as GoogleProfile
  }

  function notifyGoogleError(error: unknown) {
    // GIS 的 TokenError 用 error / error_description / type 字段而非 message，
    // 需全部收集，否则 access_denied 等会被误判为一般失败
    const text =
      typeof error === 'string'
        ? error
        : [
            (error as Error)?.message,
            (error as { error_description?: string })?.error_description,
            (error as { error?: string })?.error,
            (error as { type?: string })?.type,
          ]
            .filter(Boolean)
            .join(' ')
    if (/cancel|closed|denied/i.test(text)) {
      toast.info(t('auth.googleCancelled'))
      return
    }
    toast.error(t('auth.googleFailed', { reason: text || 'unknown error' }))
  }

  function handleFacebookSuccess(raw: unknown) {
    finishSocial()
    const payload = (raw ?? {}) as FacebookLoginPayload
    const id = payload.authInfo?.id ?? payload.authResponse?.userID
    if (!id) {
      toast.error(t('auth.facebookFailed', { reason: 'empty profile' }))
      return
    }
    void (async () => {
      try {
        await auth.signInWithProfile({
          name: payload.authInfo?.name ?? `Facebook User ${String(id).slice(0, 6)}`,
          email: payload.authInfo?.email ?? `fb-${id}@facebook.example`,
          provider: 'facebook',
        })
        toast.success(t('auth.socialConnected', { provider: 'Facebook' }))
        onSuccess()
      } catch (error) {
        console.error('[social-login] facebook', error)
        toast.error(
          t('auth.facebookFailed', { reason: String((error as Error)?.message ?? error) }),
        )
      }
    })()
  }

  function handleFacebookFailure(reason?: unknown) {
    finishSocial()
    // 库在未配置 App ID 时回调 'appId is required'；其余无参回调按取消处理
    if (typeof reason === 'string' && reason.includes('appId')) {
      toast.warning(t('auth.facebookNotConfigured'))
      return
    }
    if (typeof reason === 'string' && reason.length > 0) {
      toast.error(t('auth.facebookFailed', { reason }))
      return
    }
    toast.info(t('auth.facebookCancelled'))
  }

  onUnmounted(clearWatchdog)

  return { socialLoading, handleSocial, handleFacebookSuccess, handleFacebookFailure }
}
