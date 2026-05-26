# 6. QA y Normas de Seguridad (Enterprise Safety Rules)

Este documento detalla las directrices obligatorias de programación, la prevención de conflictos visuales y la metodología de pruebas de QA para garantizar la integridad visual del sitio web y evitar regresiones.

---

## 1. Reglas de Oro de Desarrollo (Do's and Don'ts)

### Los DO's (Obligatorio)
*   **Uso de la función `cn()`**: Siempre concatene las clases personalizadas pasadas por props utilizando la utilidad `cn(...)` en lugar de concatenaciones de strings manuales. Esto previene colisiones con la precedencia de selectores en Tailwind:
    ```jsx
    // ✅ CORRECTO:
    <PremiumButton className={cn("mt-4 md:mt-8", customClass)} />
    ```
*   **Declaración de variantes**: Todas las animaciones o físicas de Framer Motion deben residir en [motionVariants.js](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/design-system/motion/motionVariants.js) como funciones reutilizables.
*   **Delegación de márgenes**: Siempre deje los márgenes espaciales (`mt-10`, `mx-auto`, etc.) al componente *padre* que los renderiza. Empaquetar un componente de diseño con un margen fijo destruye su reusabilidad en otros layouts.

### Los DON'Ts (Prohibido Estrictamente)
*   **No animar propiedades de layout**: NUNCA configure transiciones sobre propiedades espaciales como `width`, `height`, `left`, `top`, `margin` o `padding` en Framer Motion. Esto provoca **Layout Thrashing** masivo, obligando al navegador a recalcular el árbol de renderizado completo 60 veces por segundo. Utilice transformadas aceleradas por GPU (`scale`, `scaleY`, `x`, `y`):
    ```jsx
    // ❌ INCORRECTO:
    <motion.div animate={{ height: 200 }} />
    
    // ✅ CORRECTO:
    <motion.div animate={{ scaleY: 2 }} className="origin-top" />
    ```
*   **No enlazar eventos de scroll al estado de React**: Nunca ejecute llamadas de actualización de estado (`setState`) directamente dentro de un event listener de scroll del navegador, puesto que esto causa miles de re-renders por segundo y congela la interfaz. Utilice el hook `useScroll` y asocie las transformaciones a variables de movimiento (`useTransform`):
    ```jsx
    // ❌ INCORRECTO:
    window.addEventListener('scroll', () => setScroll(window.scrollY));
    
    // ✅ CORRECTO:
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 100], [0, 1]);
    <motion.div style={{ opacity }} />
    ```
*   **No desactivar componentes por Reduced Motion**: Si el usuario prefiere movimiento reducido en el sistema operativo, nunca oculte el componente por completo. Adapte la animación para que sea un desvanecimiento instantáneo (`opacity` del 0 al 1 sin traslación) para mantener la funcionalidad y accesibilidad visual intacta.

---

## 2. Normas de Seguridad (Enterprise Safety Rules)

Estas reglas son absolutas y su incumplimiento es considerado una regresión de arquitectura grave:

1.  **NEVER rewrite business hooks for visual reasons**: Si un componente legacy implementa hooks de efecto (`useEffect`) para conectarse con APIs o bases de datos, no altere su código interno para inyectar Framer Motion. Envuélvalo desde afuera utilizando `<MotionSafeWrapper />`.
2.  **NEVER refactor stores during UI migration**: La migración visual es totalmente agnóstica del estado global del negocio. No se deben alterar contextos de negocio, stores de Redux o Zustand.
3.  **NEVER introduce motion on critical workflows**: Rutas de pagos, flujos de autenticación o formularios financieros sensibles deben permanecer estáticos y rápidos, forzando la directiva `MIGRATION_MODES.SOFT` en sus contenedores.
4.  **NEVER animate validation states aggressively**: Los globos o mensajes de error en validaciones no deben temblar (efecto *wobble*) de forma agresiva. Utilice cambios sutiles de opacidad o color.
5.  **NEVER block interaction with overlays**: Capas de brillo decorativas absolutas u overlays translúcidos nunca deben interceptar eventos del puntero. Deben incluir obligatoriamente la clase `pointer-events-none` de Tailwind.
6.  **NEVER couple motion with API state**: No lance peticiones HTTP ni altere flujos de negocio a la finalización de una animación (e.g. evitando llamadas asíncronas en el hook `onAnimationComplete`).

---

## 3. Detección y Mitigación de Conflictos

### A. Conflictos de Contexto de Apilamiento (Z-Index)
Al animar un componente con Framer Motion, la propiedad `transform` se activa, forzando al navegador a crear un nuevo *Stacking Context* (Contexto de Apilamiento). Esto provoca que cualquier elemento absolute legacy (tales como dropdowns o menús antiguos) quede posicionado por detrás de las tarjetas o secciones vecinas a pesar de tener un valor `z-index` elevado.
*   **Mitigación**: Envuelva el elemento problemático en un `<LegacyCardAdapter />` y desactive temporalmente las optimizaciones de interacción en las flags.

### B. Colisiones de Estilos de Terceros (Tailwind vs Legacy)
Al migrar secciones complejas estructuradas en constructores antiguos como WordPress Elementor, las utilidades globales como `.glass` pueden interferir con el CSS personalizado de Elementor.
*   **Mitigación**: Inyecte el wrapper `<MotionSafeWrapper />` por fuera del contenedor de clases legacy, manteniendo las hojas de estilo y clases aisladas y sin aplicar utilidades de Tailwind hacia adentro del DOM legacy.

---

## 4. Estrategia de Pruebas de QA

El equipo de aseguramiento de calidad (QA) debe verificar los siguientes puntos en cada entrega de integración:

*   **Pruebas de Regresión Visual**: Confirmar que no hay parpadeos de contenido (*Layout Shifts*) al cargar el sitio. El indicador CLS en Lighthouse debe permanecer en `0`.
*   **Pruebas de Estrés en Interacciones**: Realizar clics frenéticos en botones envueltos por `LegacyCardAdapter` o `MotionSafeWrapper` confirmando que los eventos de envío de datos (`onSubmit` u `onClick`) siguen capturándose de forma íntegra.
*   **Validación de Rollback (Plan de Emergencia)**: El QA debe cambiar la configuración del proveedor global a `<IntegrationConfigProvider mode="soft">`. La aplicación completa debe revertirse a su estado visual básico estable de forma predecible sin provocar errores en consola ni pantallas negras.
*   **Accesibilidad de Teclado**: Tabular a través de toda la landing page utilizando la tecla `Tab`. Los elementos interactivos deben pintar visiblemente el borde de foco (`focus-visible`) sin que este sea recortado por propiedades `overflow: hidden`.
