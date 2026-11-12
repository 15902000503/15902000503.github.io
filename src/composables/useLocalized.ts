import { useI18n } from 'vue-i18n'
import type { LocalizedText } from '@/data/types'

/** 根据当前语言取双语数据字段 */
export function useLocalized() {
  const { locale } = useI18n()

  function pick(text: LocalizedText | undefined): string {
    if (!text) return ''
    return locale.value === 'zh' ? text.zh : text.en
  }

  return { pick, locale }
}
