import { cn } from '../utils/cn';
import { HoverMotion } from './HoverMotion';

export const GlassCard = ({ 
  children, 
  className, 
  interactive = false,
  intensity = 'base', // 'base' | 'intense'
  as: Component = 'div'
}) => {
  const intensityClass = intensity === 'intense' ? 'glass-intense' : 'glass';

  const CardContent = (
    <Component className={cn(
      intensityClass,
      "rounded-2xl p-6 transition-colors duration-400 hover:bg-card/80", 
      className
    )}>
      {children}
    </Component>
  );

  if (interactive) {
    return (
      <HoverMotion>
        {CardContent}
      </HoverMotion>
    );
  }

  return CardContent;
};
