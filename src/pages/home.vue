<template>
  <div ref="rootRef" class="mx-auto w-full max-w-5xl px-4 py-10 sm:px-5 sm:py-16" dir="rtl">
    <header class="hero mb-10 text-center sm:mb-16">
      <div class="hero-badge mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary/10 sm:mb-6 sm:size-16">
        <span class="text-2xl sm:text-3xl">📚</span>
      </div>
      <h1 class="hero-title text-text mb-3 text-3xl font-extrabold tracking-tight sm:mb-4 sm:text-5xl">
        محاضرات تطوير الويب
      </h1>
      <p class="hero-subtitle text-text-secondary mx-auto max-w-xl text-base leading-relaxed sm:text-lg">
        محاضرات تفاعلية بالعربية — أقسام واضحة وحركات GSAP تساعدك على التركيز أثناء التعلّم.
      </p>
    </header>

    <section v-if="publishedLectures.length" class="space-y-3 sm:space-y-4">
      <h2 class="text-text mb-4 text-sm font-semibold sm:mb-6">المحاضرات</h2>
      <RouterLink
        v-for="item in publishedLectures"
        :key="item.id"
        :to="`/lectures/${item.slug}`"
        class="lecture-card group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-primary/40 hover:bg-surface/80 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-6"
      >
        <div class="flex min-w-0 items-start gap-3 sm:gap-4">
          <span
            class="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold sm:size-11 sm:text-base"
            aria-hidden="true"
          >
            {{ toArabicNumeral(item.order) }}
          </span>
          <div class="min-w-0 text-start">
            <div v-if="item.tags?.length" class="mb-2 flex flex-wrap gap-2">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="rounded-full bg-muted px-2.5 py-0.5 text-xs text-text-secondary"
              >
                {{ tag }}
              </span>
            </div>
            <h3 class="text-text group-hover:text-primary text-lg font-bold transition-colors sm:text-xl">
              {{ item.title }}
            </h3>
            <p class="text-text-secondary mt-1 text-sm leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
        <span class="text-primary w-full shrink-0 text-center text-sm font-medium sm:w-auto sm:text-start">
          ابدأ المحاضرة ←
        </span>
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

const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] as const;

const toArabicNumeral = (value: number) =>
  String(value).replace(/\d/g, (digit) => ARABIC_DIGITS[Number(digit)]);

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
