/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BASE: string
  readonly VITE_ROUTER_HISTORY: 'hash' | 'history'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
