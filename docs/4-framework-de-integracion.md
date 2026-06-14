# 4. Framework de Integración y Compatibilidad

Este módulo describe las configuraciones, interruptores funcionales (*Feature Flags*) y los presupuestos de rendimiento estipulados para habilitar integraciones fluidas con código heredado o migraciones futuras sin degradación del navegador.

---

## 1. Modos de Migración y Compatibilidad Progresiva

El sistema de diseño define tres fases de migración estructuradas en `src/design-system/integration/migrationModes.js`:

*   **`MIGRATION_MODES.SOFT` (`'soft'`)**:
    *   *Comportamiento*: Minimiza las modificaciones sobre el DOM. Fuerza la desactivación de transiciones cinemáticas complejas y el escalamiento progresivo staggers.
    *   *Objetivo*: Asegurar compatibilidad absoluta en navegadores antiguos o sistemas de hardware limitado.
*   **`MIGRATION_MODES.HYBRID` (`'hybrid'`)**:
    *   *Comportamiento*: Habilita la interfaz Premium de manera selectiva. Mezcla componentes de visualización modernos con componentes heredados del sitio original. Activa animaciones y hovers de baja fricción física.
    *   *Objetivo*: Modo intermedio por defecto para un refinamiento progresivo.
*   **`MIGRATION_MODES.FULL` (`'full'`)**:
    *   *Comportamiento*: Reemplazo visual absoluto. Habilita staggers complejos, desenfoques masivos y transiciones cinemáticas pesadas.
    *   *Objetivo*: Consistencia completa del sistema de diseño moderno.

---

## 2. Catálogo de Feature Flags de Visualización

En `src/design-system/integration/featureFlags.js` se definen interruptores booleanos que controlan la inyección de estilos complejos:

*   **`enableMotion` (`true`)**: Controlador maestro de animaciones.
*   **`enablePremiumUI` (`true`)**: Habilita botones con efectos reflectantes y gradientes dinámicos.
*   **`enableGlassEffects` (`true`)**: Habilita desenfoques gaussianos e interpolación transparente en scroll.
*   **`enableHoverEnhancements` (`true`)**: Activa gradientes radiales superiores al posicionar el cursor sobre tarjetas.
*   **`enableStagger` (`true`)**: Controla la aparición en cascada secuencial.
*   **`enableCinematicTransitions` (`true`)**: Habilita transiciones de alta duración y curvas complejas.
*   **`enableExperimentalEffects` (`false`)**: Desactivado por defecto. Bloquea sombras pesadas y animaciones 3D inestables en navegadores de bajo rendimiento.

---

## 3. Presupuesto de Rendimiento Visual (Performance Budgets)

Definido en `src/design-system/integration/performanceBudgets.js` para mitigar el recalentamiento de GPU y asegurar tasas estables de 60 FPS:

```javascript
export const performanceBudgets = {
  maxStaggerItems: 15,              // Limita el renderizado secuencial de listas largas.
  maxSimultaneousAnimations: 20,    // Previene el disparo coordinado de demasiados nodos motion.
  maxBlurIntensity: 12,             // Límite de px para backdrop-filter (valores altos saturan el rasterizado).
  maxNestedMotionLayers: 2,         // Restringe anidaciones de contenedores animados dentro de sí mismos.
  maxScrollListeners: 3,            // Máximo de hooks de escucha vertical en ejecución.
  maxAnimatedCardsPerViewport: 8    // Límite de tarjetas con hover interactivo en pantalla.
};
```

---

## 4. Proveedor e Inyección de Configuración

La configuración se distribuye eficientemente mediante React Context utilizando el `IntegrationConfigProvider`. Si el modo de migración es configurado como `SOFT`, apaga automáticamente staggers y efectos cinemáticos de forma preventiva:

```javascript
const baseFlags = mode === MIGRATION_MODES.SOFT 
  ? { ...defaultFeatureFlags, enableCinematicTransitions: false, enableStagger: false }
  : defaultFeatureFlags;
```

El hook custom `useIntegrationConfig` expone un fallback seguro del lado del servidor si un componente se renderiza fuera del proveedor principal de la aplicación, devolviendo por defecto la configuración reducida `SOFT`.
