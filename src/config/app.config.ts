import type { AppConfig } from './types';

export const appConfig: AppConfig = {
  app: {
    name: 'محاضرات تطوير الويب',
    title: 'محاضرات تطوير الويب — دروس تفاعلية',
    description: 'محاضرات تطوير الويب بالعربية — صفحات تفاعلية مدعومة بـ GSAP',
    version: '1.0.0',
    author: '',
    url: 'https://example.com',
    language: 'ar',
  },

  theme: {
    defaultTheme: 'light',
    light: {
      primary: '#16a34a',
      secondary: '#059669',
      accent: '#4ade80',
      background: '#ffffff',
      surface: '#f0fdf4',
      text: '#14532d',
      textSecondary: '#3f6212',
      border: '#bbf7d0',
      muted: '#ecfdf5',
      link: '#15803d',
      linkHover: '#166534',
      emphasis: '#14532d',
      success: '#16a34a',
      warning: '#ca8a04',
      error: '#dc2626',
      info: '#059669',
    },
    dark: {
      primary: '#4ade80',
      secondary: '#34d399',
      accent: '#86efac',
      background: '#052e16',
      surface: '#064e3b',
      text: '#ecfdf5',
      textSecondary: '#a7f3d0',
      border: '#065f46',
      muted: '#064e3b',
      link: '#4ade80',
      linkHover: '#86efac',
      emphasis: '#bbf7d0',
      success: '#4ade80',
      warning: '#facc15',
      error: '#f87171',
      info: '#34d399',
    },
  },

  typography: {
    fonts: [
      {
        name: 'IBM Plex Sans',
        src: '/font/IBMPlexSansArabic-Regular.ttf',
        weight: 400,
        style: 'normal',
        display: 'swap',
        preload: true,
      },
    ],
    primary: {
      family: 'IBM Plex Sans',
      fallbacks: [
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'sans-serif',
      ],
      cssVariable: 'font-primary',
    },
    secondary: {
      family: 'Georgia',
      fallbacks: ['Times New Roman', 'serif'],
      cssVariable: 'font-secondary',
    },
    mono: {
      family: 'Fira Code',
      fallbacks: ['Courier New', 'Courier', 'monospace'],
      cssVariable: 'font-mono',
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  icons: {
    favicon: '/vite.svg',
    sizes: ['192x192', '512x512'],
  },

  seo: {
    title: 'محاضرات تطوير الويب — دروس تفاعلية',
    description: 'محاضرات تطوير الويب بالعربية — صفحات تفاعلية مدعومة بـ GSAP',
    keywords: ['تطوير الويب', 'HTML', 'محاضرات', 'GSAP', 'ويب'],
    robots: 'index, follow',
    openGraph: {
      siteName: 'محاضرات تطوير الويب',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
    },
  },

  layout: {
    containerMaxWidth: '1280px',
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem',
      '2xl': '4rem',
    },
  },
};
