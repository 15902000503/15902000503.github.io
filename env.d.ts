/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BASE: string
  readonly VITE_ROUTER_HISTORY: 'hash' | 'history'
  VITE_PROXY?: [string, string][]
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
