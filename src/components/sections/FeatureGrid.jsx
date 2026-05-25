import { MotionContainer, FadeIn, RevealText } from '../../design-system';
import { MarketingCard } from '../cards/MarketingCard';

const features = [
  {
    title: "Zero Regressions",
    description: "Our defensive wrappers protect your business logic while we safely inject motion primitives.",
    icon: <span className="text-xl">🛡️</span>,
  },
  {
    title: "Cinematic Easing",
    description: "Custom cubic-bezier curves that feel natural, expensive, and meticulously choreographed.",
    icon: <span className="text-xl">🎬</span>,
  },
  {
    title: "GPU Accelerated",
    description: "We strictly animate transforms and opacities to maintain 60fps and zero layout thrashing.",
    icon: <span className="text-xl">⚡</span>,
  }
];

export const FeatureGrid = () => {
  return (
    <section id="features" className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-6">
            <RevealText text="Enterprise Infrastructure." />
          </h2>
          <FadeIn delay={0.2} direction="up" className="text-foreground/70 text-lg">
            Built for legacy migration. Designed for visual excellence.
          </FadeIn>
        </div>

        <MotionContainer staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FadeIn key={i} direction="up">
              <MarketingCard 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                glow={i === 1} // Destacar la carta central
              />
            </FadeIn>
          ))}
        </MotionContainer>
      </div>
    </section>
  );
};
