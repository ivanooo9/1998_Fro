import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { motionVariants } from '../motion/motionVariants';
import { useReducedMotionGlobal } from '../motion/useReducedMotionGlobal';

export const MotionContainer = ({ 
  children, 
  className,
  staggerChildren = 0.1, 
  delayChildren = 0,
  as = 'div'
}) => {
  const { safeStagger } = useReducedMotionGlobal();
  const MotionComponent = motion[as] || motion.div;

  // Si prefiere reduced motion, anulamos el stagger (0) para mostrar la lista de golpe y evitar fatiga visual.
  const finalStagger = safeStagger !== undefined ? safeStagger : staggerChildren;

  return (
    <MotionComponent
      className={cn(className)}
      variants={motionVariants.staggerContainer(finalStagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </MotionComponent>
  );
};
