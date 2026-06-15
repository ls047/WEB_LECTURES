import type { LectureContent } from '@/types/lecture.types';
import { webCssFundamentals } from './web-css-fundamentals';
import { webHtmlFormsCss } from './web-html-forms-css';
import { webIntroHtml } from './web-intro-html';

const lectureContentBySlug: Record<string, LectureContent> = {
  [webIntroHtml.slug]: webIntroHtml,
  [webHtmlFormsCss.slug]: webHtmlFormsCss,
  [webCssFundamentals.slug]: webCssFundamentals,
};

export const getLectureContent = (slug: string): LectureContent | undefined =>
  lectureContentBySlug[slug];
