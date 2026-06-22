import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { cn, PremiumButton, useIntegrationConfig } from '@/design-system';

export const Navbar = ({ isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { flags } = useIntegrationConfig();

  // Bloqueo de scroll del body al abrir el menú de pantalla completa
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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
    <>
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

          {/* Left Nav: Alineado a la derecha con gap */}
          <div className="flex items-center justify-end w-full gap-12">
            <PremiumButton
              variant="primary"
              size="sm"
              className="bg-transparent hover:bg-transparent text-white border-none shadow-none p-0"
              onClick={(e) => handleNavClick(e, 'como-trabajamos')}
            >
              ¿Cómo trabajamos?
            </PremiumButton>
            <PremiumButton
              variant="primary"
              size="sm"
              className="bg-transparent hover:bg-transparent text-white border-none shadow-none p-0"
              onClick={(e) => handleNavClick(e, 'servicios')}
            >
              Servicios
            </PremiumButton>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center px-4">
            <div
              onClick={(e) => handleNavClick(e, 'inicio')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center overflow-hidden">
                <img
                  src="/images/IMG_4002.PNG"
                  alt="Logo 1998"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Nav: Alineado a la izquierda con gap */}
          <div className="flex items-center justify-start w-full gap-12">
            <PremiumButton
              variant="primary"
              size="sm"
              className="bg-transparent hover:bg-transparent text-white border-none shadow-none p-0"
              onClick={(e) => handleNavClick(e, 'portafolio')}
            >
              Portafolio
            </PremiumButton>
            <PremiumButton
              variant="primary"
              size="sm"
              className="bg-transparent hover:bg-transparent text-white border-none shadow-none p-0"
              onClick={(e) => handleNavClick(e, 'planes')}
            >
              Planes
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
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center overflow-hidden">
              {/* Aquí cambiamos la M por tu imagen */}
              <img
                src="/images/IMG_4002.PNG"
                alt="Logo 1998"
                className="w-full h-full object-cover"
              />
            </div>

          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border/40 bg-card/25 text-foreground hover:bg-card/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
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
                {[
                  { name: "Blog", id: "blog" },
                  { name: "¿Cómo trabajamos?", id: "como-trabajamos" },
                  { name: "Planes", id: "planes" },
                  { name: "Portafolio", id: "portafolio" }
                ].map((link) => (
                  <li key={link.id}>
                    <PremiumButton
                      variant="primary"
                      size="sm"
                      className="w-full justify-center bg-transparent hover:bg-transparent text-white border-none shadow-none"
                      onClick={(e) => handleNavClick(e, link.id)}
                    >
                      {link.name}
                    </PremiumButton>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Full Screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-between py-16 px-6 bg-black/95 backdrop-blur-xl transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          id="close-menu-btn"
          className="absolute top-8 right-8 flex items-center justify-center w-12 h-12 text-white/70 hover:text-white transition-colors focus:outline-none"
          aria-label="Close menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Dummy div to align content properly with justify-between */}
        <div className="h-10" />

        {/* Navigation List */}
        <nav className="flex flex-col items-center gap-6 text-center w-full max-w-[280px]">
          {/* Glassmorphic card for "Servicios" */}
          <a
            href="#servicios"
            onClick={(e) => { handleNavClick(e, 'servicios'); setIsMenuOpen(false); }}
            className="text-lg text-white/80 hover:text-white font-medium transition-colors py-2 block active:scale-95"
          >
            Servicios
          </a>

          <a
            href="#como-trabajamos"
            onClick={(e) => { handleNavClick(e, 'como-trabajamos'); setIsMenuOpen(false); }}
            className="text-lg text-white/80 hover:text-white font-medium transition-colors py-2 block active:scale-95"
          >
            ¿Cómo trabajamos?
          </a>

          <a
            href="#portafolio"
            onClick={(e) => { handleNavClick(e, 'portafolio'); setIsMenuOpen(false); }}
            className="text-lg text-white/80 hover:text-white font-medium transition-colors py-2 block active:scale-95"
          >
            Portafolio
          </a>

          <a
            href="#planes"
            onClick={(e) => { handleNavClick(e, 'planes'); setIsMenuOpen(false); }}
            className="text-lg text-white/80 hover:text-white font-medium transition-colors py-2 block active:scale-95"
          >
            Planes
          </a>
        </nav>

        {/* Footer text */}
        <div className="text-xs text-white/40 tracking-wider font-mono">
          1998 - Development and Marketing
        </div>
      </div>
    </>
  );
};