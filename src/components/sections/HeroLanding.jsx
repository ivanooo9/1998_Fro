import {
  MotionContainer,
  RevealText,
  FadeIn,
  PremiumButton,
  cn
} from '../../design-system';

export const HeroLanding = ({ isLoading }) => {
  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-background">
      {/* Background Cinematic Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source media="(min-width: 1024px)" src="/videos/hero-pc.mp4" type="video/mp4" />
        <source media="(min-width: 768px)" src="/videos/hero-tablet.mp4" type="video/mp4" />
        <source src="/videos/hero-mobile.mp4" type="video/mp4" />
      </video>

      {/* Video Overlay Layer */}
      <div className="absolute inset-0 bg-white/75 dark:bg-black/60 z-0 pointer-events-none" />

      {/* Background Cinematic Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] bg-glow-primary/10 dark:bg-glow-primary/20 rounded-[100%] blur-[120px] opacity-40 dark:opacity-50 mix-blend-multiply dark:mix-blend-screen translate-y-[-20%]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <MotionContainer
          animate={isLoading ? "hidden" : "visible"}
          staggerChildren={0.12}
          delayChildren={0.4}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Tagline / Badge Wrapper */}
          <FadeIn direction="up" delay={0} staggered={true} className="mb-6">
            {/* INYECTAR BADGE CORPORATIVO DE MERLIN STUDIO AQUÍ */}
          </FadeIn>

          {/* Main Hero Title */}


          {/* Subtitle description Wrapper */}
          <FadeIn direction="up" delay={0.2} staggered={true} className="max-w-2xl mb-8">
            {/* INYECTAR SUBTÍTULO O FRASE INICIAL DE MERLIN STUDIO AQUÍ */}
          </FadeIn>

          {/* CTA Buttons Wrapper */}
          <FadeIn direction="up" delay={0.3} staggered={true} className="flex gap-4 items-center justify-center">
            {/* INYECTAR BOTONES DE ACCIÓN DE MERLIN STUDIO AQUÍ */}
          </FadeIn>
        </MotionContainer>
      </div>

      {/* Subtle bottom gradient to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};


