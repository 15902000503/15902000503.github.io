import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import zh from '@/locales/zh.json'

// 基于 en.json 推断出消息结构类型
type MessageSchema = typeof en

export const i18n = createI18n<[MessageSchema], 'en' | 'zh', false>({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, zh },
})
