<template>
  <LectureScroll
    v-if="lecture && content"
    :sections="content.sections"
    :lecture-title="lecture.title"
    :hero-subtitle="content.heroSubtitle ?? lecture.description"
    :course-label="content.courseLabel"
    :locale="content.locale ?? 'ar'"
  />

  <AppEmptyState
    v-else-if="lecture && !content"
    icon="icon-[solar--document-text-linear]"
    title="المحتوى قريباً"
    :description="`محاضرة «${lecture.title}» مسجّلة لكن المحتوى غير جاهز بعد.`"
    variant="neutral"
  >
    <RouterLink
      to="/"
      class="bg-primary rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
    >
      العودة للرئيسية
    </RouterLink>
  </AppEmptyState>

  <AppEmptyState
    v-else
    icon="icon-[solar--document-text-linear]"
    title="المحاضرة غير موجودة"
    description="أضف المحاضرة في src/data/lectures.ts"
    variant="neutral"
  >
    <RouterLink
      to="/"
      class="bg-primary rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
    >
      العودة للرئيسية
    </RouterLink>
  </AppEmptyState>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppEmptyState from '@/components/ui/AppEmptyState.vue';
import LectureScroll from '@/components/lectures/LectureScroll.vue';
import { getLectureContent } from '@/data/lecture-content';
import { getLectureBySlug } from '@/data/lectures';

const route = useRoute();

const lecture = computed(() => getLectureBySlug(route.params.slug as string));
const content = computed(() =>
  lecture.value ? getLectureContent(lecture.value.slug) : undefined,
);

watch(
  lecture,
  (value) => {
    if (value) document.title = `${value.title} · محاضرات تطوير الويب`;
  },
  { immediate: true },
);
</script>
