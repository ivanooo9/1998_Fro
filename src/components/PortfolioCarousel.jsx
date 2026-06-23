import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn, GlassCard, useReducedMotionGlobal, cn, PremiumButton } from '@/design-system';

// Datos del portafolio obtenidos dinámicamente desde el backend de Prisma


// Subcomponente abstraído para mantener limpio el render principal
const ProjectCard = ({ project, className }) => {
  const { prefersReduced } = useReducedMotionGlobal();

  return (
    <motion.div
      whileHover={prefersReduced ? {} : { 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
      }}
      whileTap={prefersReduced ? {} : { scale: 0.98 }}
      className={cn(
        "glass relative flex flex-col group overflow-hidden w-[var(--card-width)] h-[400px] md:h-[430px] lg:h-[450px] shrink-0 snap-center rounded-2xl transition-colors duration-400 hover:bg-card/80",
        className
      )}
    >
      {/* Imagen del proyecto (Full-Bleed) */}
      <div className="relative z-0 h-40 md:h-44 lg:h-48 overflow-hidden bg-card border-b border-border/40">
        <img
          src={project.imageUrl || project.img}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4 md:p-5 flex flex-col flex-grow relative z-0">
        <span className="text-foreground/50 font-mono text-[10px] md:text-xs mb-1 uppercase tracking-wider">
          {project.category}
        </span>
        <h3 className="font-display text-xl md:text-2xl text-white mb-1.5 md:mb-2 tracking-tight font-bold">
          {project.title}
        </h3>
        <p className="text-foreground/70 text-xs md:text-sm leading-relaxed mb-4 flex-grow">
          {project.description || project.desc}
        </p>

        {/* Botón Premium Integrado */}
        <PremiumButton
          variant="primary"
          size="md" // Cambiado de "lg" a "md" para un ajuste perfecto dentro de la tarjeta
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative z-10 self-start mt-auto px-6 md:px-8 font-heading font-extrabold text-xs md:text-sm",
            // Mantenemos el seudoelemento para que TODA la tarjeta abra el enlace
            "before:absolute before:inset-0 before:z-10"
          )}
        >
          Explorar Caso <i className="bi bi-arrow-up-right ml-1.5 md:ml-2"></i>
        </PremiumButton>
      </div>
    </motion.div>
  );
};


export const PortfolioCarousel = ({ data }) => {
  if (!data) return null;

  const projects = data.projects || [];
  const title = data.title || "Nuestros Proyectos";
  const subtitle = data.subtitle || "";

  const containerRef = useRef(null);
  const carouselMobileRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  const [activeIndex, setActiveIndex] = useState(0);
  const { prefersReduced } = useReducedMotionGlobal();

  // 1. Detección responsiva reactiva
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let cards = 3;
      let mobile = false;
      if (width < 768) {
        mobile = true;
        cards = 1;
      } else if (width < 1024) {
        cards = 2;
      }
      setIsMobile(mobile);
      setVisibleCards(cards);
      
      const maxIdx = Math.max(0, projects.length - cards);
      setActiveIndex((prev) => Math.min(prev, maxIdx));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [projects.length]);

  // Límites de paginación
  const maxIndex = Math.max(0, projects.length - visibleCards);
  const totalDots = maxIndex + 1;

  // Controladores de navegación
  const handlePrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setActiveIndex((prev) => Math.min(prev + 1, maxIndex));

  const handleDotClick = (index) => {
    setActiveIndex(index);
    if (isMobile && carouselMobileRef.current) {
      const card = carouselMobileRef.current.children[0];
      const cardWidth = card ? card.offsetWidth : carouselMobileRef.current.clientWidth * 0.80;
      carouselMobileRef.current.scrollTo({
        left: index * (cardWidth + 24), // Ancho de tarjeta + gap (24px)
        behavior: 'smooth'
      });
    }
  };

  // Sincronización del scroll móvil con los dots
  const handleScroll = (e) => {
    if (!isMobile) return;
    const container = e.target;
    const card = container.children[0];
    const cardWidth = card ? card.offsetWidth : container.clientWidth * 0.80;
    const index = Math.round(container.scrollLeft / (cardWidth + 24));
    if (index >= 0 && index < projects.length) {
      setActiveIndex(index);
    }
  };

  return (
    <section
      ref={containerRef}
      id="portafolio"
      className="relative bg-background border-t border-border/20 py-10 md:py-16 overflow-hidden portfolio-carousel-container"
    >
      <style>{`
        .portfolio-carousel-container {
          --card-gap: 1.5rem;
          --card-width: 80vw;
          --arrow-top: 80px;
        }
        @media (min-width: 768px) {
          .portfolio-carousel-container {
            --card-width: calc((100vw - 13.5rem) / 2);
            --arrow-top: 88px;
          }
        }
        @media (min-width: 1024px) {
          .portfolio-carousel-container {
            --card-width: calc((100vw - 15rem) / 3);
            --arrow-top: 96px;
          }
        }
      `}</style>
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="z-10 relative w-full">

        {/* Cabecera de la Sección con márgenes verticales reducidos */}
        <div className="px-6 md:px-24 mb-8 md:mb-10 max-w-4xl">
          <FadeIn delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl text-white font-bold tracking-tighter">
              {title}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-foreground/75 text-lg md:text-xl mt-3 max-w-2xl">
              {subtitle}
            </p>
          </FadeIn>
        </div>

        {/* Galería con Flechas de Navegación Superpuestas sobre las imágenes (Ajustado verticalmente a top-[104px]) */}
        <div className="relative w-full px-8 md:px-24">

          {/* Flecha izquierda circular blanca centrada verticalmente a la altura de la imagen */}
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="hidden md:flex absolute left-4 md:left-8 top-[var(--arrow-top)] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-black items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Proyecto anterior"
          >
            <i className="bi bi-chevron-left text-lg font-bold text-neutral-800"></i>
          </button>

          {/* Flecha derecha circular blanca centrada verticalmente a la altura de la imagen */}
          <button
            onClick={handleNext}
            disabled={activeIndex >= maxIndex}
            className="hidden md:flex absolute right-4 md:right-8 top-[var(--arrow-top)] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-black items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Siguiente proyecto"
          >
            <i className="bi bi-chevron-right text-lg font-bold text-neutral-800"></i>
          </button>

          {isMobile || prefersReduced ? (
            <div
              ref={carouselMobileRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory gap-[var(--card-gap)] pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden relative z-20"
            >
              {projects.map((project, i) => (
                <ProjectCard
                  key={i}
                  project={project}
                  className="snap-center"
                />
              ))}
            </div>
          ) : (
            <div className="relative w-full overflow-hidden">
              <motion.div
                animate={{ x: `calc(-${activeIndex} * var(--card-width) - ${activeIndex} * var(--card-gap))` }}
                transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
                className="flex gap-[var(--card-gap)] w-max relative z-20"
              >
                {projects.map((project, i) => (
                  <ProjectCard
                    key={i}
                    project={project}
                  />
                ))}
              </motion.div>
            </div>
          )}
        </div>

        {/* Puntos de paginación (dots) con márgenes verticales reducidos */}
        <div className="flex justify-center gap-3 mt-8 md:mt-10 relative z-20">
          {Array.from({ length: totalDots }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={cn(
                "h-3 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-10 bg-primary"
                  : "w-3 bg-white/20 hover:bg-white/50"
              )}
              aria-label={`Ir a la diapositiva ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PortfolioCarousel;