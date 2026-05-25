# Conflict Detection & Mitigation

## 1. Z-Index Wars
**El Problema:** Aplicar `transform` (Framer Motion) a un elemento crea un nuevo "Stacking Context". Esto significa que cualquier z-index interno (ej: un Dropdown legacy de z-index 9999) quedará atrapado detrás de componentes vecinos.
**Mitigación:** En caso de que un menú `legacy` quede oculto, envuelve la tarjeta en `LegacyCardAdapter` y deshabilita `enableHoverEnhancements` vía el Feature Flag Provider de esa sección concreta.

## 2. Tailwind vs Legacy CSS (Colisiones)
**El Problema:** Las utilidades como `.glass` pueden chocar con IDs o clases de Elementor (`.elementor-container`).
**Mitigación:** Los Adapters (`MotionSafeWrapper`) siempre deben inyectarse envolviendo el componente legacy por FUERA, sin aplicar clases utilitarias hacia adentro.

## 3. Hydration Mismatches (SSR)
Si la app corre sobre Next.js/Remix, animaciones pesadas pueden causar errores de hidratación. El `IntegrationConfigProvider` maneja las configuraciones, pero ten cuidado con inicializar `MotionSafeWrapper` en elementos que difieren del servidor (como portales o fechas dinámicas).
