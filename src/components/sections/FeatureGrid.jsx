import { MotionContainer, FadeIn, RevealText } from '@/design-system';
import { MarketingCard } from '../cards/MarketingCard';

const features = [
  {
    title: "1. Elige tu servicio",
    description: "Branding, redes sociales, diseño web, publicidad o ventas. Tú eliges lo que necesitas y nosotros lo hacemos realidad.",
    icon: <span className="text-xl">🛡️</span>,
  },
  {
    title: "2. Conoce a tu equipo",
    description: "Te integramos a un grupo exclusivo en WhatsApp. Ahí estarás en contacto directo con tu asesor, diseñador y estratega.",
    icon: <span className="text-xl">🎬</span>,
  },
  {
    title: "3. Haz tu primer pedido",
    description: "¿Necesitas ventas, web o publicidad? Lo solicitas y nuestro equipo lo entrega en tiempo récord con calidad.",
    icon: <span className="text-xl">⚡</span>,
  }
];

export const FeatureGrid = () => {
  return (
    <section id="como-trabajamos" className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-6">
            <RevealText text="¿Cómo trabajamos?" />
          </h2>
          <FadeIn delay={0.2} direction="up" className="text-foreground/70 text-lg">
            Rápido, claro y enfocado en resultados.
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
