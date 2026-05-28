"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const InfiniteServicesMarquee = () => {
  const containerRef = useRef(null);

  const services = [
    { id: 1, title: "1. Web & App", description: "Creamos tu página web o app, una sucursal de tu negocio 24/7", bgImage: "/videos/prueba-2.mp4" },
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
    <section ref={containerRef} className="relative w-full bg-background h-[500vh]">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 h-full relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
          Servicios
        </h2>
        {services.map((service, index) => {
          const N = services.length;
          const range = [0];
          const scaleOutput = [1];
          const opacityOutput = [0];

          if (index > 0) {
            range.push(index * (1 / N));
            scaleOutput.push(1);
            opacityOutput.push(0);
          }

          for (let j = index + 1; j < N; j++) {
            const stepProgress = j * (1 / N);
            range.push(stepProgress);

            const depth = j - index;
            const targetScale = 1 - (depth * 0.04);
            scaleOutput.push(targetScale);

            const targetOpacity = Math.min(0.3 + (depth - 1) * 0.15, 0.6);
            opacityOutput.push(targetOpacity);
          }

          if (range[range.length - 1] < 1) {
            range.push(1);
            scaleOutput.push(scaleOutput[scaleOutput.length - 1]);
            opacityOutput.push(opacityOutput[opacityOutput.length - 1]);
          }

          const scale = useTransform(scrollYProgress, range, scaleOutput);
          const darken = useTransform(scrollYProgress, range, opacityOutput);

          return (
            <div
              key={service.id}
              className="sticky h-screen w-full flex items-center justify-center relative"
              style={{
                top: `${index * 30}px`
              }}
            >
              {/* Contenedor de la Tarjeta con Pantalla Dividida */}
              <div className="w-full h-[70vh] md:h-[80vh] grid grid-cols-1 md:grid-cols-2 rounded-[32px] overflow-hidden border border-border/20 shadow-2xl bg-transparent">

                {/* Columna Izquierda: Texto estático con fondo sólido para cubrir el texto anterior */}
                <div className="bg-background w-full h-full p-8 md:p-16 flex flex-col justify-center items-start text-left z-10 relative">
                  <h3 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-foreground/75 text-base md:text-lg leading-relaxed max-w-md font-medium">
                    {service.description}
                  </p>
                </div>

                {/* Columna Derecha: Imagen animada con contenedor padre transparente */}
                <div className="bg-transparent w-full h-full relative overflow-hidden z-0">
                  <motion.div
                    className="w-full h-full origin-top relative"
                    style={{
                      scale,
                      boxShadow: '0 -20px 50px -15px rgba(0,0,0,0.6)'
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                      style={{ backgroundImage: `url(${service.bgImage})` }}
                    ></div>

                    <div className="absolute inset-0 bg-white/40 dark:bg-black/20"></div>

                    <motion.div
                      className="absolute inset-0 bg-black z-0 pointer-events-none"
                      style={{ opacity: darken }}
                    />
                  </motion.div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default InfiniteServicesMarquee;