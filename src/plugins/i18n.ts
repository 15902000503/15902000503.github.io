import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import zh from '@/locales/zh.json'

// 基于 en.json 推断出消息结构类型
type MessageSchema = typeof en

const saved = localStorage.getItem('locale')
const initialLocale = saved === 'zh' || saved === 'en' ? saved : 'en'

export const i18n = createI18n<[MessageSchema], 'en' | 'zh', false>({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'en',
  messages: { en, zh },
})
