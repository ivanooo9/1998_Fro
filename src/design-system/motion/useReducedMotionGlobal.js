import { useReducedMotion } from 'framer-motion';

/**
 * Hook centralizado que devuelve las configuraciones seguras en base
 * a la preferencia del SO del usuario.
 * No 'apaga' todo, sino que retorna props de fallback amigables.
 */
export function useReducedMotionGlobal() {
  const prefersReduced = useReducedMotion();

  return {
    prefersReduced,
    
    // Si prefiere poco movimiento, cortamos duraciones drásticamente
    // y aplicamos easings lineales.
    safeDuration: prefersReduced ? 0.01 : undefined,
    
    // Convertir traslaciones espaciales en simples opacidades
    safeY: prefersReduced ? 0 : undefined,
    safeX: prefersReduced ? 0 : undefined,
    
    // Fallback de stagger para revelar listas completas de golpe si es necesario
    safeStagger: prefersReduced ? 0 : undefined,
  };
}
