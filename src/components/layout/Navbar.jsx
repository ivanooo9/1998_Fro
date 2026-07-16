import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn, useIntegrationConfig } from '@/design-system';

export const Navbar = ({ isLoading }) => {
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

  // Captura de foco accesible (Focus Trap) para el menú móvil de pantalla completa
  useEffect(() => {
    if (!isMenuOpen) return;

    const menuEl = document.getElementById('mobile-fullscreen-menu');
    const toggleBtn = document.getElementById('mobile-menu-toggle-btn');
    if (!menuEl || !toggleBtn) return;

    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const menuFocusables = Array.from(menuEl.querySelectorAll(focusableSelector));
    const focusableElements = [toggleBtn, ...menuFocusables];

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Colocar el foco inicial en el primer elemento
    setTimeout(() => {
      firstElement.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  // Interpolación de background: transparente -> oscuro con glass
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.85)']
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
    } else {
      console.warn(`Target section #${targetId} not found in the DOM.`);
    }
    setIsMenuOpen(false); // Cierra el menú móvil de pantalla completa
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-[110] flex items-center justify-between p-5 md:py-6 md:px-12 transition-colors",
        )}
        style={{
          backgroundColor: flags.enableGlassEffects ? backgroundColor : 'rgba(0, 0, 0, 0.95)',
          backdropFilter: flags.enableGlassEffects ? backdropBlur : 'none',
          borderBottom
        }}
        initial={{ y: -100 }}
        animate={isLoading ? { y: -100 } : { y: 0 }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
      >
        {/* Desktop Panoramic Layout */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] w-full items-center gap-8 lg:gap-20">

          {/* Left Nav: Alineado a la derecha con gap */}
          <div className="flex items-center justify-end w-full gap-12">
            <motion.a
              href="#como-trabajamos"
              onClick={(e) => handleNavClick(e, 'como-trabajamos')}
              className="relative overflow-hidden rounded-full font-medium text-sm text-white bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2 px-2 py-1">
                ¿Cómo trabajamos?
              </span>
              <motion.div
                className="absolute inset-0 z-0 bg-white/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>
            <motion.a
              href="#servicios"
              onClick={(e) => handleNavClick(e, 'servicios')}
              className="relative overflow-hidden rounded-full font-medium text-sm text-white bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2 px-2 py-1">
                Servicios
              </span>
              <motion.div
                className="absolute inset-0 z-0 bg-white/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center px-4">
            <a
              href="#inicio"
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
            </a>
          </div>

          {/* Right Nav: Alineado a la izquierda con gap */}
          <div className="flex items-center justify-start w-full gap-12">
            <motion.a
              href="#portafolio"
              onClick={(e) => handleNavClick(e, 'portafolio')}
              className="relative overflow-hidden rounded-full font-medium text-sm text-white bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2 px-2 py-1">
                Portafolio
              </span>
              <motion.div
                className="absolute inset-0 z-0 bg-white/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>
            <motion.a
              href="#planes"
              onClick={(e) => handleNavClick(e, 'planes')}
              className="relative overflow-hidden rounded-full font-medium text-sm text-white bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2 px-2 py-1">
                Planes
              </span>
              <motion.div
                className="absolute inset-0 z-0 bg-white/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden w-full items-center justify-between">
          {/* Mobile Logo */}
          <a
            href="#inicio"
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
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            id="mobile-menu-toggle-btn"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border/40 bg-card/25 text-foreground hover:bg-card/50 transition-colors focus:outline-none z-[110]"
            aria-label={isMenuOpen ? "Close menu" : "Toggle menu"}
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-5 h-4">
              <motion.span
                className="absolute left-0 w-full h-[2px] bg-current rounded-full"
                style={{ top: "50%", marginTop: "-1px", transformOrigin: "center" }}
                animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.span
                className="absolute left-0 w-full h-[2px] bg-current rounded-full"
                style={{ top: "50%", marginTop: "-1px", transformOrigin: "center" }}
                animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Full Screen Mobile Menu */}
      <div
        id="mobile-fullscreen-menu"
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-between p-8 bg-black/95 backdrop-blur-xl transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Close Button is handled by the animated toggle button in the header */}

        {/* Top Spacer to balance footer text height and keep the central navigation list perfectly centered */}
        <div className="h-6" />

        {/* Navigation List */}
        <nav className="flex flex-col items-center gap-8 text-center w-full max-w-[280px]">
          <a
            href="#como-trabajamos"
            onClick={(e) => handleNavClick(e, 'como-trabajamos')}
            className="text-lg text-white/80 hover:text-white font-medium transition-colors py-2 block active:scale-95 rounded focus:outline-none focus:ring-2 focus:ring-primary px-4"
          >
            ¿Cómo trabajamos?
          </a>

          <a
            href="#servicios"
            onClick={(e) => handleNavClick(e, 'servicios')}
            className="text-lg text-white/80 hover:text-white font-medium transition-colors py-2 block active:scale-95 rounded focus:outline-none focus:ring-2 focus:ring-primary px-4"
          >
            Servicios
          </a>

          <a
            href="#portafolio"
            onClick={(e) => handleNavClick(e, 'portafolio')}
            className="text-lg text-white/80 hover:text-white font-medium transition-colors py-2 block active:scale-95 rounded focus:outline-none focus:ring-2 focus:ring-primary px-4"
          >
            Portafolio
          </a>

          <a
            href="#planes"
            onClick={(e) => handleNavClick(e, 'planes')}
            className="text-lg text-white/80 hover:text-white font-medium transition-colors py-2 block active:scale-95 rounded focus:outline-none focus:ring-2 focus:ring-primary px-4"
          >
            Planes
          </a>
        </nav>

        {/* Footer text */}
        <div className="text-xs text-white/40 tracking-wider font-mono h-6 flex items-center justify-center">
        </div>
      </div>
    </>
  );
};