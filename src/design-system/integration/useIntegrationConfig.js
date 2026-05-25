import { useContext } from 'react';
import { IntegrationContext } from './IntegrationConfigProvider';
import { defaultFeatureFlags } from './featureFlags';
import { MIGRATION_MODES } from './migrationModes';
import { performanceBudgets } from './performanceBudgets';

/**
 * Hook para leer la configuración de integración.
 * Si se llama fuera de un Provider, devuelve un fallback seguro (SOFT Mode).
 */
export const useIntegrationConfig = () => {
  const context = useContext(IntegrationContext);
  
  if (!context) {
    return {
      mode: MIGRATION_MODES.SOFT,
      flags: defaultFeatureFlags,
      budgets: performanceBudgets
    };
  }
  
  return context;
};
