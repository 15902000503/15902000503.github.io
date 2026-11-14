import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { SocialProviderId } from '@/components/business/social/providers'
import { supabase } from '@/lib/supabase'

/** 尽力清理 Supabase 会话（GitHub 登录态存于此，无会话时静默跳过）。
 * 不清的话刷新后 onAuthStateChange 会用残留会话把用户自动登录回来 */
function bestEffortSupabaseLogout() {
  try {
    void supabase.auth.signOut().catch(() => {
      /* 无会话等错误不影响本地登出 */
    })
  } catch {
    /* SDK 异常时忽略 */
  }
}

/** 尽力清理 Facebook 会话（SDK 由 vue3-facebook-login 注入，未加载时静默跳过） */
function bestEffortFacebookLogout() {
  try {
    const FB = (window as unknown as { FB?: { logout?: () => void } }).FB
    FB?.logout?.()
  } catch {
    /* SDK 未初始化时忽略 */
  }
}

export interface AuthUser {
  name: string
  email: string
  provider: 'password' | SocialProviderId
}

const STORAGE_KEY = 'auth-user'
const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms))

function readStored(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

function nameFromEmail(email: string): string {
  const local = email.split('@')[0] ?? email
  return local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

/**
 * 演示用认证 store：本地 mock，登录态持久化到 localStorage。
 * 接入真实后端时只需替换各 action 内部的 delay + 赋值逻辑。
 */
export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(readStored())
  const isLoggedIn = computed(() => user.value !== null)

  function persist() {
    if (user.value) localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
    else localStorage.removeItem(STORAGE_KEY)
  }

  async function signIn(email: string, _password: string) {
    await delay()
    user.value = { name: nameFromEmail(email), email, provider: 'password' }
    persist()
  }

  async function register(payload: {
    firstName: string
    lastName: string
    email: string
    password: string
    subscribe: boolean
  }) {
    await delay()
    user.value = {
      name: `${payload.firstName} ${payload.lastName}`,
      email: payload.email,
      provider: 'password',
    }
    persist()
  }

  async function requestPasswordReset(_email: string) {
    await delay()
  }

  /** 真实 OAuth 完成后写入资料（如 Facebook SDK 返回的 Graph /me 结果） */
  async function signInWithProfile(profile: AuthUser) {
    user.value = profile
    persist()
  }

  async function signInWithSocial(provider: SocialProviderId) {
    await delay(800)
    user.value = {
      name: nameFromEmail(`demo.user@${provider}.com`),
      email: `demo.user@${provider}.com`,
      provider,
    }
    persist()
  }

  function signOut() {
    // 经 Facebook 登录时同步清理 FB 会话
    if (user.value?.provider === 'facebook') bestEffortFacebookLogout()
    // 经 GitHub（Supabase）登录时同步清理 Supabase 会话
    if (user.value?.provider === 'github') bestEffortSupabaseLogout()
    user.value = null
    persist()
  }

  return {
    user,
    isLoggedIn,
    signIn,
    register,
    requestPasswordReset,
    signInWithProfile,
    signInWithSocial,
    signOut,
  }
})
