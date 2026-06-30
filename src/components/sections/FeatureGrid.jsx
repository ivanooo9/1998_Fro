import { MotionContainer, FadeIn, RevealText, cn } from '@/design-system';
import { MarketingCard } from '../cards/MarketingCard';

export const FeatureGrid = ({ workSteps }) => {
  if (!workSteps || workSteps.length === 0) {
    return null;
  }

  return (
    <section
      id="como-trabajamos"
      className={cn("py-24 bg-background relative")}
    >
      <div className={cn("container mx-auto px-6 md:px-12")}>
        <div className={cn("mb-16 text-center max-w-2xl mx-auto")}>
          <h2
            className={cn(
              "text-3xl md:text-5xl font-heading font-extrabold tracking-tight mb-6"
            )}
          >
            <RevealText text="¿Cómo trabajamos?" />
          </h2>

          <FadeIn
            delay={0.2}
            direction="up"
            className={cn("text-foreground/70 text-lg")}
          >
            Rápido, claro y enfocado en resultados.
          </FadeIn>
        </div>

        <MotionContainer
          className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
          )}
        >
          {workSteps.map((step, i) => (
            <MarketingCard
              key={step.id || i}
              icon={<i className={step.iconClass}></i>}
              title={step.title}
              description={step.description}
              glow={true}
            />
          ))}
        </MotionContainer>
      </div>
    </section>
  );
};