/**
 * 登录回跳：记录用户进入 登录/注册/找回密码 页之前所在的页面，
 * 登录成功后回到该页面；带 ?redirect= 查询参数时以其为准。
 *
 * 来源记录同时写入 sessionStorage：GitHub 等整页重定向式 OAuth 会重新加载
 * 应用、丢失模块内存，回来后仍需能跳到原页面。
 */
const AUTH_ROUTE_NAMES = new Set(['Login', 'Register', 'ForgotPassword'])
const ORIGIN_KEY = 'auth-o…rigin'
const OAUTH_REDIRECT_KEY = 'auth-oauth-redirect'

function readStoredOrigin(): string | null {
  try {
    return sessionStorage.getItem(ORIGIN_KEY)
  } catch {
    return null
  }
}

function writeStoredOrigin(path: string | null) {
  try {
    if (path) sessionStorage.setItem(ORIGIN_KEY, path)
    else sessionStorage.removeItem(ORIGIN_KEY)
  } catch {
    /* 隐私模式等场景静默降级为仅内存记录 */
  }
}

let preAuthPath: string | null = readStoredOrigin()

export function isAuthRoute(name: unknown): boolean {
  return AUTH_ROUTE_NAMES.has(String(name))
}

/** 进入 auth 页前调用：记录来源 fullPath */
export function recordAuthOrigin(fromFullPath: string) {
  preAuthPath = fromFullPath
  writeStoredOrigin(fromFullPath)
}

/** 离开 auth 页时调用：无论是否登录成功都清除来源记录 */
export function clearAuthOrigin() {
  preAuthPath = null
  writeStoredOrigin(null)
}

function isInternalPath(path: string): boolean {
  // 仅接受站内绝对路径：排除 //evil.com（协议相对）与 /\evil.com
  // （浏览器会把反斜杠归一化成斜杠，同样构成外域跳转）
  return path.startsWith('/') && !path.startsWith('//') && !path.startsWith('/\\')
}

/** GitHub OAuth uses the app base URL as callback to keep route hashes out of the token fragment. */
export function recordOAuthRedirect(path: string) {
  try {
    if (isInternalPath(path)) sessionStorage.setItem(OAUTH_REDIRECT_KEY, path)
  } catch {
    /* If storage is unavailable, the regular auth origin remains the fallback. */
  }
}

/** Read and consume the route saved before the full-page OAuth redirect. */
export function consumeOAuthRedirect(): string | null {
  try {
    const path = sessionStorage.getItem(OAUTH_REDIRECT_KEY)
    sessionStorage.removeItem(OAUTH_REDIRECT_KEY)
    return path && isInternalPath(path) ? path : null
  } catch {
    return null
  }
}

/** 与 resolveLoginRedirect 相同的优先级，但不消费来源记录 */
function pickLoginPath(queryRedirect: unknown): string {
  if (typeof queryRedirect === 'string' && isInternalPath(queryRedirect)) {
    return queryRedirect
  }
  return preAuthPath ?? '/'
}

/**
 * 整页跳转式 OAuth（GitHub）发起前取回跳目标：
 * 与 Google/Facebook 成功后 resolveLoginRedirect 的解析完全一致
 * （?redirect= 查询参数 > 来源页面 > 首页），但只读不消费——
 * 跳转回来后 sessionStorage 仍保留来源记录，授权被取消时重试还能回原页。
 */
export function peekLoginRedirect(queryRedirect: unknown): string {
  return pickLoginPath(queryRedirect)
}

/**
 * 解析登录/注册成功后的跳转目标：
 * ?redirect= 查询参数 > 来源页面 > 首页。
 */
export function resolveLoginRedirect(queryRedirect: unknown): string {
  const target = pickLoginPath(queryRedirect)
  preAuthPath = null
  writeStoredOrigin(null)
  return target
}
