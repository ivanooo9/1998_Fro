import React, { useEffect, useRef } from 'react';
import { FadeIn } from '@/design-system';

const projects = [
  {
    title: "Secultura",
    category: "Plataforma Cultural",
    href: "https://secultura.net/",
    img: "https://mil998.com/wp-content/uploads/2025/10/PORTAFOLIO-1998.png"
  },
  {
    title: "Fumilimpieza",
    category: "Servicios Corporativos",
    href: "https://fumilimpieza.net/",
    img: "https://mil998.com/wp-content/uploads/2025/10/3.png"
  },
  {
    title: "CAE Loja",
    category: "Sitio Institucional",
    href: "https://caeloja.com/",
    img: "https://mil998.com/wp-content/uploads/2025/10/4.png"
  },
  {
    title: "Duolens",
    category: "E-commerce Óptica",
    href: "https://duolens.ec/",
    img: "https://mil998.com/wp-content/uploads/2025/10/5.png"
  },
  {
    title: "Electrocercos",
    category: "Desarrollo Web",
    href: "https://electrocercos.ec/",
    img: "https://mil998.com/wp-content/uploads/2025/10/2.png",
    isStart: true
  },
  {
    title: "Maku Sushi",
    category: "Landing Gastronómica",
    href: "https://www.makusushi.com/init",
    img: "https://mil998.com/wp-content/uploads/2025/10/9.png"
  },
  {
    title: "Profesionales EC",
    category: "Directorio Web",
    href: "https://profesionales.ec/",
    img: "https://mil998.com/wp-content/uploads/2025/10/10.png"
  },
  {
    title: "La Marquesa",
    category: "Tienda Online",
    href: "https://lamarquesaecuador.com/",
    img: "https://mil998.com/wp-content/uploads/2025/10/6.png"
  },
  {
    title: "Tienda 98",
    category: "E-commerce",
    href: "https://tienda98.com/",
    img: "https://mil998.com/wp-content/uploads/2025/10/8.png"
  },
  {
    title: "The Clean Harmony",
    category: "Servicios Integrales",
    href: "https://thecleanharmony.com/",
    img: "https://mil998.com/wp-content/uploads/2025/10/7.png"
  },
  {
    title: "Importadora Ortega",
    category: "Catálogo Digital",
    href: "https://importadoraortega.com/",
    img: "https://mil998.com/wp-content/uploads/2025/10/11.png"
  },
  {
    title: "Prestig01",
    category: "Sitio Corporativo",
    href: "https://prestig01.com/",
    img: "https://mil998.com/wp-content/uploads/2025/10/12.png"
  }
];

export const PortfolioCarousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const startEl = carousel.querySelector('.scroll-start');
      if (startEl) {
        // Centrar el elemento con clase 'scroll-start' en el contenedor del carrusel
        const carouselWidth = carousel.clientWidth;
        const cardWidth = startEl.clientWidth;
        const scrollLeftPosition = startEl.offsetLeft - (carouselWidth / 2) + (cardWidth / 2);
        carousel.scrollLeft = scrollLeftPosition;
      }
    }
  }, []);

  return (
    <section id="portafolio" className="py-24 bg-background relative overflow-hidden border-t border-border/20">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-6 text-foreground">
              Nuestro Portafolio
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} direction="up" className="text-foreground/70 text-lg">
            Descubre algunos de los proyectos y soluciones que hemos diseñado para impulsar el crecimiento digital de nuestros clientes.
          </FadeIn>
        </div>
      </div>

      {/* The carousel container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <section ref={carouselRef} className="carousel">
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
              className={project.isStart ? "scroll-start" : undefined}
            >
              <h2>{project.title}</h2>
              <p>{project.category}</p>
              <div className="img">
                <img src={project.img} alt={project.title} loading="lazy" />
              </div>
            </a>
          ))}
        </section>
      </div>
    </section>
  );
};

export default PortfolioCarousel;
