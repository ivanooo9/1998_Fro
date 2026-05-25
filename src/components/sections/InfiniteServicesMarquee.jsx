"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const InfiniteServicesMarquee = () => {
  const containerRef = useRef(null);

  const services = [
    { id: 1, title: "1. Web & App", description: "Creamos tu página web o app, una sucursal de tu negocio 24/7", bgImage: "/images/fondo-marquee-1.png" },
    { id: 2, title: "2. Publicidad Digital", description: "Anuncios en redes y Google que traen más clientes", bgImage: "/images/fondo-marquee-2.png" },
    { id: 3, title: "3. Branding", description: "Diseñamos tu logo y todo lo que hace única a tu marca", bgImage: "/images/fondo-marquee-3.png" },
    { id: 4, title: "4. Redes Sociales", description: "Manejamos tus redes con contenido que llama la atención", bgImage: "/images/fondo-marquee-4.png" },
    { id: 5, title: "5. Ventas", description: "Te ayudamos a vender más y mejor, sin enredos", bgImage: "/images/fondo-marquee-5.png" }
  ];

  // Rastrear el progreso total del contenedor
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative w-full bg-background pt-[10vh] pb-[10vh]">
      <div className="w-full max-w-4xl mx-auto px-4">
        {services.map((service, index) => {
          // Matemáticas para el efecto 3D:
          // Calcula en qué porcentaje del scroll esta tarjeta debe empezar a encogerse.
          const range = [index * (1 / services.length), 1];

          // Cada tarjeta se encoge un 4% respecto a la anterior
          const targetScale = 1 - ((services.length - index) * 0.04);

          // Mapeamos el progreso del scroll al escalado y a la sombra oscura
          const scale = useTransform(scrollYProgress, range, [1, targetScale]);
          // Oscurece la tarjeta del 0% al 60% a medida que se hunde en el fondo
          const darken = useTransform(scrollYProgress, range, [0, 0.6]);

          return (
            <div
              key={service.id}
              className="sticky w-full flex items-center justify-center"
              style={{
                // AQUÍ ESTÁ EL SECRETO VISUAL:
                // Cada tarjeta se detiene 30 píxeles más abajo que la anterior, 
                // dejando ver el borde superior de la tarjeta de atrás.
                top: `calc(15vh + ${index * 30}px)`,

                // Distancia de scroll entre tarjetas (excepto la última)
                marginBottom: index === services.length - 1 ? '0' : '80vh'
              }}
            >
              <motion.div
                className="relative w-full h-[450px] md:h-[500px] rounded-[32px] overflow-hidden border border-border/20 origin-top"
                // Añadimos una sombra superior para que proyecte sombra sobre la tarjeta de atrás
                style={{
                  scale,
                  boxShadow: '0 -20px 50px -15px rgba(0,0,0,0.6)'
                }}
              >
                {/* Imagen de fondo con hover suave */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url(${service.bgImage})` }}
                ></div>

                {/* Capa base de legibilidad */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Capa de "Profundidad 3D" (Se oscurece al bajar en la baraja) */}
                <motion.div
                  className="absolute inset-0 bg-black z-0 pointer-events-none"
                  style={{ opacity: darken }}
                />

                {/* Contenido de texto */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10 pointer-events-none">
                  <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight drop-shadow-xl">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 text-lg md:text-xl leading-relaxed drop-shadow-md max-w-xl font-medium">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default InfiniteServicesMarquee;