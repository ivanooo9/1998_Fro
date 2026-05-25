import { 
  MotionContainer, 
  RevealText, 
  FadeIn, 
  PremiumButton, 
  cn 
} from '../../design-system';

export const HeroLanding = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Background Cinematic Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] bg-primary/20 rounded-[100%] blur-[120px] opacity-50 mix-blend-screen translate-y-[-20%]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <MotionContainer staggerChildren={0.15} className="max-w-4xl mx-auto flex flex-col items-center">
          
          <FadeIn delay={0.1} direction="up" className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/80 border border-border text-xs font-medium text-foreground/80 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              1998 - Desarrollo de Software
            </span>
          </FadeIn>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-foreground leading-[1.1] mb-8">
            <RevealText text="Estrategia, creatividad" className="block" />
            <RevealText text="y resultados reales." delay={0.1} className="block text-foreground/80" />
          </h1>
          
          <FadeIn delay={0.4} direction="up" className="text-lg md:text-xl text-foreground/60 mb-10 max-w-2xl leading-relaxed">
            <p>
              Creamos marcas que venden. Te ayudamos a destacar con desarrollo web, marketing digital y estrategias de ventas que sí funcionan. Atrae más clientes y aumenta tus ingresos.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.6} direction="up" className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <PremiumButton variant="primary" size="lg" className="w-full sm:w-auto">
              Contáctanos
            </PremiumButton>
            <PremiumButton variant="outline" size="lg" className="w-full sm:w-auto">
              Nuestro Portafolio
            </PremiumButton>
          </FadeIn>
        </MotionContainer>
      </div>
      
      {/* Subtle bottom gradient to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
