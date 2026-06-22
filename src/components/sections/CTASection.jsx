import { MotionContainer, FadeIn, PremiumButton, cn } from '@/design-system';

export const CTASection = () => {
  return (
    <section
      id="planes"
      // [Refactor]: Estandarización de ritmo vertical a py-24, borde sutil border-border/20 y uso de cn()
      className={cn("py-24 relative overflow-hidden border-t border-border/20 bg-card/50 dark:bg-card/10")}
    >
      <div className={cn("container mx-auto px-6 md:px-12 relative z-10")}>
        <MotionContainer staggerChildren={0.2} className={cn("max-w-4xl mx-auto text-center")}>
          <FadeIn direction="up">
            <h2 className={cn("text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-6 leading-tight text-foreground")}>
              ¿Cuál plan se ajusta mejor a tu negocio?
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} direction="up">
            {/* [Refactor]: Mejora de legibilidad con leading-relaxed y opacidad text-foreground/70 */}
            <p className={cn("text-xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed")}>
              Desde desarrollo web hasta cierres de ventas. En 1998 nos encargamos de que tu empresa destaque de verdad.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} direction="up" className={cn("flex flex-col sm:flex-row items-center justify-center gap-6")}>
            <PremiumButton
              variant="primary"
              size="lg"
              className={cn("w-40 font-heading font-extrabold text-center")} // w-40 equivale a 160px de ancho
            >
              Escríbenos
            </PremiumButton>
          </FadeIn>
        </MotionContainer>
      </div>

      {/* [Refactor]: Acabado estético premium con token bg-glow-primary configurado */}
      <div className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-glow-primary/10 dark:bg-glow-primary/15 rounded-t-full blur-3xl pointer-events-none")} />
    </section>
  );
};

