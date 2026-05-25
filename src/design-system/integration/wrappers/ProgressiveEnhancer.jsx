import { useIntegrationConfig } from '../useIntegrationConfig';
import { MIGRATION_MODES } from '../migrationModes';

/**
 * ProgressiveEnhancer
 * Renderiza el children legacy o la versión Premium basada en los
 * Feature Flags y el Migration Mode actual.
 */
export const ProgressiveEnhancer = ({ legacyComponent, premiumComponent }) => {
  const { mode, flags } = useIntegrationConfig();

  if (mode === MIGRATION_MODES.SOFT || !flags.enablePremiumUI) {
    return <>{legacyComponent}</>;
  }

  if (mode === MIGRATION_MODES.FULL) {
    return <>{premiumComponent}</>;
  }

  // HYBRID MODE: Por defecto retorna el premium si está disponible
  return premiumComponent ? <>{premiumComponent}</> : <>{legacyComponent}</>;
};
