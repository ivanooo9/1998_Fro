import { createContext, useMemo } from 'react';
import { defaultFeatureFlags } from './featureFlags';
import { MIGRATION_MODES } from './migrationModes';
import { performanceBudgets } from './performanceBudgets';

export const IntegrationContext = createContext(null);

/**
 * IntegrationConfigProvider
 * Memoizado y ultra-ligero. No provoca re-renders masivos porque la config
 * rara vez cambia en runtime. Protege la app legacy de motion invasivo.
 */
export const IntegrationConfigProvider = ({ 
  children, 
  mode = MIGRATION_MODES.SOFT,
  featureFlags = {}
}) => {
  const mergedConfig = useMemo(() => {
    // Si el modo es SOFT, apagamos el motion invasivo automáticamente
    const baseFlags = mode === MIGRATION_MODES.SOFT 
      ? { ...defaultFeatureFlags, enableCinematicTransitions: false, enableStagger: false }
      : defaultFeatureFlags;

    return {
      mode,
      flags: { ...baseFlags, ...featureFlags },
      budgets: performanceBudgets
    };
  }, [mode, featureFlags]);

  return (
    <IntegrationContext.Provider value={mergedConfig}>
      {children}
    </IntegrationContext.Provider>
  );
};
