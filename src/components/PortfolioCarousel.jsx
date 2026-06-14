import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn, GlassCard, useReducedMotionGlobal, cn } from '@/design-system';

// Datos reales estructurados del portafolio 1998
const projects = [
  {
    title: "Secultura",
    category: "Plataforma Cultural",
    href: "https://secultura.net/",
    desc: "Plataforma de difusión cultural y gestión de eventos artísticos.",
    img: "https://mil998.com/wp-content/uploads/2025/10/PORTAFOLIO-1998.png"
  },
  {
    title: "Fumilimpieza",
    category: "Servicios Corporativos",
    href: "https://fumilimpieza.net/",
    desc: "Sitio corporativo optimizado para la cotización de servicios de limpieza industrial.",
    img: "https://mil998.com/wp-content/uploads/2025/10/3.png"
  },
  {
    title: "CAE Loja",
    category: "Sitio Institucional",
    href: "https://caeloja.com/",
    desc: "Portal institucional y académico para el Colegio de Arquitectos de Loja.",
    img: "https://mil998.com/wp-content/uploads/2025/10/4.png"
  },
  {
    title: "Duolens",
    category: "E-commerce Óptica",
    href: "https://duolens.ec/",
    desc: "Plataforma e-commerce avanzada con catálogo digital para óptica y lentes.",
    img: "https://mil998.com/wp-content/uploads/2025/10/5.png"
  },
  {
    title: "Electrocercos",
    category: "Desarrollo Web",
    href: "https://electrocercos.ec/",
    desc: "Landing page y embudo de conversión para sistemas de seguridad perimetral.",
    img: "https://mil998.com/wp-content/uploads/2025/10/2.png",
    isStart: true
  },
  {
    title: "Maku Sushi",
    category: "Landing Gastronómica",
    href: "https://www.makusushi.com/init",
    desc: "Plataforma gastronómica digital con menú interactivo y pedidos en línea.",
    img: "https://mil998.com/wp-content/uploads/2025/10/9.png"
  },
  {
    title: "Profesionales EC",
    category: "Directorio Web",
    href: "https://profesionales.ec/",
    desc: "Directorio profesional y red de contactos para especialistas en Ecuador.",
    img: "https://mil998.com/wp-content/uploads/2025/10/10.png"
  },
  {
    title: "La Marquesa",
    category: "Tienda Online",
    href: "https://lamarquesaecuador.com/",
    desc: "Tienda online premium para productos de belleza y cuidado personal.",
    img: "https://mil998.com/wp-content/uploads/2025/10/6.png"
  },
  {
    title: "Tienda 98",
    category: "E-commerce",
    desc: "Comercio electrónico multiproducto optimizado para conversión rápida.",
    img: "https://mil998.com/wp-content/uploads/2025/10/8.png"
  },
  {
    title: "The Clean Harmony",
    category: "Servicios Integrales",
    href: "https://thecleanharmony.com/",
    desc: "Portal de servicios residenciales y comerciales de limpieza integral.",
    img: "https://mil998.com/wp-content/uploads/2025/10/7.png"
  },
  {
    title: "Importadora Ortega",
    category: "Catálogo Digital",
    href: "https://importadoraortega.com/",
    desc: "Catálogo digital mayorista con pasarela de consulta y cotizaciones.",
    img: "https://mil998.com/wp-content/uploads/2025/10/11.png"
  },
  {
    title: "Prestig01",
    category: "Sitio Corporativo",
    href: "https://prestig01.com/",
    desc: "Sitio web corporativo de consultoría y branding empresarial de alto nivel.",
    img: "https://mil998.com/wp-content/uploads/2025/10/12.png"
  }
];

// Subcomponente abstraído para mantener limpio el render principal
const ProjectCard = ({ project, className }) => (
  <GlassCard 
    interactive={true} 
    className={cn("relative flex flex-col group overflow-hidden w-[85vw] md:w-[30vw] h-[380px] md:h-[400px] shrink-0", className)}
  >
    {/* Ajustado alto proporcionalmente a h-44 y h-52 */}
    <div className="relative z-0 h-44 md:h-52 overflow-hidden bg-card border-b border-border/40">
      <img 
        src={project.img} 
        alt={project.title} 
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        loading="lazy"
      />
    </div>
    {/* Reducidos paddings y márgenes para eliminar el espacio vacío */}
    <div className="p-5 flex flex-col flex-grow relative z-0">
      <span className="text-foreground/50 font-mono text-xs mb-1 uppercase tracking-wider">
        {project.category}
      </span>
      <h3 className="font-display text-2xl text-white mb-2 tracking-tight font-bold">
        {project.title}
      </h3>
      <p className="text-foreground/70 text-sm leading-relaxed mb-4 flex-grow">
        {project.desc}
      </p>
      
      {/* Enlace semántico accesible con pseudo-elemento absoluto para cubrir la tarjeta */}
      <a 
        href={project.href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="relative z-10 self-start mt-auto inline-flex items-center justify-center rounded-full border border-border bg-transparent px-5 py-2 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background before:absolute before:inset-0 before:z-10"
      >
        Explorar Caso <i className="bi bi-arrow-up-right ml-1"></i>
      </a>
    </div>
  </GlassCard>
);

export const PortfolioCarousel = () => {
  const containerRef = useRef(null);
  const carouselMobileRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { prefersReduced } = useReducedMotionGlobal();

  // 1. Detección responsiva reactiva
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice(); 
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Límites de paginación
  const maxIndex = isMobile ? projects.length - 1 : projects.length - 3;
  const totalDots = maxIndex + 1;

  // Controladores de navegación
  const handlePrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setActiveIndex((prev) => Math.min(prev + 1, maxIndex));

  const handleDotClick = (index) => {
    setActiveIndex(index);
    if (isMobile && carouselMobileRef.current) {
      const cardWidth = carouselMobileRef.current.clientWidth * 0.85; // 85vw
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
    const cardWidth = container.clientWidth * 0.85;
    const index = Math.round(container.scrollLeft / (cardWidth + 24));
    if (index >= 0 && index < projects.length) {
      setActiveIndex(index);
    }
  };

  return (
    <section 
      ref={containerRef} 
      id="portafolio" 
      className="relative bg-background border-t border-border/20 py-10 md:py-16 overflow-hidden"
    >
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
              Nuestros Proyectos
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-foreground/75 text-lg md:text-xl mt-3 max-w-2xl">
              Innovación técnica y diseño estratégico aplicados a problemas del mundo real.
            </p>
          </FadeIn>
        </div>

        {/* Galería con Flechas de Navegación Superpuestas sobre las imágenes (Ajustado verticalmente a top-[104px]) */}
        <div className="relative w-full">
          
          {/* Flecha izquierda circular blanca centrada verticalmente a la altura de la imagen (top-[104px]) */}
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="hidden md:flex absolute left-4 md:left-8 top-[104px] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-black items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Proyecto anterior"
          >
            <i className="bi bi-chevron-left text-lg font-bold text-neutral-800"></i>
          </button>

          {/* Flecha derecha circular blanca centrada verticalmente a la altura de la imagen (top-[104px]) */}
          <button
            onClick={handleNext}
            disabled={activeIndex >= maxIndex}
            className="hidden md:flex absolute right-4 md:right-8 top-[104px] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-black items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Siguiente proyecto"
          >
            <i className="bi bi-chevron-right text-lg font-bold text-neutral-800"></i>
          </button>

          {isMobile || prefersReduced ? (
            <div 
              ref={carouselMobileRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden relative z-20"
            >
              {projects.map((project, i) => (
                <ProjectCard 
                  key={i} 
                  project={project} 
                  className={cn("snap-center", i === 0 && "ml-6")} 
                />
              ))}
            </div>
          ) : (
            <div className="relative w-full overflow-visible">
              <motion.div 
                animate={{ x: `calc(-${activeIndex * 30}vw - ${activeIndex * 2}rem)` }}
                transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
                className="flex gap-8 w-max relative z-20"
              >
                {projects.map((project, i) => (
                  <ProjectCard 
                    key={i} 
                    project={project} 
                    className={cn(i === 0 && "ml-24")} 
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