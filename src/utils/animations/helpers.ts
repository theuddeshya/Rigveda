import type { Variants, Transition } from 'framer-motion';

/**
 * Helper functions for creating conditional animations based on reduced motion preferences
 */

/**
 * Returns empty variants if reduced motion is preferred, otherwise returns the provided variants
 */
export const getConditionalVariants = (
  prefersReducedMotion: boolean,
  variants: Variants
): Variants => {
  if (prefersReducedMotion) {
    return {
      hidden: {},
      visible: {},
    };
  }
  return variants;
};

/**
 * Returns instant transition if reduced motion is preferred, otherwise returns the provided transition
 */
export const getConditionalTransition = (
  prefersReducedMotion: boolean,
  transition: Transition
): Transition => {
  if (prefersReducedMotion) {
    return { duration: 0 };
  }
  return transition;
};

/**
 * Returns empty object if reduced motion is preferred, otherwise returns the provided animation object
 */
export const getConditionalAnimation = <T extends object>(
  prefersReducedMotion: boolean,
  animation: T
): T | Record<string, never> => {
  if (prefersReducedMotion) {
    return {};
  }
  return animation;
};

/**
 * Stagger delay calculator for list animations
 */
export const getStaggerDelay = (index: number, baseDelay = 0.05): number => {
  return index * baseDelay;
};
