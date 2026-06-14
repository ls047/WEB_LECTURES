<template>
  <article
    ref="rootRef"
    class="lecture-scroll"
    :dir="isRtl ? 'rtl' : 'ltr'"
  >
    <div class="lecture-progress-track" aria-hidden="true">
      <div ref="progressRef" class="lecture-progress-bar" />
    </div>

    <header ref="heroRef" class="lecture-hero">
      <RouterLink to="/" class="lecture-back">
        {{ isRtl ? '→ العودة للمحاضرات' : '← Back to lectures' }}
      </RouterLink>

      <p v-if="courseLabel" class="lecture-label reveal">{{ courseLabel }}</p>
      <h1 class="lecture-title reveal">{{ lectureTitle }}</h1>
      <p v-if="heroSubtitle" class="lecture-lead reveal">{{ heroSubtitle }}</p>
    </header>

    <div class="lecture-layout">
      <nav class="lecture-toc" aria-label="فهرس المحاضرة">
        <p class="lecture-toc-heading">{{ isRtl ? 'المحاور' : 'Topics' }}</p>
        <a
          v-for="section in sections"
          :key="section.id"
          :href="`#${section.id}`"
          class="lecture-toc-link"
          :class="{ 'lecture-toc-link--active': activeSectionId === section.id }"
          @click.prevent="scrollToSection(section.id)"
        >
          {{ section.chapter ?? section.title }}
        </a>
      </nav>

      <div class="lecture-sections">
        <section
          v-for="(section, index) in sections"
          :id="section.id"
          :key="section.id"
          :ref="(el) => setSectionRef(el, index)"
          class="lecture-block"
          :data-section="section.id"
        >
          <div class="lecture-block-inner">
            <header class="lecture-block-header">
              <p v-if="section.chapter" class="lecture-chapter reveal">
                {{ section.chapter }}
              </p>
              <h2 class="lecture-block-title reveal">{{ section.title }}</h2>
              <p v-if="section.subtitle" class="lecture-block-sub reveal">
                {{ section.subtitle }}
              </p>
            </header>

            <div class="lecture-block-content">
              <p
                v-for="(paragraph, pIndex) in section.paragraphs"
                :key="pIndex"
                class="lecture-paragraph reveal"
              >
                {{ paragraph }}
              </p>

              <ul v-if="section.bullets?.length" class="lecture-list">
                <li
                  v-for="(item, bIndex) in section.bullets"
                  :key="bIndex"
                  class="lecture-list-item reveal"
                >
                  {{ item }}
                </li>
              </ul>

              <div v-if="section.code" class="lecture-code-block reveal">
                <p v-if="section.codeCaption" class="lecture-code-caption">
                  {{ section.codeCaption }}
                </p>
                <pre class="lecture-code"><code>{{ section.code }}</code></pre>
              </div>
            </div>

            <aside v-if="section.highlight" class="lecture-callout reveal">
              <span class="lecture-callout-icon" aria-hidden="true">💡</span>
              <p>{{ section.highlight }}</p>
            </aside>
          </div>
        </section>
      </div>
    </div>

    <footer class="lecture-footer reveal">
      <RouterLink to="/" class="lecture-footer-link">
        {{ isRtl ? '← العودة لقائمة المحاضرات' : 'Back to all lectures →' }}
      </RouterLink>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import type { LectureSection } from '@/types/lecture.types';
import { gsap, ScrollTrigger, useGsapScope } from '@/composables/useGsap';

const props = withDefaults(
  defineProps<{
    sections: LectureSection[];
    lectureTitle: string;
    heroSubtitle?: string;
    courseLabel?: string;
    locale?: 'ar' | 'en';
  }>(),
  { locale: 'ar' },
);

const rootRef = ref<HTMLElement | null>(null);
const heroRef = ref<HTMLElement | null>(null);
const progressRef = ref<HTMLElement | null>(null);
const sectionRefs = ref<(HTMLElement | null)[]>([]);
const activeSectionId = ref(props.sections[0]?.id ?? '');

const { run, revert } = useGsapScope(rootRef);

const isRtl = computed(() => props.locale === 'ar');

const setSectionRef = (el: unknown, index: number) => {
  sectionRefs.value[index] = el instanceof HTMLElement ? el : null;
};

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const setupAnimations = async () => {
  await nextTick();
  revert();

  if (!rootRef.value) return;

  run(() => {
    if (heroRef.value) {
      gsap.from(heroRef.value.querySelectorAll('.reveal'), {
        y: 36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }

    if (progressRef.value && rootRef.value) {
      gsap.set(progressRef.value, {
        scaleX: 0,
        transformOrigin: isRtl.value ? '100% 50%' : '0% 50%',
      });

      gsap.to(progressRef.value, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.value,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    }

    sectionRefs.value.forEach((sectionEl) => {
      if (!sectionEl) return;

      const reveals = sectionEl.querySelectorAll('.reveal');
      if (!reveals.length) return;

      gsap.set(reveals, { y: 28, opacity: 0 });

      gsap.to(reveals, {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top 78%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      });

      const callout = sectionEl.querySelector('.lecture-callout');
      if (callout) {
        gsap.from(callout, {
          scale: 0.96,
          duration: 0.5,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: callout,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    });

    sectionRefs.value.forEach((sectionEl) => {
      if (!sectionEl) return;
      const id = sectionEl.dataset.section;
      if (!id) return;

      ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top 40%',
        end: 'bottom 55%',
        onEnter: () => {
          activeSectionId.value = id;
        },
        onEnterBack: () => {
          activeSectionId.value = id;
        },
      });
    });
  });
};

onMounted(setupAnimations);

watch(
  () => props.sections,
  () => setupAnimations(),
);
</script>

<style scoped>
.lecture-scroll {
  position: relative;
  padding-bottom: 4rem;
}

.lecture-progress-track {
  position: fixed;
  top: 3.5rem;
  inset-inline: 0;
  height: 3px;
  z-index: 35;
  background: color-mix(in srgb, var(--color-border) 60%, transparent);
}

.lecture-progress-bar {
  height: 100%;
  width: 100%;
  background: linear-gradient(
    90deg,
    var(--color-primary),
    var(--color-secondary)
  );
  transform: scaleX(0);
}

.lecture-hero {
  max-width: 48rem;
  margin: 0 auto;
  padding: 2rem 1.25rem 3rem;
  text-align: center;
}

.lecture-back {
  display: inline-block;
  margin-bottom: 1.5rem;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  transition: color 0.2s;
}

.lecture-back:hover {
  color: var(--color-primary);
}

.lecture-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.75rem;
}

.lecture-title {
  font-size: clamp(1.75rem, 5vw, 2.75rem);
  font-weight: 800;
  line-height: 1.25;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.lecture-lead {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  max-width: 36rem;
  margin-inline: auto;
}

.lecture-layout {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1.25rem;
  display: grid;
  gap: 2.5rem;
  align-items: start;
}

@media (min-width: 1024px) {
  .lecture-layout {
    grid-template-columns: 1fr 14rem;
  }
}

.lecture-toc {
  display: none;
  position: sticky;
  top: 5rem;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-surface) 90%, transparent);
  backdrop-filter: blur(8px);
}

@media (min-width: 1024px) {
  .lecture-toc {
    display: block;
    order: 2;
  }

  .lecture-sections {
    order: 1;
  }
}

.lecture-toc-heading {
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  margin-bottom: 0.75rem;
}

.lecture-toc-link {
  display: block;
  padding: 0.45rem 0.5rem;
  font-size: 0.8125rem;
  line-height: 1.4;
  color: var(--color-text-secondary);
  border-radius: 0.5rem;
  transition: color 0.2s, background 0.2s;
}

.lecture-toc-link:hover {
  color: var(--color-text);
  background: var(--color-muted);
}

.lecture-toc-link--active {
  color: var(--color-primary);
  font-weight: 600;
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
}

.lecture-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.lecture-block {
  scroll-margin-top: 5.5rem;
}

.lecture-block-inner {
  border-radius: 1.25rem;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: clamp(1.25rem, 4vw, 2rem);
  box-shadow: 0 1px 3px rgb(0 0 0 / 4%);
}

.lecture-chapter {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 0.35rem;
}

.lecture-block-title {
  font-size: clamp(1.35rem, 3vw, 1.75rem);
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text);
}

.lecture-block-sub {
  margin-top: 0.4rem;
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.lecture-block-content {
  margin-top: 1.25rem;
}

.lecture-paragraph {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-text);
  margin-bottom: 0.85rem;
}

.lecture-list {
  margin: 0.75rem 0 0;
  padding-inline-start: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.lecture-list-item {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--color-text);
  padding-inline-start: 0.25rem;
  border-inline-start: 2px solid var(--color-primary);
  padding-block: 0.15rem;
}

.lecture-code-block {
  margin-top: 1rem;
}

.lecture-code-caption {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: 0.35rem;
}

.lecture-code {
  direction: ltr;
  text-align: left;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.78rem;
  line-height: 1.6;
  padding: 1rem 1.15rem;
  background: #1e1e1e;
  color: #d4d4d4;
  border-radius: 0.75rem;
  overflow-x: auto;
  white-space: pre;
  border: 1px solid #333;
}

.lecture-callout {
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
  margin-top: 1.25rem;
  padding: 0.85rem 1rem;
  border-radius: 0.75rem;
  background: color-mix(in srgb, var(--color-accent) 12%, var(--color-surface));
  border: 1px solid color-mix(in srgb, var(--color-accent) 35%, var(--color-border));
}

.lecture-callout-icon {
  flex-shrink: 0;
  font-size: 1.1rem;
}

.lecture-callout p {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.55;
  color: var(--color-text);
}

.lecture-footer {
  max-width: 48rem;
  margin: 3rem auto 0;
  padding: 0 1.25rem;
  text-align: center;
}

.lecture-footer-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-primary);
}

.lecture-footer-link:hover {
  text-decoration: underline;
}
</style>
