import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn, useReducedMotionGlobal, cn, PremiumButton } from '@/design-system';

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
        "relative flex flex-col group overflow-hidden h-[395px] shrink-0 snap-center rounded-2xl border border-white/5 bg-neutral-950/40 backdrop-blur-md transition-all duration-300 hover:bg-neutral-900/60 hover:border-white/10 shadow-xl p-5",
        className
      )}
      // Forzamos el ancho a la variable calculada
      style={{ width: 'var(--card-width)' }}
    >
      <div className="img-container relative z-0 h-44 w-full overflow-hidden rounded-xl bg-neutral-900 border border-white/5 shrink-0 aspect-video">
        <img
          src={project.imageUrl || project.img}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="pt-4 flex flex-col flex-grow relative z-10">
        <span className="text-foreground/50 font-mono text-xs mb-1 uppercase tracking-wider">
          {project.category}
        </span>
        <h3 className="font-display text-xl text-white mb-2 tracking-tight font-bold line-clamp-1 break-words">
          {project.title}
        </h3>
        <p className="text-foreground/70 text-sm leading-relaxed mb-4 flex-grow line-clamp-3 break-words">
          {project.description || project.desc}
        </p>

        <PremiumButton
          variant="primary"
          size="md"
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 self-start mt-auto px-5 py-2 font-heading font-extrabold text-sm"
        >
          Explorar <i className="bi bi-arrow-up-right ml-2"></i>
        </PremiumButton>
      </div>
    </motion.div>
  );
};

export const PortfolioCarousel = ({ data }) => {
  if (!data) return null;
  const { projects = [], title = "Nuestros Proyectos", subtitle = "" } = data;

  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const maxIndex = Math.max(0, projects.length - visibleCards);
  const totalDots = maxIndex + 1;

  const handlePrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setActiveIndex((prev) => Math.min(prev + 1, maxIndex));

  return (
    <section id="portafolio" className="relative bg-background border-t border-border/20 py-24 overflow-hidden portfolio-carousel-container">
      <style>{`
        .portfolio-carousel-container {
          --card-gap: 24px;
        }
        @media (min-width: 768px) {
          .portfolio-carousel-container { --card-width: calc((100% - 24px) / 2); }
        }
        @media (min-width: 1024px) {
          .portfolio-carousel-container { --card-width: calc((100% - 48px) / 3); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-12 mb-10">
        <h2 className="text-6xl text-white font-bold tracking-tighter">{title}</h2>
        <p className="text-foreground/75 text-xl mt-3">{subtitle}</p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-12">
        {/* Flechas de navegación */}
        <button onClick={handlePrev} disabled={activeIndex === 0} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white text-black items-center justify-center hover:scale-105 disabled:opacity-0">
          <i className="bi bi-chevron-left"></i>
        </button>
        <button onClick={handleNext} disabled={activeIndex >= maxIndex} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white text-black items-center justify-center hover:scale-105 disabled:opacity-0">
          <i className="bi bi-chevron-right"></i>
        </button>

        {/* Carrusel */}
        <div className="w-full overflow-hidden">
          <motion.div
            animate={{ x: `calc(-${activeIndex} * (var(--card-width) + var(--card-gap)))` }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
            className="flex gap-[var(--card-gap)]"
          >
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-10">
        {Array.from({ length: totalDots }).map((_, i) => (
          <button key={i} onClick={() => setActiveIndex(i)} className={cn("h-3 rounded-full transition-all", i === activeIndex ? "w-10 bg-primary" : "w-3 bg-white/20")} />
        ))}
      </div>
    </section>
  );
};

export default PortfolioCarousel;