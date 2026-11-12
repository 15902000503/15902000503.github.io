<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <div class="flex min-h-svh flex-col bg-background">
    <AppHeader />
    <main class="flex-1">
      <RouterView />
    </main>
    <AppFooter />
    <Toaster position="top-right" />
  </div>
</template>
