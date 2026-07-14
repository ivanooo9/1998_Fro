import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Preloader = ({ onComplete, isFetching }) => {
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

  // 3. Temporizador de Espera Minimalista (Fase 1) - Espera a que termine el Fetching
  useEffect(() => {
    if (isFetching) return;

    // Espera un breve instante (800ms) y luego dispara el desmontaje/animación de salida
    const timer = setTimeout(() => {
      onComplete();
    }, 800);

    return () => clearTimeout(timer);
  }, [onComplete, isFetching]);

  // Si aún no medimos dimensiones, mostramos fondo oscuro estático
  if (dimensions.width === 0 || dimensions.height === 0) {
    return <div className="fixed inset-0 bg-[#0d0d0d] z-[9999]" />;
  }

  const { width, height } = dimensions;

  // Curvas de morphing para el SVG (Transición Líquida / Cortina Elástica)
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
      {/* SVG Path Liquid Curtain Background - Cambiado a negro/oscuro premium */}
      <svg className="absolute top-0 left-0 w-full h-[calc(100vh+300px)] fill-[#0d0d0d] pointer-events-none z-0">
        <motion.path
          variants={curtainVariants}
          initial="initial"
          exit="exit"
        />
      </svg>

      {/* Spinner minimalista y elegante que se desvanece al terminar */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative flex items-center justify-center">
          {/* Círculo animado en órbita */}
          <div className="w-20 h-20 rounded-full border border-white/5 border-t-white/80 animate-spin" />

          {/* Logo/Marca central estático */}
          <div className="absolute font-display font-black text-xl text-white tracking-widest">
            1998
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};
