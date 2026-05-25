import { MotionContainer, FadeIn, PremiumButton } from '../../design-system';

export const CTASection = () => {
  return (
    <section className="py-32 relative overflow-hidden border-t border-border/40 bg-card/10">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <MotionContainer staggerChildren={0.2} className="max-w-4xl mx-auto text-center">
          <FadeIn direction="up">
            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6 leading-tight text-foreground">
              Ready to upgrade your React architecture?
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2} direction="up">
            <p className="text-xl text-foreground/70 mb-12 max-w-2xl mx-auto">
              Inject enterprise-grade motion and progressive enhancement into your legacy app with zero regressions.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.4} direction="up" className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <PremiumButton variant="primary" size="lg" className="w-full sm:w-auto px-12">
              Start Building
            </PremiumButton>
            <PremiumButton variant="ghost" size="lg" className="w-full sm:w-auto px-12">
              Contact Sales
            </PremiumButton>
          </FadeIn>
        </MotionContainer>
      </div>
      
      {/* Glow inferior central */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-primary/10 rounded-t-full blur-3xl pointer-events-none" />
    </section>
  );
};
