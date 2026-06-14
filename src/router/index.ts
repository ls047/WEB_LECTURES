import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home.vue'),
      meta: { layout: 'marketing', title: 'محاضرات تطوير الويب' },
    },
    {
      path: '/lectures/:slug',
      name: 'lecture',
      component: () => import('@/pages/Lecture.vue'),
      meta: { layout: 'marketing' },
    },
    {
      path: '/500',
      name: 'server-error',
      component: () => import('@/pages/ServerError.vue'),
      meta: { layout: 'marketing' },
    },
    {
      path: '/offline',
      name: 'offline',
      component: () => import('@/pages/Offline.vue'),
      meta: { layout: 'marketing' },
    },
    ...(import.meta.env.DEV
      ? [
          {
            path: '/_theme',
            name: 'theme-studio',
            component: () => import('@/pages/_theme.vue'),
            meta: { layout: 'marketing' },
          },
        ]
      : []),
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFound.vue'),
      meta: { layout: 'marketing' },
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
});

router.beforeEach((to, _from, next) => {
  const title = to.meta.title;
  if (typeof title === 'string' && title) {
    document.title = title;
  } else if (to.name === 'home') {
    document.title = 'محاضرات تطوير الويب';
  }
  next();
});

export default router;
