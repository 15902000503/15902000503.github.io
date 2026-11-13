 /**
  * GitHub OAuth 登录集成 —— 依据官方文档
  * https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
  *
  * 与 Google GIS / Facebook JS SDK 不同，GitHub 没有前端弹窗 SDK，只支持
  * Authorization Code Grant（网页应用流），且换 token 必须携带 client_secret：
  *  1. 跳转 https://github.com/login/oauth/authorize
  *     ?client_id&redirect_uri&scope&state（state 防 CSRF，官方强烈建议）
  *  2. 用户授权后 GitHub 带 ?code&state 重定向回 redirect_uri（本站根地址；
  *     GitHub 不允许回调地址带 fragment，hash 路由不受影响）
  *  3. 【服务端】POST https://github.com/login/oauth/access_token
  *     { client_id, client_secret, code } → access_token
  *     —— client_secret 绝不下发前端，因此第 3 步由本站后端代理端点完成
  *     （VITE_GITHUB_EXCHANGE_URL，参考实现见 scripts/github-token-exchange.example.mjs）
  *  4. 前端用 access_token 调 GET https://api.github.com/user 取真实资料
  *
  * 本模块职责：1/2 的发起与回收、state 校验、4 的资料拉取；
  * 3 通过配置的后端端点委托完成。
  */

 const AUTHORIZE_URL = 'https://github.com/login/oauth/authorize'
 const API_USER_URL = 'https://api.github.com/user'
 const API_USER_EMAILS_URL = 'https://api.github.com/user/emails'
 const STATE_KEY = 'gith…tate'
 /** read:user 取资料，user:email 补充私有邮箱 */
 const SCOPE = 'read:user user:email'

 export type GithubLoginErrorKind =
   | 'not-configured'
   | 'state-mismatch'
   | 'exchange-failed'
   | 'profile-failed'

 export class GithubLoginError extends Error {
   readonly kind: GithubLoginErrorKind
   constructor(kind: GithubLoginErrorKind, message: string) {
     super(message)
     this.name = 'GithubLoginError'
     this.kind = kind
   }
 }

 export interface GithubProfile {
   id: number
   login: string
   name?: string
   email?: string
 }

 export type GithubCallback = { code: string; state: string } | { error: string }

 function githubClientId(): string {
   return import.meta.env.VITE_GITHUB_CLIENT_ID ?? ''
 }

 function githubExchangeUrl(): string {
   return import.meta.env.VITE_GITHUB_EXCHANGE_URL ?? ''
 }

 /** 配置齐全才能走真实流程（否则点击时明确提示，不假成功） */
 export function isGithubConfigured(): boolean {
   return githubClientId().length > 0 && githubExchangeUrl().length > 0
 }

 /** 与 GitHub OAuth App 的 Callback URL 一致：站点根地址（不含 hash） */
 export function githubRedirectUri(): string {
   return window.location.origin + window.location.pathname
 }

 function createState(): string {
   const bytes = new Uint8Array(16)
   crypto.getRandomValues(bytes)
   return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
 }

 /** 步骤 1：记录 state 并整页跳转到 GitHub 授权页（调用后本页会卸载） */
 export function beginGithubLogin(): void {
   if (!isGithubConfigured()) {
     throw new GithubLoginError(
       'not-configured',
       'VITE_GITHUB_CLIENT_ID / VITE_GITHUB_EXCHANGE_URL are not set',
     )
   }
   const state = createState()
   sessionStorage.setItem(STATE_KEY, state)
   const url = new URL(AUTHORIZE_URL)
   url.searchParams.set('client_id', githubClientId())
   url.searchParams.set('redirect_uri', githubRedirectUri())
   url.searchParams.set('scope', SCOPE)
   url.searchParams.set('state', state)
   window.location.assign(url.toString())
 }

 /** 步骤 2：应用启动时读取 URL query 中的回调参数；非 GitHub 回调返回 null */
 export function readGithubCallback(): GithubCallback | null {
   const params = new URLSearchParams(window.location.search)
   const error = params.get('error')
   const code = params.get('code')
   const state = params.get('state')
   if (error) return { error }
   if (code && state) return { code, state }
   return null
 }

 /** 消费回调后清掉 query，保留 hash 路由（history 模式则保留 pathname） */
 export function cleanGithubCallbackUrl(): void {
   const url = window.location.pathname + window.location.hash
   window.history.replaceState({}, document.title, url)
 }

 /** 步骤 3+4：校验 state → 后端代理换 token → 拉取真实资料 */
 export async function completeGithubLogin(
   code: string,
   state: string,
 ): Promise<GithubProfile> {
   const expected = sessionStorage.getItem(STATE_KEY)
   sessionStorage.removeItem(STATE_KEY)
   if (!expected || expected !== state) {
     throw new GithubLoginError('state-mismatch', 'OAuth state mismatch (possible CSRF or expired flow)')
   }

   const accessToken = await exchangeCodeForToken(code)
   return fetchGithubProfile(accessToken)
 }

 async function exchangeCodeForToken(code: string): Promise<string> {
   let response: Response
   try {
     response = await fetch(githubExchangeUrl(), {
       method: 'POST',
       headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
       body: JSON.stringify({ code, redirect_uri: githubRedirectUri() }),
     })
   } catch {
     throw new GithubLoginError('exchange-failed', 'token exchange endpoint unreachable')
   }
   if (!response.ok) {
     throw new GithubLoginError('exchange-failed', `token exchange HTTP ${response.status}`)
   }
   const data = (await response.json()) as { access_token?: string; error?: string }
   if (data.error || !data.access_token) {
     throw new GithubLoginError('exchange-failed', data.error ?? 'missing access_token')
   }
   return data.access_token
 }

 async function fetchGithubProfile(accessToken: string): Promise<GithubProfile> {
   const headers = {
     Authorization: `Bearer ${accessToken}`,
     Accept: 'application/vnd.github+json',
     'X-GitHub-Api-Version': '2022-08-04',
   }
   const response = await fetch(API_USER_URL, { headers })
   if (!response.ok) {
     throw new GithubLoginError('profile-failed', `GET /user HTTP ${response.status}`)
   }
   const user = (await response.json()) as {
     id: number
     login: string
     name?: string | null
     email?: string | null
   }
   let email = user.email ?? undefined
   if (!email) {
     // 公开邮箱为空时回退取已验证邮箱（user:email scope）
     try {
       const emailsResponse = await fetch(API_USER_EMAILS_URL, { headers })
       if (emailsResponse.ok) {
         const emails = (await emailsResponse.json()) as Array<{
           email: string
           primary?: boolean
           verified?: boolean
         }>
         email =
           emails.find((item) => item.primary && item.verified)?.email ??
           emails.find((item) => item.verified)?.email
       }
     } catch {
       /* 拿不到邮箱不阻断登录，上层用 noreply 兜底 */
     }
   }
   return { id: user.id, login: user.login, name: user.name ?? undefined, email }
 }
