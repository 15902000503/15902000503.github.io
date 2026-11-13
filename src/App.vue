<script lang="ts" setup>
defineOptions({ name: 'App' })
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <RouterView />
  <!-- Toaster 挂在根节点：auth 页不在 DefaultLayout 内，也必须能看到 toast -->
  <Toaster position="top-right" />
</template>
