import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted, onUnmounted, type Ref } from 'vue';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

type ScopeTarget = Ref<HTMLElement | null | undefined> | HTMLElement | null | undefined;

const resolveScope = (scope?: ScopeTarget): Element | string | undefined => {
  if (!scope) return undefined;
  if (typeof scope === 'object' && 'value' in scope) {
    return scope.value ?? undefined;
  }
  return scope ?? undefined;
};

/**
 * Scoped GSAP helper — call `run()` from onMounted (or watchers) to animate.
 * Animations auto-revert when the component unmounts.
 */
export function useGsapScope(scope?: ScopeTarget) {
  let context: gsap.Context | null = null;

  onUnmounted(() => {
    context?.revert();
    context = null;
  });

  const run = (callback: (ctx: gsap.Context) => void) => {
    context?.revert();
    context = gsap.context(callback, resolveScope(scope));
  };

  return { run, revert: () => context?.revert() };
}

/** Convenience wrapper that runs animations once on mount. */
export function useGsapOnMount(
  callback: (ctx: gsap.Context) => void,
  scope?: ScopeTarget,
) {
  const { run } = useGsapScope(scope);
  onMounted(() => run(callback));
}
