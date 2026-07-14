import { MotionContainer, FadeIn, PremiumButton, cn } from '@/design-system';

export const CTASection = ({ data }) => {
  const title = data?.title || "¿Cuál plan se ajusta mejor a tu negocio?";
  const description = data?.description || "Desde desarrollo web hasta cierres de ventas. En 1998 nos encargamos de que tu empresa destaque de verdad.";
  const buttonText = data?.buttonText || "Escríbenos";
  const buttonLink = data?.buttonLink || "#";

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
              {title}
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} direction="up">
            {/* [Refactor]: Mejora de legibilidad con leading-relaxed y opacidad text-foreground/70 */}
            <p className={cn("text-xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed")}>
              {description}
            </p>
          </FadeIn>

          {buttonText && (
            <FadeIn delay={0.4} direction="up" className={cn("flex flex-col sm:flex-row items-center justify-center gap-6")}>
              <PremiumButton
                variant="primary"
                size="lg"
                href={buttonLink}
                className={cn("w-40 font-heading font-extrabold text-center")} // w-40 equivale a 160px de ancho
              >
                {buttonText}
              </PremiumButton>
            </FadeIn>
          )}
        </MotionContainer>
      </div>
    </section>
  );
};

