# Do's and Don'ts de Arquitectura UI

## Los DO's (Obligatorio)

- **SIEMPRE** usa la función utilitaria `cn()` al extender estilos en los componentes de la librería:
  ```jsx
  // ✅ DO:
  <PremiumButton className={cn("mt-4 md:mt-8", customClass)} />
  ```
- **SIEMPRE** extrae constantes de configuración de Motion al archivo `motionVariants.js`.
- **SIEMPRE** delega el espacio (márgenes) al componente *padre* en lugar de empaquetar un componente con un `mt-10` fijo, lo cual rompe su reusabilidad en otros layouts.

## Los DON'Ts (Prohibido Estrictamente)

- **NUNCA** animes propiedades de layout en Framer Motion (`width`, `height`, `left`, `top`, `margin`, `padding`). Generan *Layout Thrashing* masivo.
  ```jsx
  // ❌ DON'T:
  <motion.div animate={{ height: 200 }} />
  // ✅ DO:
  <motion.div animate={{ scaleY: 2 }} className="origin-top" />
  ```

- **NUNCA** ates el progreso de un scroll a un estado de React:
  ```jsx
  // ❌ DON'T (Causa miles de re-renders por segundo):
  window.addEventListener('scroll', () => setScroll(window.scrollY));
  
  // ✅ DO:
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  <motion.div style={{ opacity }} />
  ```

- **NUNCA** apagues condicionalmente un componente solo por `prefersReducedMotion`. Adapta su animación para que siga siendo premium pero sin viajar por la pantalla.
