import {
  MotionContainer,
  RevealText,
  FadeIn,
  PremiumButton,
  cn
} from '@/design-system';

export const HeroLanding = ({ data, isLoading }) => {
  if (!data) return null;

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="inicio" 
      // [Refactor]: Contenedor del Hero principal utilizando la utilidad cn()
      className={cn("relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-background")}
    >
      <h1 className="sr-only">{data.seoTitle}</h1>
      
      {/* Background Cinematic Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        // [Refactor]: Ajuste de clases con la utilidad cn() y control de eventos
        className={cn("absolute inset-0 w-full h-full object-cover z-0 pointer-events-none")}
      >
        {data.videoDesktopUrl && <source media="(min-width: 1024px)" src={data.videoDesktopUrl} type="video/mp4" />}
        {data.videoTabletUrl && <source media="(min-width: 768px)" src={data.videoTabletUrl} type="video/mp4" />}
        {data.videoMobileUrl && <source src={data.videoMobileUrl} type="video/mp4" />}
      </video>

      {/* Video Overlay Layer */}
      <div className={cn("absolute inset-0 bg-white/75 dark:bg-black/60 z-0 pointer-events-none")} />

      {/* Background Cinematic Glow */}
      <div className={cn("absolute inset-0 z-0 flex items-center justify-center pointer-events-none")}>
        <div className={cn("w-[800px] h-[500px] bg-glow-primary/10 dark:bg-glow-primary/20 rounded-[100%] blur-[120px] opacity-40 dark:opacity-50 mix-blend-multiply dark:mix-blend-screen translate-y-[-20%]")} />
      </div>

      {/* Subtle bottom gradient to blend with next section */}
      <div className={cn("absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none")} />
    </section>
  );
};
