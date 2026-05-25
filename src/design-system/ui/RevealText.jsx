import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { motionVariants } from '../motion/motionVariants';
import { useReducedMotionGlobal } from '../motion/useReducedMotionGlobal';

export const RevealText = ({ 
  text, 
  className,
  delay = 0,
  duration,
  as: Component = 'span' 
}) => {
  const { safeDuration } = useReducedMotionGlobal();

  return (
    <Component className={cn("reveal-wrapper", className)}>
      <motion.span
        className="block"
        variants={motionVariants.revealText(safeDuration || duration, delay)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {text}
      </motion.span>
    </Component>
  );
};
