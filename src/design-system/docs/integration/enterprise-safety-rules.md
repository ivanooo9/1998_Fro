# Enterprise Safety Rules (Los Mandamientos)

Estas reglas son absolutas. Romper una de ellas se considera una regresión grave de arquitectura.

1. **NEVER rewrite business hooks for visual reasons**: Si un componente usa `useEffect` para fetchear datos, NUNCA lo toques para inyectar Framer Motion. Envuelve el componente con `MotionSafeWrapper` desde fuera.
2. **NEVER refactor stores during UI migration**: La migración visual no es excusa para tocar Redux, Zustand o Contextos de negocio.
3. **NEVER introduce motion on critical workflows**: Los procesos de checkout, pagos o carga de datos financieros sensibles deben permanecer estáticos y rápidos (usando `MIGRATION_MODES.SOFT` en esa ruta específica).
4. **NEVER animate validation states aggressively**: Los errores de formularios o invalidaciones no deben temblar, botar ni hacer "wobble". Usa colores o cambios sutiles. El motion agresivo aquí empeora la UX.
5. **NEVER block interaction with overlays**: El `GlassCard` intenso o animaciones superpuestas nunca deben tener `pointer-events: all` si bloquean botones o inputs ocultos.
6. **NEVER couple motion with API state**: La finalización de una animación no debe usarse para lanzar llamadas HTTP de negocio (ej. `onAnimationComplete={() => fetchData()}`). Mantenlo desacoplado.
