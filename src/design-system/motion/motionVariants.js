import { easings, durations } from './easingPresets';

/**
 * Catálogo de variantes estandarizadas para el Design System.
 * Reutilizar estas variantes garantiza la consistencia visual en toda la app.
 */
export const motionVariants = {
  // Stagger Container: Para envolver hijos y que aparezcan en cascada.
  staggerContainer: (staggerDelay = 0.1, delayChildren = 0) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren,
      }
    }
  }),

  // Fade Up: Elemento sube ligeramente mientras se hace visible.
  fadeUp: (yOffset = 20, duration = durations.base, delay = 0) => ({
    hidden: { opacity: 0, y: yOffset },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration, delay, ease: easings.cinematic }
    }
  }),

  // Reveal Text: Para tipografía oculta que se desliza (overflow: hidden container required).
  revealText: (duration = durations.slow, delay = 0) => ({
    hidden: { y: "100%", opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration, delay, ease: easings.cinematic }
    }
  }),

  // Scale In: Entradas para cards o modales
  scaleIn: (duration = durations.base) => ({
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration, ease: easings.cinematic }
    }
  })
};
