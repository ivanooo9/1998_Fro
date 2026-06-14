import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { FadeIn, RevealText, cn, useIntegrationConfig } from '@/design-system';

export const CinematicShowcase = () => {
  const { flags } = useIntegrationConfig();
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  
  // [Refactor]: Detecta si la sección está en el viewport para pausar el video y mitigar consumo de GPU
  const isInView = useInView(sectionRef, { amount: 0.1 });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(error => console.log("Autoplay de showcase prevenido:", error));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <section 
      ref={sectionRef}
      // [Refactor]: Estandarización de ritmo vertical a py-24 y uso obligatorio de la utilidad cn()
      className={cn("py-24 bg-background relative overflow-hidden")}
    >
      <div className={cn("container mx-auto px-6 md:px-12 relative z-10 text-center")}>
        <div className={cn("max-w-3xl mx-auto mb-20")}>
          <h2 className={cn("text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-8")}>
            <RevealText text="Impulsa tu Marca." />
          </h2>
          <FadeIn delay={0.2} direction="up" className={cn("text-foreground/70 text-lg md:text-xl")}>
            <p>Lleva tu negocio al siguiente nivel hoy mismo.</p>
          </FadeIn>
        </div>

        {/* Massive Floating Image / Video Frame */}
        <FadeIn delay={0.4} direction="up" duration={1.2}>
          <div 
            // [Refactor]: Borde de tarjeta tipo glassmorphism suavizado a border-border/20 para estética premium
            className={cn(
              "relative w-full max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-card/40 border border-border/20 shadow-[0_0_100px_-20px_rgba(255,255,255,0.05)] flex items-center justify-center"
            )}
          >

            {/* Etiqueta de Video Cinematográfico */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              // [Refactor]: Eventos de puntero desactivados ya que el video es decorativo
              className={cn("absolute inset-0 w-full h-full object-cover z-0 pointer-events-none")}
            >
              {/* Cambia esta ruta por la de tu video en la carpeta public */}
              <source src="/videos/hero-pc.mp4" media="(min-width: 1024px)" type="video/mp4" />
            </video>

            {/* Capa de Efecto Glass (superpuesta al video) */}
            {flags.enableGlassEffects && (
              <div className={cn("absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10")} />
            )}

          </div>
        </FadeIn>
      </div>
    </section>
  );
};