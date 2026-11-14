<script lang="ts" setup>
import { Toaster } from '@/components/ui/sonner'

defineOptions({ name: 'App' })
</script>

<template>
  <RouterView />
  <!-- Toaster 挂在根节点：auth 页不在 DefaultLayout 内，也必须能看到 toast -->
  <Toaster position="top-right" />
</template>
