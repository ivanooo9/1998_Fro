import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotionGlobal } from '../motion/useReducedMotionGlobal';
import { cn } from '../utils/cn';

export const StickyHeader = ({ 
  logo, 
  navItems = [], 
  actionButton,
  className 
}) => {
  const { scrollY } = useScroll();
  const { prefersReduced } = useReducedMotionGlobal();

  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.8)']
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(12px)']
  );

  const borderBottom = useTransform(
    scrollY,
    [0, 50],
    ['1px solid rgba(255, 255, 255, 0)', '1px solid rgba(255, 255, 255, 0.05)']
  );

  return (
    <motion.header
      className={cn("fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-6 transition-colors md:px-12", className)}
      style={{
        backgroundColor: prefersReduced ? 'rgba(10, 10, 10, 0.9)' : backgroundColor,
        backdropFilter: prefersReduced ? 'none' : backdropBlur,
        borderBottom: prefersReduced ? '1px solid rgba(255, 255, 255, 0.05)' : borderBottom,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex-shrink-0">
        {logo}
      </div>

      <nav aria-label="Navegación principal" className="hidden md:block">
        <ul className="flex items-center gap-8">
          {navItems.map((item, index) => (
            <li key={index}>
              <a 
                href={item.href}
                className="text-sm font-medium text-foreground/80 transition-colors duration-300 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex-shrink-0 flex items-center gap-4">
        {actionButton}
      </div>
    </motion.header>
  );
};
