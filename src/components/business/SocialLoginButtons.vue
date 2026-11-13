<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { LoaderCircle } from '@lucide/vue'
import { HFaceBookLogin } from '@healerlab/vue3-facebook-login'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { socialProviders, type SocialProviderId } from './social/providers'

/**
 * 第三方社媒登录入口封装：统一处理 loading / disabled / 无障碍标签。
 * - Facebook：由 @healerlab/vue3-facebook-login 的 HFaceBookLogin 组件驱动
 *   （弹窗 OAuth + Graph /me 拉取资料），触发元素沿用项目的 Lucide 品牌图标按钮；
 * - 其余 provider：点击后 emit select，由父级调用 auth store（演示 mock）。
 */
const props = defineProps<{
  /** 正在请求中的 provider id；非空时禁用全部按钮 */
  loadingProvider?: SocialProviderId | null
}>()

const emit = defineEmits<{
  (e: 'select', provider: SocialProviderId): void
  (e: 'facebook-success', payload: unknown): void
  (e: 'facebook-failure', reason?: unknown): void
}>()

const { t } = useI18n()

// HFaceBookLogin 配置：App ID 留空时组件内部会回调 onFailure('appId is required')
const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID ?? ''
const facebookVersion = import.meta.env.VITE_FACEBOOK_API_VERSION || 'v23.0'

function isDisabled() {
  return props.loadingProvider != null
}

function onFacebookClick(initFBLogin: () => Promise<void>) {
  // 先通知父级进入 loading，再触发库的登录流程（结果经 success/failure 事件回流）
  emit('select', 'facebook')
  void initFBLogin()
}
</script>

<template>
  <TooltipProvider>
    <div class="flex items-center justify-center gap-3">
      <template v-for="provider in socialProviders" :key="provider.id">
        <HFaceBookLogin
          v-if="provider.id === 'facebook'"
          v-slot="fbLogin"
          :app-id="facebookAppId"
          :version="facebookVersion"
          scope="email,public_profile"
          fields="id,name,email"
          @onSuccess="(payload: unknown) => emit('facebook-success', payload)"
          @onFailure="(reason?: unknown) => emit('facebook-failure', reason)"
        >
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                type="button"
                variant="outline"
                size="icon"
                class="rounded-full"
                :disabled="isDisabled()"
                :aria-label="t(provider.labelKey)"
                @click="onFacebookClick(fbLogin.initFBLogin)"
              >
                <LoaderCircle v-if="loadingProvider === provider.id" class="size-4 animate-spin" />
                <component v-else :is="provider.icon" class="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{{ t(provider.labelKey) }}</TooltipContent>
          </Tooltip>
        </HFaceBookLogin>
        <Tooltip v-else>
          <TooltipTrigger as-child>
            <Button
              type="button"
              variant="outline"
              size="icon"
              class="rounded-full"
              :disabled="isDisabled()"
              :aria-label="t(provider.labelKey)"
              @click="emit('select', provider.id)"
            >
              <LoaderCircle v-if="loadingProvider === provider.id" class="size-4 animate-spin" />
              <component v-else :is="provider.icon" class="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{{ t(provider.labelKey) }}</TooltipContent>
        </Tooltip>
      </template>
    </div>
  </TooltipProvider>
</template>
