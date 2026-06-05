import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { motionVariants } from '../motion/motionVariants';
import { useReducedMotionGlobal } from '../motion/useReducedMotionGlobal';

export const FadeIn = ({ 
  children, 
  className,
  delay = 0,
  duration,
  direction = 'up',
  as = 'div',
  staggered = false
}) => {
  const { safeY, safeX, safeDuration } = useReducedMotionGlobal();
  const MotionComponent = motion[as] || motion.div;

  // Resolve direction
  let yOffset = direction === 'up' ? 20 : direction === 'down' ? -20 : 0;
  let xOffset = direction === 'left' ? 20 : direction === 'right' ? -20 : 0;
  
  // Apply safe fallback for reduced motion
  yOffset = safeY !== undefined ? safeY : yOffset;
  xOffset = safeX !== undefined ? safeX : xOffset;

  return (
    <MotionComponent
      className={cn(className)}
      variants={motionVariants.fadeUp(yOffset, safeDuration || duration, delay, xOffset)}
      {...(!staggered && {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-50px" }
      })}
    >
      {children}
    </MotionComponent>
  );
};
