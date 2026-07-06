import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { easings } from '../motion/easingPresets';
import { useReducedMotionGlobal } from '../motion/useReducedMotionGlobal';

export const PremiumButton = ({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary', // 'primary' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  className,
  disabled = false,
  href,
  ...props
}) => {
  const { prefersReduced } = useReducedMotionGlobal();

  const baseStyles = "relative overflow-hidden rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-border bg-transparent text-foreground hover:bg-card/50",
    ghost: "bg-transparent text-foreground hover:bg-card/30"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const buttonProps = {
    className: cn(baseStyles, variants[variant], sizes[size], className),
    whileHover: prefersReduced || disabled ? {} : { scale: 1.02 },
    whileTap: prefersReduced || disabled ? {} : { scale: 0.98 },
    transition: { duration: 0.3, ease: easings.cinematic },
    ...props
  };

  const innerContent = (
    <>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {variant === 'primary' && !disabled && !prefersReduced && (
        <motion.div 
          className="absolute inset-0 z-0 bg-white/20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        {...buttonProps}
      >
        {innerContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...buttonProps}
    >
      {innerContent}
    </motion.button>
  );
};
