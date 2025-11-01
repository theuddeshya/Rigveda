import type { Transition } from 'framer-motion';

/**
 * Standard transition configurations for consistent motion
 */

export const smoothTransition: Transition = {
  duration: 0.3,
  ease: 'easeInOut',
};

export const fastTransition: Transition = {
  duration: 0.15,
  ease: 'easeOut',
};

export const slowTransition: Transition = {
  duration: 0.6,
  ease: 'easeInOut',
};

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
};

export const gentleSpringTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
};

export const delayedTransition = (delay: number): Transition => ({
  duration: 0.3,
  delay,
  ease: 'easeOut',
});
