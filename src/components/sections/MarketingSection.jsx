import { MotionContainer, FadeIn, RevealText, PremiumButton, GlassCard } from '../../design-system';

export const MarketingSection = ({ reversed = false }) => {
  return (
    <section className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className={`flex gap-12 lg:gap-20 items-center ${reversed ? 'flex-col-reverse lg:flex-row-reverse' : 'flex-col lg:flex-row'}`}>

          {/* Text Content */}
          <MotionContainer staggerChildren={0.2} className="flex-1 max-w-xl">
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-6 leading-tight">
              <RevealText text="No somos una" className="block" />
              <RevealText text="empresa cualquiera." delay={0.1} className="block text-foreground/70" />
            </h2>
            <FadeIn delay={0.3} direction="up" className="text-foreground/70 text-lg mb-8 leading-relaxed">
              <p>
                Creamos marcas con carácter, páginas web que generan ingresos y estrategias digitales que realmente venden. Nuestro modelo es flexible, pero el impacto que logramos es duradero. Te ayudamos a generar resultados.
              </p>
            </FadeIn>
            <FadeIn delay={0.5} direction="up">
              <PremiumButton variant="outline">Contáctanos</PremiumButton>
            </FadeIn>
          </MotionContainer>

          {/* Visual Showcase (Video Integrado) */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none">
            <FadeIn direction={reversed ? 'right' : 'left'} delay={0.2} duration={1.2}>
              {/* Se eliminó el p-4 md:p-8 para que el video llene el contenedor hasta los bordes redondeados */}
              <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden bg-card/20 border border-border shadow-2xl">

                {/* Elemento de Video - Capa Base */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                >
                  <source src="/videos/hero-pc.mp4" type="video/mp4" />
                </video>

                {/* Brillos cinemáticos superpuestos - Capa Superior */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 z-10 pointer-events-none mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 z-10 pointer-events-none mix-blend-screen" />

                {/* Capa de oscurecimiento sutil para que el video no sea cegador */}
                <div className="absolute inset-0 bg-background/20 z-10 pointer-events-none" />
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};
