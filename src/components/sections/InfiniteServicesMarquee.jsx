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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative w-full bg-background pt-[10vh] pb-[10vh]">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        {services.map((service, index) => {
          const range = [index * (1 / services.length), 1];
          const targetScale = 1 - ((services.length - index) * 0.04);
          const scale = useTransform(scrollYProgress, range, [1, targetScale]);
          const darken = useTransform(scrollYProgress, range, [0, 0.6]);

          return (
            <div
              key={service.id}
              className="sticky w-full flex items-center justify-center"
              style={{
                top: `calc(10vh + ${index * 30}px)`,

                // LA SOLUCIÓN ESTÁ AQUÍ:
                // Le damos 100vh de margen a la última tarjeta. Esto fuerza al navegador a 
                // crear una "pista de scroll" extra equivalente a una pantalla entera. 
                // Así, la tarjeta #5 tiene espacio para subir, colocarse en su lugar, y hacer
                // una pausa antes de que toda la sección desaparezca.
                marginBottom: index === services.length - 1 ? '100vh' : '80vh'
              }}
            >
              <motion.div
                className="relative w-full h-[70vh] md:h-[80vh] rounded-[32px] overflow-hidden border border-border/20 origin-top"
                style={{
                  scale,
                  boxShadow: '0 -20px 50px -15px rgba(0,0,0,0.6)'
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url(${service.bgImage})` }}
                ></div>

                <div className="absolute inset-0 bg-black/40"></div>

                <motion.div
                  className="absolute inset-0 bg-black z-0 pointer-events-none"
                  style={{ opacity: darken }}
                />

                <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-end z-10 pointer-events-none">
                  <h3 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight drop-shadow-xl">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 text-xl md:text-2xl leading-relaxed drop-shadow-md max-w-2xl font-medium">
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