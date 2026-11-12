<script setup lang="ts">
import { ref } from 'vue'
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
  { code: 'en', label: 'English' },
  { code: 'zh', label: '简体中文' },
] as const

const open = ref(false)

function switchTo(code: 'en' | 'zh') {
  locale.value = code
  localStorage.setItem('locale', code)
}
</script>

<template>
  <DropdownMenu v-model:open="open">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="sm" class="gap-1.5">
        <Globe class="size-4" />
        <span class="hidden text-sm sm:inline">
          {{ locale === 'zh' ? '中文' : 'EN' }}
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
