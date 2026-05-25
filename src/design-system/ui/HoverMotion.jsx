import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { easings } from '../motion/easingPresets';
import { useReducedMotionGlobal } from '../motion/useReducedMotionGlobal';

export const HoverMotion = ({ 
  children, 
  className,
  scale = 1.02,
  y = -5
}) => {
  const { prefersReduced } = useReducedMotionGlobal();

  return (
    <motion.div
      className={cn("inline-block", className)}
      whileHover={prefersReduced ? {} : { 
        scale, 
        y,
        transition: { duration: 0.4, ease: easings.cinematic } 
      }}
      whileTap={prefersReduced ? {} : { scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};
