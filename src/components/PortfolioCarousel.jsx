import React, { useEffect, useRef } from 'react';
import { FadeIn } from '../design-system';

const PortfolioCarousel = () => {
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
    <section id="portfolio" className="py-24 bg-background relative overflow-hidden border-t border-border/20">
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
          <a href="https://secultura.net/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>Secultura</h2>
            <p>Plataforma Cultural</p>
            <div className="img"><img src="https://mil998.com/wp-content/uploads/2025/10/PORTAFOLIO-1998.png" alt="Secultura" loading="lazy" /></div>
          </a>

          <a href="https://fumilimpieza.net/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>Fumilimpieza</h2>
            <p>Servicios Corporativos</p>
            <div className="img"><img src="https://mil998.com/wp-content/uploads/2025/10/3.png" alt="Fumilimpieza" loading="lazy" /></div>
          </a>

          <a href="https://caeloja.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>CAE Loja</h2>
            <p>Sitio Institucional</p>
            <div className="img"><img src="https://mil998.com/wp-content/uploads/2025/10/4.png" alt="CAE Loja" loading="lazy" /></div>
          </a>

          <a href="https://duolens.ec/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>Duolens</h2>
            <p>E-commerce Óptica</p>
            <div className="img"><img src="https://mil998.com/wp-content/uploads/2025/10/5.png" alt="Duolens" loading="lazy" /></div>
          </a>

          <a href="https://electrocercos.ec/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }} className="scroll-start">
            <h2>Electrocercos</h2>
            <p>Desarrollo Web</p>
            <div className="img"><img src="https://mil998.com/wp-content/uploads/2025/10/2.png" alt="Electrocercos" loading="lazy" /></div>
          </a>

          <a href="https://www.makusushi.com/init" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>Maku Sushi</h2>
            <p>Landing Gastronómica</p>
            <div className="img"><img src="https://mil998.com/wp-content/uploads/2025/10/9.png" alt="Maku Sushi" loading="lazy" /></div>
          </a>

          <a href="https://profesionales.ec/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>Profesionales EC</h2>
            <p>Directorio Web</p>
            <div className="img"><img src="https://mil998.com/wp-content/uploads/2025/10/10.png" alt="Profesionales EC" loading="lazy" /></div>
          </a>

          <a href="https://lamarquesaecuador.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>La Marquesa</h2>
            <p>Tienda Online</p>
            <div className="img"><img src="https://mil998.com/wp-content/uploads/2025/10/6.png" alt="La Marquesa" loading="lazy" /></div>
          </a>

          <a href="https://tienda98.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>Tienda 98</h2>
            <p>E-commerce</p>
            <div className="img"><img src="https://mil998.com/wp-content/uploads/2025/10/8.png" alt="Tienda 98" loading="lazy" /></div>
          </a>

          <a href="https://thecleanharmony.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>The Clean Harmony</h2>
            <p>Servicios Integrales</p>
            <div className="img"><img src="https://mil998.com/wp-content/uploads/2025/10/7.png" alt="The Clean Harmony" loading="lazy" /></div>
          </a>

          <a href="https://importadoraortega.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>Importadora Ortega</h2>
            <p>Catálogo Digital</p>
            <div className="img"><img src="https://mil998.com/wp-content/uploads/2025/10/11.png" alt="Importadora Ortega" loading="lazy" /></div>
          </a>

          <a href="https://prestig01.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>Prestig01</h2>
            <p>Sitio Corporativo</p>
            <div className="img"><img src="https://mil998.com/wp-content/uploads/2025/10/12.png" alt="Prestig01" loading="lazy" /></div>
          </a>
        </section>
      </div>
    </section>
  );
};

export default PortfolioCarousel;
