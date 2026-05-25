import { MotionContainer } from '../ui/MotionContainer';
import { RevealText } from '../ui/RevealText';
import { FadeIn } from '../ui/FadeIn';
import { cn } from '../utils/cn';

export const HeroSection = ({ 
  title, 
  subtitle, 
  primaryCta, 
  secondaryCta,
  visualContent,
  className
}) => {
  return (
    <section className={cn("relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16", className)}>
      <div className="absolute inset-0 -z-10 bg-background" aria-hidden="true" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <MotionContainer staggerChildren={0.15} className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-foreground leading-tight mb-6">
              {title.split('\n').map((line, i) => (
                <RevealText key={i} text={line} as="span" className="block" />
              ))}
            </h1>
            
            {subtitle && (
              <FadeIn delay={0.4} direction="up" className="text-lg md:text-xl text-foreground/70 mb-10 max-w-xl leading-relaxed">
                <p>{subtitle}</p>
              </FadeIn>
            )}
            
            <FadeIn delay={0.6} direction="up" className="flex flex-wrap items-center gap-4">
              {primaryCta}
              {secondaryCta}
            </FadeIn>
          </MotionContainer>

          {visualContent && (
            <FadeIn delay={0.3} direction="none" duration={1.2} className="relative w-full aspect-square lg:aspect-auto h-full flex items-center justify-center">
              {visualContent}
            </FadeIn>
          )}

        </div>
      </div>
    </section>
  );
};
