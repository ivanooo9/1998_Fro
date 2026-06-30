import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '../utils/cn';

/**
 * AntiGravity Wrapper Component
 * Proporciona un efecto de levitación continua suave y premium en el eje Y utilizando GSAP.
 * Respeta las preferencias de accesibilidad del usuario desactivando el movimiento.
 */
export const AntiGravity = ({
  children,
  className = '',
  delay = 0,
  duration = 4,
  yDistance = -12,
  ...props
}) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Verificación del lado del cliente para Reduced Motion (Accesibilidad)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      // Asegurar que el elemento esté estático en el eje Y
      gsap.set(containerRef.current, { y: 0 });
      return;
    }

    // Animación infinita oscilatoria en el eje Y
    gsap.to(containerRef.current, {
      y: yDistance,
      duration: duration,
      delay: delay,
      repeat: -1, // Bucle infinito
      yoyo: true, // Ida y vuelta
      ease: 'sine.inOut', // Flotación fluida tipo burbuja
    });
  }, { scope: containerRef, dependencies: [duration, delay, yDistance] });

  return (
    <div
      ref={containerRef}
      className={cn('will-change-transform', className)}
      {...props}
    >
      {children}
    </div>
  );
};
