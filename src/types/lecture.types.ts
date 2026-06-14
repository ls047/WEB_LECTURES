export interface Lecture {
  id: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  tags?: string[];
  published?: boolean;
}

export interface LectureSection {
  id: string;
  chapter?: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  bullets?: string[];
  highlight?: string;
  code?: string;
  codeCaption?: string;
}

export interface LectureContent {
  slug: string;
  locale?: 'ar' | 'en';
  courseLabel?: string;
  heroSubtitle?: string;
  sections: LectureSection[];
}

/** @deprecated Use LectureSection */
export type BookPage = LectureSection;
