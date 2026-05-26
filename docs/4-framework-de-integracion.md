# 4. Framework de Integración y Compatibilidad

Este documento detalla la arquitectura de integración progresiva construida en `src/design-system/integration/` para proteger la estabilidad de la aplicación y garantizar una migración fluida libre de regresiones visuales o de interacción.

---

## 1. Modos de Migración (`migrationModes.js`)

Para permitir un despliegue por fases, el sistema define tres niveles de control en [migrationModes.js](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/design-system/integration/migrationModes.js):

1.  **`SOFT` ('soft')**: Desactiva las animaciones complejas o pesadas y revierte a animaciones básicas o nulas (Reduced Motion adaptado). Mantiene la estructura del DOM legacy intacta. Ideal para procesos y vistas críticas de conversión (e.g. workflows financieros, formularios densos).
2.  **`HYBRID` ('hybrid')**: Combina componentes visuales legados con las nuevas primitivas de animación del Design System de manera balanceada. Aplica mejoras de interactividad progresivamente. Es el modo por defecto de la aplicación.
3.  **`FULL` ('full')**: Reemplazo total de la UI legacy. El Design System controla por completo el DOM, aplicando la física de scroll e interacciones cinematográficas máximas.

---

## 2. Feature Flags y Configuración de Integración

### Contexto y Hook de Configuración
La configuración de integración se centraliza en un contexto de React montado por el `IntegrationConfigProvider`. 
*   **Optimizaciones de Rendimiento**: El contexto se memoiza en [IntegrationConfigProvider.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/design-system/integration/IntegrationConfigProvider.jsx) mediante `useMemo` para evitar re-renders innecesarios en la app, dado que los parámetros del tema o de migración raramente cambian en caliente durante la navegación:
    ```javascript
    const mergedConfig = useMemo(() => {
      const baseFlags = mode === MIGRATION_MODES.SOFT 
        ? { ...defaultFeatureFlags, enableCinematicTransitions: false, enableStagger: false }
        : defaultFeatureFlags;
      return {
        mode,
        flags: { ...baseFlags, ...featureFlags },
        budgets: performanceBudgets
      };
    }, [mode, featureFlags]);
    ```
*   **Hook Seguro (`useIntegrationConfig.js`)**: Los componentes leen las flags mediante `useIntegrationConfig()`. Si se ejecuta fuera del provider, el hook retorna por seguridad el fallback del modo `SOFT`, protegiendo la renderización.

### Feature Flags Disponibles (`featureFlags.js`)
*   `enableMotion`: Activa/Desactiva el motor de Framer Motion en la app.
*   `enablePremiumUI`: Habilita estilos modernos como glassmorphism.
*   `enableGlassEffects`: Activa filtros de desenfoque (`backdrop-filter`).
*   `enableHoverEnhancements`: Permite microinteracciones de escalado y desplazamiento vertical.
*   `enableStagger`: Permite revelados secuenciales en contenedores de listas.
*   `enableCinematicTransitions`: Habilita animaciones fluidas extendidas en secciones completas.
*   `enableExperimentalEffects` (Default: `false`): Reservado para pruebas controladas de QA.

---

## 3. Presupuestos de Rendimiento (`performanceBudgets.js`)

El archivo [performanceBudgets.js](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/design-system/integration/performanceBudgets.js) establece límites técnicos (Hard Limits) para prevenir sobrecargar el hilo de ejecución principal (*Main Thread*) del navegador:

*   **`maxStaggerItems: 15`**: Límite máximo de nodos hijos en `<MotionContainer />` para prevenir bloqueos por cálculo en cascada de layouts.
*   **`maxSimultaneousAnimations: 20`**: Límite de ejecuciones de entrada concurrentes en el mismo viewport.
*   **`maxBlurIntensity: 12px`**: Intensidad de desenfoque de fondo máxima para evitar el lag de renderizado en pantallas de alta densidad de pixeles (Retina/4K).
*   **`maxNestedMotionLayers: 2`**: Límite de anidamiento de componentes de motion (e.g. un `<FadeIn />` dentro de otro `<FadeIn />`) para evitar el recálculo masivo de posiciones.
*   **`maxScrollListeners: 3`**: Cantidad máxima de escuchas activos en eventos de scroll.

---

## 4. Adaptadores de Seguridad (Directorio `wrappers/`)

Estos adaptadores envuelven secciones o tarjetas específicas para asegurar la interoperabilidad entre código moderno y legacy.

### A. `<MotionSafeWrapper />`
Ubicación del archivo: [MotionSafeWrapper.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/design-system/integration/wrappers/MotionSafeWrapper.jsx)
Wrapper de seguridad que envuelve a componentes de negocio complejos para inyectarles una animación de entrada de forma no invasiva.
*   **Cero Interferencia con Handlers**: A diferencia de otras integraciones, no altera las referencias del DOM interno ni intercepta llamadas (`onClick`, `onChange`), garantizando el flujo operativo del componente envuelto.
*   **SafeErrorBoundary Integrado**: En caso de que Framer Motion o el renderizado experimente un error en tiempo de ejecución, el ErrorBoundary silenciosamente captura la excepción y hace un fallback para pintar el componente legacy crudo sin romper la aplicación completa:
    ```javascript
    class SafeErrorBoundary extends React.Component {
      state = { hasError: false };
      static getDerivedStateFromError() { return { hasError: true }; }
      render() {
        if (this.state.hasError) return <>{this.props.children}</>;
        return this.props.children;
      }
    }
    ```

### B. `<LegacyCardAdapter />`
Ubicación del archivo: [LegacyCardAdapter.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/design-system/integration/wrappers/LegacyCardAdapter.jsx)
Diseñado para tarjetas visuales del portafolio o de listados antiguos cuyo DOM interno es impredecible.
*   **Prevención de Recortes de Layout**: A diferencia de las primitivas de diseño puro que configuran `overflow: hidden` para ocultar capas de brillo, `<LegacyCardAdapter />` mantiene un desbordamiento visible. Esto protege componentes absolutos en la tarjeta original (tales como menús desplegables, tooltips o globos flotantes de información) para que no se corten al animarse.
*   **Escala Segura**: Configura una escala de hover ultra-sutil (`scale={1.01}` y `y={-3}`) para no desestabilizar la alineación de componentes hermanos.

### C. `<ProgressiveEnhancer />`
Ubicación del archivo: [ProgressiveEnhancer.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/design-system/integration/wrappers/ProgressiveEnhancer.jsx)
Selector condicional de renderizado que conmuta entre dos versiones de un mismo componente de forma dinámica en base al estado de la aplicación.
*   **Lógica de Selección**:
    *   Si el modo es `SOFT` o `enablePremiumUI` es `false`, devuelve estrictamente el componente legacy.
    *   Si el modo es `FULL`, devuelve estrictamente el componente premium.
    *   Si el modo es `HYBRID`, evalúa y da prioridad al componente premium; si este no se ha construido, realiza fallback al legacy automáticamente.
