import type { Lecture } from '@/types/lecture.types';

export const lectures: Lecture[] = [
  {
    id: '1',
    slug: 'web-intro-html',
    title: 'مقدمة عن تطوير الويب + أساسيات HTML',
    description:
      'محاور: مفهوم تطوير الويب، آلية عمل المواقع، Frontend و Backend، HTML، والعناصر الأساسية — مع تطبيق عملي.',
    order: 1,
    tags: ['HTML', 'أساسيات', 'تطوير الويب'],
    published: true,
  },
  {
    id: '2',
    slug: 'web-html-forms-css',
    title: 'HTML عملي + النماذج (Forms) + مقدمة في CSS',
    description:
      'محاور: مراجعة HTML، الصور، القوائم، النماذج وحقول الإدخال، مقدمة CSS، ربط ملفات التنسيق — مع تطبيق عملي لصفحة تعريف شخصية.',
    order: 2,
    tags: ['HTML', 'Forms', 'CSS', 'أساسيات'],
    published: true,
  },
  {
    id: '3',
    slug: 'web-css-fundamentals',
    title: 'أساسيات CSS',
    description:
      'محاور: بنية قواعد CSS، Selectors، الألوان والخلفيات، تنسيق النصوص، الحدود، Margin و Padding — مع تطبيق عملي لبطاقة شخصية.',
    order: 3,
    tags: ['CSS', 'أساسيات', 'تنسيق'],
    published: true,
  },
];

export const getLectureBySlug = (slug: string): Lecture | undefined =>
  lectures.find((lecture) => lecture.slug === slug);

export const getPublishedLectures = (): Lecture[] =>
  [...lectures]
    .filter((lecture) => lecture.published !== false)
    .sort((a, b) => a.order - b.order);
