import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotionGlobal } from '../motion/useReducedMotionGlobal';
import { cn } from '../utils/cn';

/**
 * AntiGravity Wrapper Component
 * Proporciona un efecto de levitación continua suave y premium en el eje Y.
 * Respeta las preferencias de accesibilidad del usuario.
 */
export const AntiGravity = ({
  children,
  className = '',
  delay = 0,
  duration = 4,
  yDistance = -12,
  ...props
}) => {
  const { prefersReduced } = useReducedMotionGlobal();

  // Si el usuario prefiere movimiento reducido en el SO, la animación y transición se desactivan.
  const floatTransition = prefersReduced
    ? {}
    : {
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
        delay,
      };

  const floatAnimation = prefersReduced
    ? { y: 0 }
    : { y: [0, yDistance] };

  return (
    <motion.div
      className={cn('will-change-transform', className)}
      animate={floatAnimation}
      transition={floatTransition}
      {...props}
    >
      {children}
    </motion.div>
  );
};
