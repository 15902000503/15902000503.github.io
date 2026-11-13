/**
 * 登录回跳：记录用户进入 登录/注册/找回密码 页之前所在的页面，
 * 登录成功后回到该页面；带 ?redirect= 查询参数时以其为准。
 */
const AUTH_ROUTE_NAMES = new Set(['Login', 'Register', 'ForgotPassword'])

let preAuthPath: string | null = null

export function isAuthRoute(name: unknown): boolean {
  return AUTH_ROUTE_NAMES.has(String(name))
}

/** 进入 auth 页前调用：记录来源 fullPath */
export function recordAuthOrigin(fromFullPath: string) {
  preAuthPath = fromFullPath
}

/** 离开 auth 页时调用：无论是否登录成功都清除来源记录 */
export function clearAuthOrigin() {
  preAuthPath = null
}

function isInternalPath(path: string): boolean {
  // 仅接受站内绝对路径：排除 //evil.com（协议相对）与 /\evil.com
  // （浏览器会把反斜杠归一化成斜杠，同样构成外域跳转）
  return path.startsWith('/') && !path.startsWith('//') && !path.startsWith('/\\')
}

/**
 * 解析登录/注册成功后的跳转目标：
 * ?redirect= 查询参数 > 来源页面 > 首页。
 */
export function resolveLoginRedirect(queryRedirect: unknown): string {
  if (typeof queryRedirect === 'string' && isInternalPath(queryRedirect)) {
    return queryRedirect
  }
  const origin = preAuthPath
  preAuthPath = null
  return origin ?? '/'
}
