<script setup lang="ts">
const props = defineProps<{
  title: string
  subtitle?: string
  viewAllTo?: string
  viewAllLabel?: string
}>()
</script>

<template>
  <div class="mb-6 flex items-end justify-between gap-4">
    <div>
      <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
        {{ props.title }}
      </h2>
      <p
        v-if="props.subtitle"
        class="mt-1 text-sm text-muted-foreground"
      >
        {{ props.subtitle }}
      </p>
    </div>
    <RouterLink
      v-if="props.viewAllTo"
      :to="props.viewAllTo"
      class="shrink-0 text-sm font-medium text-primary hover:underline"
    >
      {{ props.viewAllLabel }}
    </RouterLink>
  </div>
</template>
