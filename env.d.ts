/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BASE: string
  readonly VITE_ROUTER_HISTORY: 'hash' | 'history'
  VITE_PROXY?: [string, string][]
  /** Facebook(Meta) 登录 App ID；留空 = 演示模式 */
  readonly VITE_FACEBOOK_APP_ID?: string
  /** Graph API 版本，默认 v23.0 */
  readonly VITE_FACEBOOK_API_VERSION?: string
  /** Google OAuth2 客户端 ID（Google Cloud Console → 凭据）；留空 = 演示模式 */
  readonly VITE_GOOGLE_CLIENT_ID?: string
  /** GitHub OAuth App 的 Client ID（可公开）；与换 token 端点都配置后才走真实流程 */
  readonly VITE_GITHUB_CLIENT_ID?: string
  /** 本站后端代理端点：POST { code, redirect_uri } → { access_token }（client_secret 只放服务端） */
  readonly VITE_GITHUB_EXCHANGE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
