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
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
