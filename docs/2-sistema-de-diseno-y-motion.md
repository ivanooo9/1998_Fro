# 2. Sistema de Diseño (Design System) y Motor de Motion

Este documento describe la especificación del sistema de diseño visual (UI) y las directrices del motor de animaciones (Motion) implementados de forma desacoplada en el directorio `src/design-system/`.

---

## 1. Tokens de Estilo y Tema (`theme.css`)

El tema del proyecto está construido bajo una estética oscura premium (*Premium Dark UI*). Los valores cromáticos se manejan como variables CSS nativas en HSL para permitir la inyección y manipulación dinámica de opacidades con Tailwind CSS:

*   **Fondo (`--background` - HSL `0 0% 4%` / `#0a0a0a`)**: Negro profundo mate que reduce la fatiga visual.
*   **Texto (`--foreground` - HSL `0 0% 98%`)**: Blanco roto con alta luminosidad para contrastar de manera limpia sobre superficies oscuras.
*   **Superficies (`--card` - HSL `0 0% 7%` / `#121212`)**: Superficies secundarias elevadas para tarjetas y modales.
*   **Bordes (`--border` - HSL `0 0% 12%` / `#1f1f1f`)**: Delimitadores sutiles de baja luminosidad (12%) que se mezclan perfectamente con el fondo.
*   **Color Acento/Primario (`--primary` - HSL `0 0% 98%`)**: Blanco de alto contraste utilizado para llamados a la acción principales.

### Variables de Tema Claro (`html.light`)
Para dar soporte al modo claro con una estética limpia y premium, el sistema redefine las variables cuando se aplica la clase `.light` en el HTML:
*   `--background`: `204 100% 99%` (Fondo blanco-celeste corporativo `#fafdff`).
*   `--foreground`: `0 0% 4%` (Texto oscuro `#0a0a0a` de alto contraste).
*   `--card`: `204 33% 97%` (Superficie de tarjeta `#f2f6f9` suave).
*   `--card-foreground`: `0 0% 4%` (Texto de tarjetas oscuro).
*   `--border`: `204 10% 90%` (Gris claro `#e3e7eb` sutil).
*   `--primary`: `0 0% 4%` (Inversión del primario a negro).
*   `--primary-foreground`: `0 0% 98%` (Texto claro sobre primario oscuro).

### Clases Utilitarias Centralizadas (Tailwind `@layer utilities`)
Ubicadas en [theme.css](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/design-system/tokens/theme.css):
*   **`.glass`**: Aplica un fondo semi-translúcido (`bg-card/60`), un desenfoque de fondo acelerado por hardware (`backdrop-blur-md`) y un borde sutil.
*   **`.glass-intense`**: Posee mayor opacidad en el fondo (`bg-background/80`) y desenfoque profundo (`backdrop-blur-xl`), ideal para el Navbar flotante al hacer scroll.
*   **`.reveal-wrapper`**: Bloque con `overflow-hidden` necesario para animaciones de tipo slide (reveal de texto).

---

## 2. Primitivas Visuales (Directorio `ui/`)

Todas las primitivas soportan extensiones de estilos seguras mediante la utilidad `cn()` (que une `clsx` y `tailwind-merge` para evitar colisiones de clases en tiempo de compilación).

### A. `<FadeIn />`
Ubicación del archivo: [FadeIn.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/design-system/ui/FadeIn.jsx)
Aplica un desvanecimiento suave de opacidad y desplazamiento al entrar en el viewport.
*   **Props**:
    *   `children`: Nodo React.
    *   `className`: Clases personalizadas adicionales.
    *   `delay` (default: `0`): Retraso en segundos.
    *   `duration` (default: `durations.base`): Duración en segundos.
    *   `direction` (default: `'up'`): `'up' | 'down' | 'left' | 'right'`.
    *   `as` (default: `'div'`): Elemento semántico del DOM a renderizar.

### B. `<GlassCard />`
Ubicación del archivo: [GlassCard.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/design-system/ui/GlassCard.jsx)
Contenedor con efecto de vidrio esmerilado que soporta interacciones de escala.
*   **Props**:
    *   `interactive` (default: `false`): Si es `true`, envuelve la tarjeta en `<HoverMotion />`.
    *   `intensity` (default: `'base'`): `'base' | 'intense'`.
    *   `as` (default: `'div'`): Elemento semántico HTML.

### C. `<HoverMotion />`
Ubicación del archivo: [HoverMotion.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/design-system/ui/HoverMotion.jsx)
Wrapper que intercepta eventos del cursor para aplicar un efecto físico de flotado y escala.
*   **Props**:
    *   `scale` (default: `1.02`): Multiplicador de tamaño en el hover.
    *   `y` (default: `-5`): Traslación vertical en px.

### D. `<MotionContainer />`
Ubicación del archivo: [MotionContainer.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/design-system/ui/MotionContainer.jsx)
Wrapper contenedor encargado de orquestar y escalonar (stagger) la aparición de sus elementos hijos de forma automática.
*   **Props**:
    *   `staggerChildren` (default: `0.1`): Tiempo de retraso entre la aparición de cada hijo.
    *   `delayChildren` (default: `0`): Retraso inicial del contenedor.
    *   `as` (default: `'div'`): Elemento semántico HTML.

### E. `<PremiumButton />`
Ubicación del archivo: [PremiumButton.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/design-system/ui/PremiumButton.jsx)
Botón animado táctil con hover interactivo y capa de brillo dinámica. Cumple con los estándares WCAG de contraste y navegación.
*   **Props**:
    *   `onClick`: Callback de click.
    *   `type` (default: `'button'`): Tipo de botón HTML nativo.
    *   `variant` (default: `'primary'`): `'primary' | 'outline' | 'ghost'`.
    *   `size` (default: `'md'`): `'sm' | 'md' | 'lg'`.
    *   `disabled` (default: `false`): Estado inactivo (anula animaciones).

### F. `<RevealText />`
Ubicación del archivo: [RevealText.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/design-system/ui/RevealText.jsx)
Efecto cinematográfico en el cual el texto asciende desde una máscara invisible.
*   **Props**:
    *   `text` (requerido): El string de texto a mostrar.
    *   `delay` (default: `0`): Retraso de la animación.
    *   `duration`: Duración personalizada.
    *   `as` (default: `'span'`): Elemento semántico contenedor del bloque.

### G. `<ThemeToggle />`
Ubicación del archivo: [ThemeToggle.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/components/layout/ThemeToggle.jsx)
Botón interactivo de cambio de tema. Sus dimensiones físicas están totalmente fijadas (`w-10 h-10`), previniendo Layout Shifts durante su renderizado o animación.
*   **Animación Física**: Utiliza un SVG interno animado con Framer Motion y `AnimatePresence` en modo `wait`, rotando y desplazando verticalmente los iconos FiSun y FiMoon al alternar de tema.

---

## 3. Especificación de Físicas y Motion (Directorio `motion/`)

Para evitar la incoherencia visual, está prohibido hardcodear easings locales o interpolaciones ad-hoc en los componentes del proyecto.

### Curvas de Bézier Centralizadas (`easingPresets.js`)
Ubicado en [easingPresets.js](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/design-system/motion/easingPresets.js):
*   **`cinematic` (`[0.22, 1, 0.36, 1]`)**: Curva suave y elegante. Ideal para transiciones de layout, reveals tipográficos y menús flotantes.
*   **`snappy` (`[0.175, 0.885, 0.32, 1.275]`)**: Curva elástica de rebote. Diseñada para microinteracciones táctiles rápidas (hovers en botones y tarjetas).
*   **`linearSmooth` (`[0.25, 0.1, 0.25, 1]`)**: Desplazamiento lineal suavizado en los extremos, utilizado en marquees y scrolls infinitos.

### Duraciones Predefinidas
*   `fast`: `0.3s`
*   `base`: `0.5s`
*   `slow`: `0.8s`
*   `cinematic`: `1.2s`

### Catálogo de Variantes de Framer Motion (`motionVariants.js`)
El archivo [motionVariants.js](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/design-system/motion/motionVariants.js) exporta funciones constructoras de variantes para unificar el comportamiento físico de los elementos:
1.  `staggerContainer(staggerDelay, delayChildren)`: Propaga la animación en cascada a los hijos.
2.  `fadeUp(yOffset, duration, delay)`: Desvanecimiento con ascenso.
3.  `revealText(duration, delay)`: Traslación en el eje Y del 100% al 0% con máscara de recorte.
4.  `scaleIn(duration)`: Escala sutil del 95% al 100% junto con desvanecimiento de opacidad.

---

## 4. Accesibilidad y Reduced Motion (`useReducedMotionGlobal.js`)

Para asegurar el cumplimiento de las normativas de accesibilidad gubernamentales y de salud visual (evitando mareos o fatiga visual), el sistema de diseño implementa el hook centralizado [useReducedMotionGlobal.js](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/design-system/motion/useReducedMotionGlobal.js).

### Lógica de Adaptación
El hook lee la preferencia del sistema operativo del usuario (`prefers-reduced-motion` a través de Framer Motion) y devuelve configuraciones seguras de fallback:
*   **Anulación de Traslaciones**: Cambia `safeY` y `safeX` a `0`. Los elementos con animación `fadeUp` ya no viajan espacialmente por la pantalla; en su lugar, se desvanecen limpiamente en su posición original.
*   **Anulación de Staggers**: Anula los retardos secuenciales (`safeStagger = 0`) para pintar los elementos de lista al mismo tiempo, evitando parpadeos de animación.
*   **Compresión de Tiempos**: Si el usuario prefiere poco movimiento, la duración se comprime a un valor casi instantáneo (`safeDuration = 0.01`), eliminando cualquier retraso.
*   **Desactivación de Hovers**: En el componente `<HoverMotion />`, el hover interactivo se cancela por completo si se detecta Reduced Motion, manteniendo el botón o tarjeta estático.
