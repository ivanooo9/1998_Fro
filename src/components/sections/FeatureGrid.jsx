import { MotionContainer, FadeIn, RevealText, cn } from '@/design-system';
import { MarketingCard } from '../cards/MarketingCard';

const features = [
  {
    title: "1. Elige tu servicio",
    description: "Branding, redes sociales, diseño web, publicidad o ventas. Tú eliges lo que necesitas y nosotros lo hacemos realidad.",
    icon: <i className="bi bi-bag-check-fill text-3xl"></i>,
  },
  {
    title: "2. Conoce a tu equipo",
    description: "Te integramos a un grupo exclusivo en WhatsApp. Ahí estarás en contacto directo con tu asesor, diseñador y estratega.",
    icon: <i className="bi bi-people-fill text-3xl"></i>,
  },
  {
    title: "3. Haz tu primer pedido",
    description: "¿Necesitas ventas, web o publicidad? Lo solicitas y nuestro equipo lo entrega en tiempo récord con calidad.",
    icon: <i className="bi bi-lightning-fill text-3xl"></i>,
  }
];

export const FeatureGrid = () => {
  return (
    <section 
      id="como-trabajamos" 
      // [Refactor]: Estandarización de ritmo vertical a py-24 y uso obligatorio de la utilidad cn()
      className={cn("py-24 bg-background relative")}
    >
      <div className={cn("container mx-auto px-6 md:px-12")}>
        <div className={cn("mb-16 text-center max-w-2xl mx-auto")}>
          <h2 className={cn("text-3xl md:text-5xl font-heading font-extrabold tracking-tight mb-6")}>
            <RevealText text="¿Cómo trabajamos?" />
          </h2>
          <FadeIn delay={0.2} direction="up" className={cn("text-foreground/70 text-lg")}>
            Rápido, claro y enfocado en resultados.
          </FadeIn>
        </div>

        {/* [Refactor]: Ajuste de gap de cuadrícula responsiva a gap-8 para una jerarquía visual premium y espaciado consistente */}
        <MotionContainer 
          staggerChildren={0.15} 
          className={cn("grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch")}
        >
          {features.map((feature, i) => (
            <FadeIn key={i} direction="up" className={cn("h-full")}>
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
