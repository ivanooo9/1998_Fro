# Performance Guards (Hard Limits)

El archivo `performanceBudgets.js` impone estos límites para proteger aplicaciones legacy que pueden no estar optimizadas.

1. **Max Stagger Items (Límite: 15)**: Nunca pases listas de más de 15 hijos al `MotionContainer`. El Main Thread se saturará calculando los *delays*. Usa paginación o virtualización para listas largas.
2. **Max Animaciones Simultáneas (Límite: 20)**: En vistas muy densas, desactiva animaciones de entrada en componentes secundarios (`delay={0}`, `duration={0}`).
3. **Scroll Listeners**: Está estrictamente prohibido usar `window.addEventListener('scroll')` en componentes de negocio. Utiliza siempre `useScroll()` de Framer Motion.
4. **Layout Thrashing**: Animar propiedades espaciales como `padding`, `margin` o `width` desatará recalculos de paint continuos. Prohibido.
