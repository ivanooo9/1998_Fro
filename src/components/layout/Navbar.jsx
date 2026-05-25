import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { cn, PremiumButton, useIntegrationConfig } from '../../design-system';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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

      {/* CTA and Hamburger */}
      <div className="flex-shrink-0 flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4">
          <PremiumButton variant="ghost" size="sm">
            Blog
          </PremiumButton>
          <PremiumButton variant="primary" size="sm">
            Contáctanos
          </PremiumButton>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-border/40 bg-card/25 text-foreground hover:bg-card/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-20 left-0 right-0 bg-background/95 border-b border-border/80 backdrop-blur-xl md:hidden overflow-hidden z-40"
          >
            <ul className="flex flex-col p-6 gap-4 text-left">
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
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {labelMap[item]}
                    </a>
                  </li>
                );
              })}
              <hr className="border-border/40 my-2" />
              <div className="flex flex-col gap-3 pb-2">
                <PremiumButton variant="ghost" size="sm" className="w-full justify-center">
                  Blog
                </PremiumButton>
                <PremiumButton variant="primary" size="sm" className="w-full justify-center">
                  Contáctanos
                </PremiumButton>
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
