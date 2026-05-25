# Migration Strategy: WordPress/Elementor a React Moderno

Nuestra meta es mapear el DOM anidado y tóxico de constructores visuales a primitivas semánticas y planas.

## Mapeo Conceptual

### 1. Elementor Sections & Containers
**Antes:** `.elementor-section > .elementor-container > .elementor-row > .elementor-column > .elementor-widget-wrap` (5 niveles de profundidad solo para centrar un elemento).

**Ahora:** `HeroSection` o una primitiva `section className="container mx-auto"`. Eliminación total de divs intermedios.

### 2. Animaciones On-Scroll (Animate.css)
**Antes:** Clases imperativas que agregan/quitan `.elementor-invisible` inyectando *Inline Styles*. Layout Shifts garantizados.

**Ahora:** Envolver el grupo en `MotionContainer` o componentes atómicos en `FadeIn`. Motion Values manejan esto delegando 100% a la GPU vía transform.

### 3. Glassmorphism & Effects
**Antes:** Divs absolutos duplicados (`.bg-overlay`) con filtros opacos.
**Ahora:** Propiedad nativa de Tailwind `backdrop-blur-md bg-card/60` (Clase utilitaria `.glass`).

## Flujo de Trabajo
Nunca intentes limpiar un componente migrándolo 1 a 1.
Construye el componente visualmente en el `DesignSystemPreview.jsx` usando primitivas, y luego inyecta la data que provenga del backend o del estado local.
