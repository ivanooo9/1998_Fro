import { motion, useScroll, useTransform } from 'framer-motion';
import { cn, PremiumButton, useIntegrationConfig } from '../../design-system';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const { flags } = useIntegrationConfig();

  // Interpolación de background: transparente -> oscuro con glass
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.85)']
  );
  
  // Interpolación de blur: 0 -> 12px
  const backdropBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(12px)']
  );

  // Borde sutil al hacer scroll
  const borderBottom = useTransform(
    scrollY,
    [0, 50],
    ['1px solid rgba(255, 255, 255, 0)', '1px solid rgba(255, 255, 255, 0.08)']
  );

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-6 md:px-12 transition-colors",
      )}
      style={{
        backgroundColor: flags.enableGlassEffects ? backgroundColor : 'rgba(10, 10, 10, 0.95)',
        backdropFilter: flags.enableGlassEffects ? backdropBlur : 'none',
        borderBottom
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Logo Placeholder */}
      <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold font-serif">M</span>
        </div>
        <span className="font-serif font-bold text-xl text-foreground tracking-tight hidden sm:block">
          1998
        </span>
      </div>

      {/* Nav Links */}
      <nav aria-label="Navegación principal" className="hidden md:flex">
        <ul className="flex items-center gap-8">
          {['Vision', 'Features', 'Showcase', 'Pricing'].map((item) => {
            const labelMap = {
              'Vision': 'Inicio',
              'Features': '¿Cómo trabajamos?',
              'Showcase': 'Planes',
              'Pricing': 'Portafolio'
            };
            return (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  {labelMap[item]}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* CTA */}
      <div className="flex-shrink-0 flex items-center gap-4">
        <PremiumButton variant="ghost" size="sm" className="hidden sm:flex">
          Blog
        </PremiumButton>
        <PremiumButton variant="primary" size="sm">
          Contáctanos
        </PremiumButton>
      </div>
    </motion.header>
  );
};
