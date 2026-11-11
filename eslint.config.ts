import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  // 1. 先加载官方预设（它们会开启一些默认规则）
  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  // 2. 再加载你的自定义规则（覆盖前面的预设）
  {
    name: 'app/shadcn-ui-overrides',
    files: ['src/components/ui/**/*.vue'], // 只针对 UI 组件目录
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting,
)
