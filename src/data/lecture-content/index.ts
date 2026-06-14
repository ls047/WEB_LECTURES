import type { LectureContent } from '@/types/lecture.types';
import { webIntroHtml } from './web-intro-html';

const lectureContentBySlug: Record<string, LectureContent> = {
  [webIntroHtml.slug]: webIntroHtml,
};

export const getLectureContent = (slug: string): LectureContent | undefined =>
  lectureContentBySlug[slug];
