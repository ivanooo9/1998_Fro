import { useIntegrationConfig } from '../useIntegrationConfig';
import { HoverMotion } from '../../ui';

/**
 * LegacyCardAdapter
 * Tolerante a DOM impredecible. Evita el overflow:hidden en HoverMotion
 * para proteger menús absolutos o tooltips del componente original.
 */
export const LegacyCardAdapter = ({ children, className }) => {
  const { flags } = useIntegrationConfig();

  if (!flags.enableHoverEnhancements) {
    return <div className={className}>{children}</div>;
  }

  // Agrega una capa base de Premium UI (glass) pero sin forzar clip
  return (
    <HoverMotion scale={1.01} y={-3} className={className}>
      <div className="relative rounded-xl border border-border/50 bg-card/40 transition-colors hover:bg-card/60">
        {children}
      </div>
    </HoverMotion>
  );
};
