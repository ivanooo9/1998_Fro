import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { MotionContainer, FadeIn, RevealText, PremiumButton, cn } from '@/design-system';

export const MarketingSection = ({ reversed = false }) => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  // [Refactor]: Detecta si la sección está en el viewport para pausar el video y mitigar consumo de GPU
  const isInView = useInView(sectionRef, { amount: 0.15 });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(error => console.log("Autoplay de marketing prevenido:", error));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      // [Refactor]: Estandarización de ritmo vertical a py-24 y uso obligatorio de la utilidad cn()
      className={cn("py-24 overflow-hidden relative")}
    >
      <div className={cn("container mx-auto px-6 md:px-12")}>
        <div className={cn("flex gap-12 lg:gap-20 items-center", reversed ? 'flex-col-reverse lg:flex-row-reverse' : 'flex-col lg:flex-row')}>

          {/* Text Content */}
          <MotionContainer staggerChildren={0.2} className={cn("flex-1 max-w-xl")}>
            <h2 className={cn("text-3xl md:text-5xl font-heading font-extrabold tracking-tight mb-6 leading-tight")}>
              <RevealText text="No somos una" className={cn("block")} />
              <RevealText text="empresa cualquiera." delay={0.1} className={cn("block text-foreground/70")} />
            </h2>
            <FadeIn delay={0.3} direction="up" className={cn("text-foreground/70 text-lg mb-8 leading-relaxed")}>
              <p>
                Creamos marcas con carácter, páginas web que generan ingresos y estrategias digitales que realmente venden. Nuestro modelo es flexible, pero el impacto que logramos es duradero. Te ayudamos a generar resultados.
              </p>
            </FadeIn>
            <FadeIn delay={0.5} direction="up">
              <PremiumButton variant="primary" size="lg" className={cn("w-full sm:w-auto px-12 font-heading font-extrabold")}>Contáctanos</PremiumButton>
            </FadeIn>
          </MotionContainer>

          {/* Visual Showcase (Video Integrado) */}
          <div className={cn("flex-1 w-full max-w-xl lg:max-w-none")}>
            <FadeIn direction={reversed ? 'right' : 'left'} delay={0.2} duration={1.2}>
              <div
                // [Refactor]: Borde de tarjeta tipo glassmorphism suavizado a border-border/20 para estética premium
                className={cn(
                  "relative aspect-square md:aspect-video rounded-3xl overflow-hidden bg-card/85 dark:bg-card/20 border border-border/20 shadow-2xl"
                )}
              >

                {/* Elemento de Video - Capa Base */}
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className={cn("absolute inset-0 w-full h-full object-cover z-0 pointer-events-none")}
                >
                  <source src="/videos/hero-pc.mp4" type="video/mp4" />
                </video>

                {/* Brillos cinemáticos superpuestos - Capa Superior */}
                <div className={cn("absolute top-0 right-0 w-64 h-64 bg-glow-primary/15 dark:bg-glow-primary/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 z-10 pointer-events-none mix-blend-multiply dark:mix-blend-screen")} />
                <div className={cn("absolute bottom-0 left-0 w-64 h-64 bg-glow-secondary/15 dark:bg-glow-secondary/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 z-10 pointer-events-none mix-blend-multiply dark:mix-blend-screen")} />

                {/* Capa de oscurecimiento sutil para que el video no sea cegador */}
                <div className={cn("absolute inset-0 bg-background/20 z-10 pointer-events-none")} />
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};
