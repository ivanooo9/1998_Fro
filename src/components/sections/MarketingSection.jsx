import { MotionContainer, FadeIn, RevealText, PremiumButton, GlassCard } from '../../design-system';

export const MarketingSection = ({ reversed = false }) => {
  return (
    <section className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className={`flex flex-col gap-12 lg:gap-20 items-center ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
          
          {/* Text Content */}
          <MotionContainer staggerChildren={0.2} className="flex-1 max-w-xl">
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-6 leading-tight">
              <RevealText text="Motion as a" className="block" />
              <RevealText text="First-Class Citizen." delay={0.1} className="block text-foreground/70" />
            </h2>
            <FadeIn delay={0.3} direction="up" className="text-foreground/70 text-lg mb-8 leading-relaxed">
              <p>
                We don't just add animations as an afterthought. We build motion directly into the architectural layer, ensuring every hover, scroll, and click feels incredibly polished and deliberate without breaking React's reactivity.
              </p>
            </FadeIn>
            <FadeIn delay={0.5} direction="up">
              <PremiumButton variant="outline">Learn more</PremiumButton>
            </FadeIn>
          </MotionContainer>

          {/* Visual Showcase (Placeholder) */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none">
            <FadeIn direction={reversed ? 'right' : 'left'} delay={0.2} duration={1.2}>
              <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden bg-card/20 border border-border p-4 md:p-8">
                {/* Abstract Visuals */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
                
                <GlassCard className="w-full h-full flex flex-col items-center justify-center gap-6 shadow-2xl">
                  <div className="w-16 h-16 rounded-2xl bg-card border border-border/50 flex items-center justify-center animate-pulse">
                    ✨
                  </div>
                  <div className="w-3/4 h-2 bg-foreground/10 rounded-full" />
                  <div className="w-1/2 h-2 bg-foreground/10 rounded-full" />
                </GlassCard>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};
