import { FadeIn, RevealText, cn, useIntegrationConfig } from '../../design-system';

export const CinematicShowcase = () => {
  const { flags } = useIntegrationConfig();

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-8">
            <RevealText text="Flawless Execution." />
          </h2>
          <FadeIn delay={0.2} direction="up" className="text-foreground/70 text-lg md:text-xl">
            <p>Every frame, every interaction, perfectly tuned to 60fps.</p>
          </FadeIn>
        </div>

        {/* Massive Floating Image / Video Placeholder */}
        <FadeIn delay={0.4} direction="up" duration={1.2}>
          <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-card/40 border border-border/50 shadow-[0_0_100px_-20px_rgba(255,255,255,0.05)] flex items-center justify-center">
            
            {flags.enableGlassEffects && (
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            )}
            
            <div className="text-foreground/30 font-serif tracking-widest text-sm uppercase">
              Cinematic Media Frame
            </div>
            
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
