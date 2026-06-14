<template>
  <div ref="rootRef" class="mx-auto max-w-5xl px-4 py-16" dir="rtl">
    <header class="hero mb-16 text-center">
      <div class="hero-badge mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
        <span class="text-3xl">📚</span>
      </div>
      <h1 class="hero-title text-text mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
        محاضرات تطوير الويب
      </h1>
      <p class="hero-subtitle text-text-secondary mx-auto max-w-xl text-lg leading-relaxed">
        محاضرات تفاعلية بالعربية — أقسام واضحة وحركات GSAP تساعدك على التركيز أثناء التعلّم.
      </p>
    </header>

    <section v-if="publishedLectures.length" class="space-y-4">
      <h2 class="text-text mb-6 text-sm font-semibold">المحاضرات</h2>
      <RouterLink
        v-for="item in publishedLectures"
        :key="item.id"
        :to="`/lectures/${item.slug}`"
        class="lecture-card group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary/40 hover:bg-surface/80 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="text-start">
          <div v-if="item.tags?.length" class="mb-2 flex flex-wrap gap-2">
            <span
              v-for="tag in item.tags"
              :key="tag"
              class="rounded-full bg-muted px-2.5 py-0.5 text-xs text-text-secondary"
            >
              {{ tag }}
            </span>
          </div>
          <h3 class="text-text group-hover:text-primary text-xl font-bold transition-colors">
            {{ item.title }}
          </h3>
          <p class="text-text-secondary mt-1 text-sm leading-relaxed">{{ item.description }}</p>
        </div>
        <span class="text-primary shrink-0 text-sm font-medium">ابدأ المحاضرة ←</span>
      </RouterLink>
    </section>

    <AppEmptyState
      v-else
      class="empty-state"
      icon="icon-[solar--book-bookmark-linear]"
      title="لا توجد محاضرات بعد"
      description="أضف المحاضرة الأولى في src/data/lectures.ts"
      variant="neutral"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppEmptyState from '@/components/ui/AppEmptyState.vue';
import { getPublishedLectures } from '@/data/lectures';
import { gsap, useGsapOnMount } from '@/composables/useGsap';

const rootRef = ref<HTMLElement | null>(null);
const publishedLectures = getPublishedLectures();

useGsapOnMount(() => {
  gsap.from('.hero-badge', {
    scale: 0,
    rotation: -180,
    duration: 0.8,
    ease: 'back.out(2)',
  });

  gsap.from('.hero-title', {
    y: 40,
    opacity: 0,
    duration: 0.7,
    delay: 0.15,
    ease: 'power3.out',
  });

  gsap.from('.hero-subtitle', {
    y: 24,
    opacity: 0,
    duration: 0.6,
    delay: 0.35,
    ease: 'power3.out',
  });

  gsap.from('.lecture-card, .empty-state', {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    delay: 0.5,
    ease: 'power2.out',
  });
}, rootRef);
</script>
