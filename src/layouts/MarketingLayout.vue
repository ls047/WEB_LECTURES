<template>
  <div class="flex min-h-screen flex-col bg-background">
    <header class="border-border/60 bg-surface/80 sticky top-0 z-30 border-b backdrop-blur-xl supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
      <div class="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
        <RouterLink
          to="/"
          class="text-text min-w-0 truncate text-sm font-semibold sm:text-base"
        >
          {{ appName }}
        </RouterLink>
        <nav class="flex shrink-0 items-center gap-2">
          <slot name="nav" />
        </nav>
      </div>
    </header>
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white">
      Skip to content
    </a>
    <main id="main" class="flex-1 min-w-0">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAppConfig } from '@/composables/useAppConfig';

const { appName } = useAppConfig();
</script>
