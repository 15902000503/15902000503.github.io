import { useI18n } from 'vue-i18n'

/** 价格格式化（演示站固定美元） */
export function usePrice() {
  const { locale } = useI18n()

  function format(value: number): string {
    return new Intl.NumberFormat(
      locale.value === 'zh' ? 'zh-CN' : 'en-US',
      { style: 'currency', currency: 'USD' },
    ).format(value)
  }

  return { format }
}
