# Motion Guidelines

## Easings Centralizados
Nunca uses valores fijos como `ease: "ease-in-out"` en los componentes. Utiliza siempre el archivo `easingPresets.js`.

- **Cinematic**: `[0.22, 1, 0.36, 1]` -> Para revelar texto, staggers de Hero y transiciones de páginas.
- **Snappy**: `[0.175, 0.885, 0.32, 1.275]` -> Para microinteracciones como hover en botones o expansiones de modales.

## Accesibilidad (Reduced Motion)
Todos los componentes deben importar y respetar el hook `useReducedMotionGlobal()`.
- Nunca apagues el componente si `prefersReducedMotion` es `true`. Simplemente desactiva las traslaciones espaciales (`y`, `x`) y cambia la animación a un `Fade` instantáneo o desactiva el scale en el hover.

## Reutilización de Variantes
En lugar de crear un objeto `variants` en cada componente, debes importarlos de `motionVariants.js` e inyectarlos en tus wrappers.
