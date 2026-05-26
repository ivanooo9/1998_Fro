# 3. Componentes de Producción de la Landing Page

Este documento analiza en detalle el funcionamiento técnico y la lógica visual de los componentes ubicados en `src/components/` y la página `src/pages/Home.jsx`.

---

## 1. Estructura de la Página (`src/pages/Home.jsx`)

El archivo [Home.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/pages/Home.jsx) es el orquestador principal de la landing page. Renderiza el layout en una cuadrícula vertical continua. Su estructura semántica es:

```jsx
<div className="min-h-screen bg-background text-foreground font-sans ...">
  <Navbar />
  <StickySocial />
  <main>
    <HeroLanding />
    <FeatureGrid />
    <InfiniteServicesMarquee />
    <MarketingSection reversed />
    <CinematicShowcase />
    <PortfolioCarousel />
    <CTASection />
  </main>
  <Footer />
</div>
```

---

## 2. Componentes de Layout Estructurales

### A. Barra de Navegación Flotante (`Navbar.jsx`)
Ubicación del archivo: [Navbar.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/components/layout/Navbar.jsx)
Encabezado fijo con comportamiento de cristal esmerilado progresivo basado en scroll e interactividad colapsable en móviles.
*   **Lógica de Scroll Cinemático**: Utiliza `useScroll` y `useTransform` de Framer Motion para mapear el desplazamiento vertical (`scrollY`) entre los `0px` y `50px` de altura del viewport, controlando tres estilos dinámicos:
    *   `backgroundColor`: Transiciona de `rgba(10, 10, 10, 0)` a `rgba(10, 10, 10, 0.85)`.
    *   `backdropFilter` (Blur): Transiciona de `blur(0px)` a `blur(12px)`.
    *   `borderBottom`: Transiciona de un borde invisible a una línea sutil de color blanco (`rgba(255, 255, 255, 0.08)`).
*   **Smooth Scroll Programático**: Intercepta los clics en los enlaces mediante `handleNavClick`, ejecutando `scrollIntoView({ behavior: 'smooth' })` sobre el ID de sección correspondiente, y colapsa el menú móvil inmediatamente.
*   **Panel Móvil**: Envuelto en `<AnimatePresence>` para permitir que el menú móvil ejecute una animación de deslizamiento y desvanecimiento al abrirse o cerrarse.

### B. Barra de Enlaces Laterales (`StickySocial.jsx`)
Ubicación del archivo: [StickySocial.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/components/StickySocial.jsx)
Barra fija lateral en el extremo izquierdo de la pantalla. Contiene iconos de redes sociales y etiquetas descriptivas deslizantes.
*   **Aislamiento y Estilos Locales**: Utiliza una hoja de estilos pura [StickySocial.css](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/components/StickySocial.css) con selectores bajo el ID `#sticky-social` para evitar colisiones con el motor JIT de Tailwind.
*   **Carga Condicional de Visibilidad**: El componente permanece oculto por defecto para no competir visualmente con la sección Hero. Mediante un evento global de scroll, calcula un umbral de activación (`window.innerHeight - 100`). Al superarse, se le inyecta la clase `.is-visible` que altera la opacidad y traslada el componente al área visible mediante hardware (`transform: translateX(0)`).
*   **Hover Deslizable**: Al pasar el cursor por encima de un icono, la etiqueta descriptiva en el interior del enlace (con posición absoluta) desliza hacia afuera mediante la transición de la propiedad `left` (`left: -120px` a `left: 100%`).

---

## 3. Secciones y Componentes de Contenido

### A. Sección Hero (`HeroLanding.jsx`)
Ubicación del archivo: [HeroLanding.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/components/sections/HeroLanding.jsx)
Primer impacto visual de la landing page. Presenta un video cinematográfico de fondo, un overlay de contraste, y textos animados.
*   **Carga Responsiva de Multimedia Nativa**: Evita la fatiga de descarga del usuario evaluando la resolución del viewport en el propio motor de renderizado del navegador (sin usar variables de estado de JavaScript). Utiliza la etiqueta HTML `<video>` con múltiples fuentes hijas configuradas mediante el atributo `media`:
    ```html
    <video autoPlay loop muted playsInline className="...">
      <source media="(min-width: 1024px)" src="/videos/hero-pc.mp4" type="video/mp4" />
      <source media="(min-width: 768px)" src="/videos/hero-tablet.mp4" type="video/mp4" />
      <source src="/videos/hero-mobile.mp4" type="video/mp4" />
    </video>
    ```
*   **Capa de Contraste y Foco**: Un overlay negro con 60% de opacidad garantiza que los textos superpuestos superen las normas de accesibilidad de contraste de color de la WCAG, sin importar la luminosidad del frame del video reproducido.

### B. Cuadrícula de Características (`FeatureGrid.jsx`) y `MarketingCard.jsx`
Ubicación del archivo: [FeatureGrid.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/components/sections/FeatureGrid.jsx)
Describe el flujo de trabajo metodológico en 3 fases diferenciadas.
*   **Orquestación en Cascada**: El contenedor principal implementa `<MotionContainer staggerChildren={0.15}>` para coordinar la aparición ordenada de las 3 tarjetas de características.
*   **MarketingCard**: Cada tarjeta utiliza `<GlassCard>` como base. La tarjeta central (Fase 2: "Conoce a tu equipo") recibe la prop `glow={true}` que inyecta bordes y sombras translúcidas permanentes (`border-primary/30` y `shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]`) para destacar visualmente sobre el resto.

### C. Acordeón 3D de Tarjetas Apiladas (`InfiniteServicesMarquee.jsx`)
Ubicación del archivo: [InfiniteServicesMarquee.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/components/sections/InfiniteServicesMarquee.jsx)
Sección insignia de la landing page inspirada en Merlin Studio. Renderiza una baraja vertical de 5 tarjetas de servicios que se apilan dinámicamente y se escalan en el eje Z al hacer scroll.
*   **Layout Sticky Acumulativo**: Cada tarjeta se posiciona de forma fija en relación con el viewport aplicando `sticky` y un cálculo de altura dinámico en el atributo inline `style`. La separación entre tarjetas es de `30px`, revelando progresivamente la cabecera de las tarjetas anteriores:
    ```javascript
    style={{
      top: `calc(15vh + ${index * 30}px)`,
      marginBottom: index === services.length - 1 ? '0' : '80vh'
    }}
    ```
*   **Cálculo de Profundidad 3D (Z-Index Virtual)**: Utiliza `scrollYProgress` del contenedor general para medir el porcentaje de scroll. Cada tarjeta se asocia a un rango de scroll (`range = [index * 0.2, 1]`) en el cual experimenta dos transformaciones:
    1.  `scale`: La tarjeta se encoge un 4% por cada tarjeta superior apilada sobre ella (`targetScale = 1 - (5 - index) * 0.04`), simulando profundidad física.
    2.  `darken` (Opacidad del overlay negro): Pasa del `0%` al `60%` de opacidad conforme la tarjeta se hunde en la parte trasera de la baraja, incrementando el contraste tridimensional.

### D. Sección de Argumentación Comercial (`MarketingSection.jsx`)
Ubicación del archivo: [MarketingSection.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/components/sections/MarketingSection.jsx)
Bloque de dos columnas. En una columna se renderiza el copywriting estructurado utilizando revelados secuenciales (`<RevealText />`) y en la otra se coloca un showcase de diseño abstracto compuesto por un `<GlassCard>` interactivo y esferas difuminadas en el fondo.

### E. Carrusel de Portafolio con Ajuste Programático (`PortfolioCarousel.jsx`)
Ubicación del archivo: [PortfolioCarousel.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/components/PortfolioCarousel.jsx)
Carrusel interactivo horizontal que muestra 12 proyectos de desarrollo y diseño de la empresa.
*   **Scroll Snap Físico**: Utiliza scroll nativo por GPU configurando `scroll-snap-type: x mandatory` en el contenedor y `scroll-snap-align: center` en cada tarjeta de proyecto para que el carrusel se posicione exactamente al centro de la tarjeta activa tras un swipe táctil.
*   **Foco y Centrado Inicial Programático**: Al montarse en el cliente, el componente localiza la quinta tarjeta (clase `.scroll-start` asignada al proyecto *Electrocercos*) y calcula su offset para centrarla horizontalmente en el carrusel, logrando que el usuario vea opciones en ambos extremos del carrusel desde el primer impacto visual:
    ```javascript
    useEffect(() => {
      const carousel = carouselRef.current;
      if (carousel) {
        const startEl = carousel.querySelector('.scroll-start');
        if (startEl) {
          const scrollLeftPosition = startEl.offsetLeft - (carousel.clientWidth / 2) + (startEl.clientWidth / 2);
          carousel.scrollLeft = scrollLeftPosition;
        }
      }
    }, []);
    ```
*   **Ocultación de Scrollbars**: La clase `.carousel` en `src/index.css` oculta las barras de desplazamiento por defecto para mantener una estética cinematográfica limpia (usando `-ms-overflow-style: none`, `scrollbar-width: none` e inyectando `display: none` al selector `::-webkit-scrollbar`).
