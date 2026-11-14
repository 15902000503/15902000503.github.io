<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Check, Globe } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const { locale } = useI18n()

const languages = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'zh', label: '简体中文', short: '中文' },
  { code: 'ja', label: '日本語', short: '日本語' },
  { code: 'ko', label: '한국어', short: '한국어' },
  { code: 'fr', label: 'Français', short: 'FR' },
] as const

const open = ref(false)
const activeLanguage = computed(
  () => languages.find((language) => language.code === locale.value)?.short ?? 'EN',
)

function switchTo(code: (typeof languages)[number]['code']) {
  try {
    localStorage.setItem('locale', code)
  } catch {
    // Keep language switching available when browser storage is disabled.
  }
  locale.value = code
}
</script>

<template>
  <DropdownMenu v-model:open="open">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="sm" class="gap-1.5">
        <Globe class="size-4" />
        <span class="hidden text-sm sm:inline">
          {{ activeLanguage }}
        </span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        v-for="lang in languages"
        :key="lang.code"
        @click="switchTo(lang.code)"
      >
        <Check
          class="size-4"
          :class="locale === lang.code ? 'opacity-100' : 'opacity-0'"
        />
        {{ lang.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
