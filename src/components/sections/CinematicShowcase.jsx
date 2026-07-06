import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { FadeIn, RevealText, cn, useIntegrationConfig, isVideo } from '@/design-system';

// Recibimos infoBlocks como prop
export const CinematicShowcase = ({ infoBlocks = [] }) => {
  const { flags } = useIntegrationConfig();
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.1 });

  // 1. Buscamos el bloque de showcase. Si no existe, usamos los textos por defecto
  const block = infoBlocks.find(b => b.identifier === 'showcase') || {};

  const title = block.title || "Impulsa tu Marca.";
  const description = block.description || "Lleva tu negocio al siguiente nivel hoy mismo.";
  const mediaUrl = block.imageUrl;
  const isMediaVideo = isVideo(mediaUrl);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true; // Asegurar muted programático

      if (isInView) {
        videoRef.current.play()
          .catch(() => {}); // Manejar autoplay prevenido silenciosamente
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView, mediaUrl, isMediaVideo]);

  return (
    <section ref={sectionRef} className={cn("py-24 bg-background relative overflow-hidden")}>
      <div className={cn("container mx-auto px-6 md:px-12 relative z-10 text-center")}>
        <div className={cn("max-w-3xl mx-auto mb-20")}>
          <h2 className={cn("text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-8")}>
            <RevealText text={title} />
          </h2>
          <FadeIn delay={0.2} direction="up" className={cn("text-foreground/70 text-lg md:text-xl")}>
            <p>{description}</p>
          </FadeIn>
        </div>

        {/* Massive Floating Image / Video Frame */}
        <FadeIn delay={0.4} direction="up" duration={1.2}>
          <div className={cn("relative w-full max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-card/40 border border-border/20 shadow-[0_0_100px_-20px_rgba(255,255,255,0.05)] flex items-center justify-center")}>
            {mediaUrl ? (
              isMediaVideo ? (
                <video
                  key={mediaUrl}
                  ref={videoRef}
                  src={mediaUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className={cn("absolute inset-0 w-full h-full object-cover z-0 pointer-events-none")}
                />
              ) : (
                <img src={mediaUrl} alt={title} className="absolute inset-0 w-full h-full object-cover z-0" />
              )
            ) : (
              <video
                key="default"
                ref={videoRef}
                src="/videos/hero-pc.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className={cn("absolute inset-0 w-full h-full object-cover z-0 pointer-events-none")}
              />
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};