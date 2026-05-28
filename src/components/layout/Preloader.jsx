import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Preloader = ({ onComplete }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 1. Obtener dimensiones de la pantalla de forma segura para SSR / Next.js
  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Bloqueo de scroll del body mientras el preloader está activo
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow || '';
    };
  }, []);

  // 3. Temporizador de Espera Minimalista (Fase 1)
  useEffect(() => {
    // Espera un breve instante (800ms) y luego dispara el desmontaje/animación de salida
    const timer = setTimeout(() => {
      onComplete();
    }, 800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Si aún no medimos dimensiones, mostramos fondo oscuro estático
  if (dimensions.width === 0 || dimensions.height === 0) {
    return <div className="fixed inset-0 bg-[#0d0d0d] z-[9999]" />;
  }

  const { width, height } = dimensions;

  // Curvas de morphing para el SVG (Transición Líquida / Cortina Elástica)
  // - initialPath: Rectángulo con un arco extra de 300px oculto debajo de la pantalla.
  // - targetPath: Rectángulo totalmente plano colapsado a 0px en la parte superior.
  const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} Z`;
  const targetPath = `M0 0 L${width} 0 L${width} 0 Q${width / 2} 0 0 0 Z`;

  // Variantes de animación para la cortina líquida
  const curtainVariants = {
    initial: {
      d: initialPath,
    },
    exit: {
      d: targetPath,
      transition: {
        duration: 1.2,
        // Curva Bézier cúbica con alta inercia (Inercias físicas reales)
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] pointer-events-none select-none"
      initial="initial"
      exit="exit"
    >
      {/* SVG Path Liquid Curtain Background */}
      <svg className="absolute top-0 left-0 w-full h-[calc(100vh+300px)] fill-[#b4b4b4] pointer-events-none z-0">
        <motion.path
          variants={curtainVariants}
          initial="initial"
          exit="exit"
        />
      </svg>
    </motion.div>
  );
};
