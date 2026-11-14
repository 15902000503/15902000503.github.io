import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,   // 必须为 true（默认是 true，但确认没被覆盖）
    autoRefreshToken: true, // 建议开启，自动刷新 Token
    detectSessionInUrl: true // 处理 OAuth 重定向回来的 token
  }
})
