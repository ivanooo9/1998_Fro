import { cn, GlassCard, useIntegrationConfig } from '../../design-system';

export const MarketingCard = ({ 
  icon, 
  title, 
  description, 
  className,
  glow = false
}) => {
  const { flags } = useIntegrationConfig();

  return (
    <GlassCard 
      interactive={flags.enableHoverEnhancements} 
      className={cn(
        "relative flex flex-col items-start text-left h-full group",
        glow && "border-primary/30 shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]",
        className
      )}
    >
      {/* Subtle top gradient glow on hover */}
      {flags.enableHoverEnhancements && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
      )}
      
      <div className="mb-6 p-3 rounded-xl bg-card border border-border/50 text-foreground flex items-center justify-center">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight">
        {title}
      </h3>
      
      <p className="text-foreground/70 leading-relaxed text-sm">
        {description}
      </p>
    </GlassCard>
  );
};
