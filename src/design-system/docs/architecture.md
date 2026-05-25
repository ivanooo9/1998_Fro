# Design System Architecture

Este directorio contiene la infraestructura visual y de motion (animaciones) del proyecto, aislada completamente de la lógica de negocio.

## Principios
1. **Zero Regressions**: Ningún componente aquí adentro puede consumir lógica externa (hooks de negocio, APIs, stores). Todo se inyecta vía `props` o `children`.
2. **GPU Accelerated**: Todas las animaciones delegan en `transform` y `opacity`. Queda estrictamente prohibido animar layout properties (`width`, `height`, `margin`).
3. **Escalabilidad**: Todos los componentes usan `cn()` (clsx + tailwind-merge) para permitir override de estilos vía Tailwind de forma predecible.

## Estructura de Carpetas
- `/ui`: Primitivas reusables (Botones, Cards).
- `/motion`: Core de animaciones (Easings, Variants, ReducedMotion).
- `/layout`: Estructuras globales (Header, Footer).
- `/sections`: Bloques de página completos agnósticos de data.
- `/tokens`: Variables CSS globales (Theme).
- `/utils`: Funciones auxiliares de UI pura.
