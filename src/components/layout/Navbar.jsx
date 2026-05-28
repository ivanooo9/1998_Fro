import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { cn, PremiumButton, useIntegrationConfig } from '../../design-system';

export const Navbar = ({ isLoading }) => {
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

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

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
      animate={isLoading ? { y: -100 } : { y: 0 }}
      transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
    >
      {/* Desktop Panoramic Layout */}
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] w-full items-center h-full gap-8 lg:gap-20">

        {/* Left Nav: Distribuido a los extremos */}
        <div className="flex items-center justify-between w-full">
          <PremiumButton
            variant="primary"
            size="sm"
            className="bg-transparent hover:bg-transparent text-white border-none shadow-none p-0"
            onClick={(e) => handleNavClick(e, 'blog')}
          >
            Blog
          </PremiumButton>
          <PremiumButton
            variant="primary"
            size="sm"
            className="bg-transparent hover:bg-transparent text-white border-none shadow-none p-0 mr-8"
            onClick={(e) => handleNavClick(e, 'como-trabajamos')}
          >
            ¿Cómo trabajamos?
          </PremiumButton>
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center px-4">
          <div
            onClick={(e) => handleNavClick(e, 'inicio')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold font-serif">M</span>
            </div>
            <span className="font-serif font-bold text-xl text-foreground tracking-tight">
              1998
            </span>
          </div>
        </div>

        {/* Right Nav: Distribuido a los extremos */}
        <div className="flex items-center justify-between w-full">
          <PremiumButton
            variant="primary"
            size="sm"
            className="bg-transparent hover:bg-transparent text-white border-none shadow-none p-0 ml-8"
            onClick={(e) => handleNavClick(e, 'planes')}
          >
            Planes
          </PremiumButton>
          <PremiumButton
            variant="primary"
            size="sm"
            className="bg-transparent hover:bg-transparent text-white border-none shadow-none p-0"
            onClick={(e) => handleNavClick(e, 'portafolio')}
          >
            Portafolio
          </PremiumButton>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden w-full items-center justify-between h-full">
        {/* Mobile Logo */}
        <div
          onClick={(e) => handleNavClick(e, 'inicio')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold font-serif">M</span>
          </div>
          <span className="font-serif font-bold text-xl text-foreground tracking-tight">
            1998
          </span>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-border/40 bg-card/25 text-foreground hover:bg-card/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
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
              {['Blog', 'Features', 'Showcase', 'Pricing'].map((item) => {
                const labelMap = {
                  'Blog': 'Blog',
                  'Features': '¿Cómo trabajamos?',
                  'Showcase': 'Planes',
                  'Pricing': 'Portafolio'
                };
                const targetMap = {
                  'Blog': 'blog',
                  'Features': 'como-trabajamos',
                  'Showcase': 'planes',
                  'Pricing': 'portafolio'
                };
                const targetId = targetMap[item];
                return (
                  <li key={item}>
                    <PremiumButton
                      variant="primary"
                      size="sm"
                      className="w-full justify-center bg-transparent hover:bg-transparent text-white border-none shadow-none"
                      onClick={(e) => handleNavClick(e, targetId)}
                    >
                      {labelMap[item]}
                    </PremiumButton>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};