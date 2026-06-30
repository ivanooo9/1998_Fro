import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { MotionContainer, FadeIn, RevealText, PremiumButton, cn } from '@/design-system';

const isVideo = (url) => {
  if (!url) return false;
  const cleanUrl = url.split('?')[0].split('#')[0].toLowerCase();
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.quicktime'];
  return videoExtensions.some(ext => cleanUrl.endsWith(ext)) || url.toLowerCase().includes('/video/upload/');
};

// Recibimos infoBlocks como prop
export const MarketingSection = ({ reversed = false, infoBlocks = [] }) => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });

  // 1. Buscamos el bloque de marketing. Si no existe, usamos los textos por defecto
  const block = infoBlocks.find(b => b.identifier === 'marketing') || {};

  const title = block.title || "No somos una empresa cualquiera.";
  const description = block.description || "Creamos marcas con carácter, páginas web que generan ingresos y estrategias digitales que realmente venden. Nuestro modelo es flexible, pero el impacto que logramos es duradero. Te ayudamos a generar resultados.";
  const buttonText = block.buttonText || "Contáctanos";
  const mediaUrl = block.imageUrl;
  const isMediaVideo = isVideo(mediaUrl);

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(error => console.log("Autoplay prevenido:", error));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView, mediaUrl, isMediaVideo]);

  return (
    <section ref={sectionRef} className={cn("py-24 overflow-hidden relative")}>
      <div className={cn("container mx-auto px-6 md:px-12")}>
        <div className={cn("flex gap-12 lg:gap-20 items-center", reversed ? 'flex-col-reverse lg:flex-row-reverse' : 'flex-col lg:flex-row')}>

          {/* Text Content */}
          <MotionContainer staggerChildren={0.2} className={cn("flex-1 max-w-xl")}>
            <h2 className={cn("text-3xl md:text-5xl font-heading font-extrabold tracking-tight mb-6 leading-tight")}>
              <RevealText text={title} className={cn("block")} />
            </h2>
            <FadeIn delay={0.3} direction="up" className={cn("text-foreground/70 text-lg mb-8 leading-relaxed")}>
              <p>{description}</p>
            </FadeIn>
            <FadeIn delay={0.5} direction="up">
              <PremiumButton variant="primary" size="md" className={cn("w-auto px-8 font-heading font-extrabold")}>
                {buttonText}
              </PremiumButton>
            </FadeIn>
          </MotionContainer>

          {/* Visual Showcase (Imagen o Video Dinámico / Defecto) */}
          <div className={cn("flex-1 w-full max-w-xl lg:max-w-none")}>
            <FadeIn direction={reversed ? 'right' : 'left'} delay={0.2} duration={1.2}>
              <div className={cn("relative aspect-square md:aspect-video rounded-3xl overflow-hidden bg-card/85 dark:bg-card/20 border border-border/20 shadow-2xl")}>
                {mediaUrl ? (
                  isMediaVideo ? (
                    <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" className={cn("absolute inset-0 w-full h-full object-cover z-0 pointer-events-none")}>
                      <source src={mediaUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={mediaUrl} alt={title} className="absolute inset-0 w-full h-full object-cover z-0" />
                  )
                ) : (
                  <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" className={cn("absolute inset-0 w-full h-full object-cover z-0 pointer-events-none")}>
                    <source src="/videos/hero-pc.mp4" type="video/mp4" />
                  </video>
                )}
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};