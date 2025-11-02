import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeInVariants, fadeInUpVariants, getConditionalVariants, getConditionalTransition, getConditionalAnimation, delayedTransition } from '../../utils/animations';

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={getConditionalVariants(prefersReducedMotion, fadeInVariants)}
      transition={getConditionalTransition(prefersReducedMotion, { duration: 1 })}
      className="flex flex-col items-center justify-center pt-16 md:pt-20 pb-6 md:pb-8 px-4"
    >
      <motion.h1
        variants={getConditionalVariants(prefersReducedMotion, fadeInUpVariants)}
        transition={getConditionalTransition(prefersReducedMotion, delayedTransition(0.2))}
        className="text-7xl sm:text-8xl md:text-9xl font-sanskrit mb-8 text-center text-vedic-text"
      >ऋग्वेदः</motion.h1>
      <motion.div
        variants={getConditionalVariants(prefersReducedMotion, fadeInUpVariants)}
        transition={getConditionalTransition(prefersReducedMotion, delayedTransition(0.8))}
      >
        <Link to="/explore">
          <motion.button
            whileHover={getConditionalAnimation(prefersReducedMotion, { scale: 1.05 })}
            whileTap={getConditionalAnimation(prefersReducedMotion, { scale: 0.95 })}
            className={cn(
              "rounded-full px-10 py-4 sm:px-14 sm:py-5 text-lg font-semibold",
              "bg-accent text-accent-foreground",
              "hover:bg-accent/90 hover:shadow-2xl hover:shadow-accent/20",
              "transition-all duration-300",
              "border-2 border-accent/50 hover:border-accent",
              "min-h-[44px] min-w-[44px]"
            )}
          >Begin Your Journey →</motion.button>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
