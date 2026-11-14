import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import zh from '@/locales/zh.json'
import ja from '@/locales/ja.json'
import ko from '@/locales/ko.json'
import fr from '@/locales/fr.json'

export const localeCodes = ['en', 'zh', 'ja', 'ko', 'fr'] as const
export type LocaleCode = (typeof localeCodes)[number]

type MessageSchema = typeof en

function readInitialLocale(): LocaleCode {
  try {
    const saved = localStorage.getItem('locale')
    return localeCodes.find((code) => code === saved) ?? 'en'
  } catch {
    return 'en'
  }
}

const fallbackMessages = () => structuredClone(en)

export const i18n = createI18n<[MessageSchema], LocaleCode, false>({
  legacy: false,
  locale: readInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    zh,
    ja: fallbackMessages(),
    ko: fallbackMessages(),
    fr: fallbackMessages(),
  },
})

i18n.global.mergeLocaleMessage('ja', ja as MessageSchema)
i18n.global.mergeLocaleMessage('ko', ko as MessageSchema)
i18n.global.mergeLocaleMessage('fr', fr as MessageSchema)
