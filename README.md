# 1998 - Desarrollo de Software y Marketing Digital
## Documentación Técnica de la Arquitectura Frontend

Este documento proporciona una especificación exhaustiva de la arquitectura del proyecto frontend **front_1998**. Su objetivo principal es registrar el diseño técnico, las dependencias estructurales, el comportamiento de los componentes clave y establecer las directrices técnicas indispensables para una futura migración hacia **Next.js 14 (App Router)**.

---

## 1. Visión General y Objetivo

El proyecto **front_1998** es la interfaz de landing page de alta conversión para la marca **1998**, una agencia especializada en **Desarrollo de Software y Marketing Digital**. 

### Objetivos Principales:
* **Conversión y Mensaje:** Adaptado a un copywriting persuasivo orientado a la venta de servicios digitales en español, destacando el profesionalismo, la creatividad y los resultados medibles.
* **Estética Cinematográfica (Premium Dark UI):** Implementación de una interfaz con paleta oscura, efectos de vidrio (glassmorphism), y animaciones refinadas controladas por aceleración de hardware para emular una experiencia fluida y de gama alta.
* **Preservación del Layout:** Arquitectura de maquetación móvil-primero (mobile-first) altamente responsiva y compatible con diversas relaciones de aspecto.

---

## 2. Arquitectura y Tecnologías

El stack del proyecto está construido sobre cimientos modernos que priorizan la velocidad de desarrollo y la fidelidad del renderizado:

* **Núcleo de Ejecución:** React 18 (interfaz reactiva) + Vite (sistema de construcción y Bundling ultrarrápido).
* **Diseño y Estilos:** Tailwind CSS v3 (utilidades de diseño atómico para layouts consistentes y responsivos).
* **Animaciones de Transición:** Framer Motion v11 (orquestación de micro-interacciones, efectos scroll y animaciones de texto).
* **Sistema de Construcción:** Vite 5.x con soporte para módulos ES (ESM).

### Preservación Estricta de Tailwind y Diseño Visual:
* Se prohíbe la eliminación o alteración ad-hoc de clases de Tailwind asociadas a animaciones o variables globales.
* Las configuraciones globales de tema residen en `src/design-system/tokens/theme.css`.
* Se ha configurado una fuente serif de respaldo en `src/index.css` que apunta a `Playfair Display`, Georgia, o fuentes serif del sistema en caso de fallos en el cargado de la tipografía corporativa (GT Sectra).

---

## 3. Estructura de Directorios

A continuación se muestra el árbol de directorios del proyecto, resaltando la ubicación de componentes clave, estilos personalizados y activos estáticos:

```text
front_1998/
├── dist/                          # Salida de compilación de producción (Vite build)
├── public/                        # Activos públicos estáticos copiado directo al build
│   └── videos/                    # Videos cinematográficos del Hero (responsivos)
│       ├── hero-mobile.mp4
│       ├── hero-tablet.mp4
│       └── hero-pc.mp4
├── src/                           # Código fuente del desarrollo de React
│   ├── App.jsx                    # Punto de entrada de los Proveedores de Configuración
│   ├── main.jsx                   # Inicialización y renderizado del DOM en React
│   ├── index.css                  # Estilos globales y reglas de scroll de portafolio
│   ├── components/                # Componentes comunes de la aplicación
│   │   ├── PortfolioCarousel.jsx  # Carrusel horizontal de portafolio de proyectos
│   │   ├── StickySocial.jsx       # Barra lateral flotante de redes sociales
│   │   ├── StickySocial.css       # Estilos y fuente Entypo para StickySocial
│   │   ├── cards/
│   │   │   └── MarketingCard.jsx  # Tarjetas individuales del FeatureGrid
│   │   ├── layout/
│   │   │   ├── Navbar.jsx         # Encabezado principal y enlaces condicionales
│   │   │   └── Footer.jsx         # Pie de página y declaración de derechos de autor
│   │   └── sections/
│   │       ├── HeroLanding.jsx    # Sección Hero con fondo de video dinámico
│   │       ├── FeatureGrid.jsx    # Rejilla de 3 columnas de metodología de trabajo
│   │       ├── MarketingSection.jsx# Secciones de mercadeo e imagen intercalada
│   │       ├── CinematicShowcase.jsx# Marco de presentación cinemático intermedio
│   │       └── CTASection.jsx     # Llamada a la acción final (sección planes)
│   ├── pages/
│   │   └── Home.jsx               # Página principal que orquesta todas las secciones
│   └── design-system/             # Biblioteca interna de tokens, componentes y wrappers
│       ├── index.js               # API Pública para importación unificada
│       ├── tokens/
│       │   └── theme.css          # Variables de colores de marca y estilos CSS base
│       ├── ui/                    # Componentes primitivos de interfaz animada
│       │   ├── FadeIn.jsx
│       │   ├── GlassCard.jsx
│       │   ├── HoverMotion.jsx
│       │   ├── MotionContainer.jsx
│       │   ├── PremiumButton.jsx
│       │   └── RevealText.jsx
│       ├── motion/                # Definiciones de velocidad y presets de curvas de animación
│       │   ├── easingPresets.js
│       │   └── motionVariants.js
│       └── integration/           # Proveedores y wrappers de aislamiento y compatibilidad
│           ├── IntegrationConfigProvider.jsx
│           ├── useIntegrationConfig.js
│           └── wrappers/
│               ├── LegacyCardAdapter.jsx
│               ├── MotionSafeWrapper.jsx
│               └── ProgressiveEnhancer.jsx
├── tailwind.config.js             # Configuración del motor Tailwind
└── vite.config.js                 # Configuración de los plugins de Vite (Vite-React)
```

---

## 4. Desglose de Componentes Clave

### A. `<HeroLanding />` (Sección Hero con Video Dinámico)
* **Funcionalidad:** Carga un video de fondo con reproducción automática en bucle e insonorizado (`autoPlay loop muted playsInline`) para proporcionar impacto visual inmediato.
* **Comportamiento Responsivo:** Utiliza etiquetas condicionales `<source>` controladas por `media queries` en HTML para descargar únicamente el video correspondiente a la resolución del dispositivo del usuario:
  * **PC (Ancho >= 1024px):** `/videos/hero-pc.mp4`
  * **Tablet (Ancho >= 768px):** `/videos/hero-tablet.mp4`
  * **Móvil (Por defecto):** `/videos/hero-mobile.mp4`
* **Legibilidad:** Se implementó un div absoluto superpuesto con la clase `bg-black/60` (`z-0`) que disminuye el brillo de la reproducción. El texto y los botones se elevan con `relative z-10`, asegurando un contraste superior de la tipografía blanca.
* **Seguridad de eventos:** La clase `pointer-events-none` previene que el video capture interacciones de ratón o táctiles, garantizando que el scroll y los clics funcionen fluidamente.

### B. `<PortfolioCarousel />` (Carrusel y Alineación en Scroll)
* **Mecánica del Carrusel:** Basado en el estándar de scroll de CSS con snap horizontal (`scroll-snap-type: x mandatory`). No requiere pesadas bibliotecas de terceros para la manipulación de la posición, logrando un rendimiento óptimo de 60fps en renderizado móvil.
* **Integración de Proyectos:** Estructurado con 12 proyectos reales vinculados a sus dominios activos (ej: *secultura.net*, *duolens.ec*, *electrocercos.ec*) y consumiendo imágenes remotas desde el CDN corporativo en `mil998.com`.
* **Centrado Dinámico Reactivo (`scroll-start`):** El componente cuenta con un hook `useEffect` y una referencia `useRef` enlazada a la etiqueta `<section className="carousel">`. Al montarse en el navegador, el script localiza el elemento que posee la clase `.scroll-start` (el proyecto *Electrocercos*) y calcula la posición exacta para centrar automáticamente dicho elemento en la ventana del carrusel:
  ```javascript
  const carouselWidth = carousel.clientWidth;
  const cardWidth = startEl.clientWidth;
  const scrollLeftPosition = startEl.offsetLeft - (carouselWidth / 2) + (cardWidth / 2);
  carousel.scrollLeft = scrollLeftPosition;
  ```

### C. `<StickySocial />` (Barra de Redes Sociales Flotante)
* **Propósito:** Ofrece acceso inmediato a las redes sociales de la empresa (Facebook, Twitter, LinkedIn, Instagram) mediante una barra fija a la izquierda del viewport.
* **Lógica de Visibilidad al Scroll:** El componente utiliza un Hook de estado `isVisible` y un listener de eventos de scroll global:
  ```javascript
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  ```
  La clase `.is-visible` se añade condicionalmente para activar la animación de deslizamiento y cambio de opacidad del contenedor `#sticky-social`.
* **Fuente de Iconos:** Se conecta a la API de `weloveiconfonts` de manera aislada mediante HTTPS en `src/components/StickySocial.css` cargando los iconos `entypo-`. 
* **Efecto Hover Expandible:** Los textos descriptivos (`<span>`) están ocultos con un posicionamiento de `left: -120px` y se desplazan suavemente hacia la derecha (`left: 100%`) cuando el cursor pasa por encima de la tarjeta.

---

## 5. Reglas de Desarrollo del Proyecto (REGLAS DE ORO)

Para mantener la integridad visual y el rendimiento de la aplicación en futuras iteraciones, los ingenieros deben respetar las siguientes directrices estrictas:

### I. Prohibido Alterar la Estructura de DOM Animada
* Los componentes primitivos del sistema de diseño como `<RevealText />` y `<FadeIn />` utilizan wrappers que calculan dimensiones y retrasos dinámicos en sus hijos. Modificar la estructura anidada o remover etiquetas sin probar puede dañar la curva bezier de suavizado y provocar saltos visuales (*layout thrashing*).

### II. Aislamiento Estricto de Hojas de Estilo CSS
* Los archivos de estilo dedicados como `StickySocial.css` y las clases de `.carousel` inyectadas en `index.css` deben mantenerse independientes y utilizar nombres de clase únicos e inequívocos. Esto previene colisiones con el compilador Tailwind JIT (*Just-In-Time*).

### III. Directrices Críticas para la Migración a Next.js 14 (App Router)
Al migrar este proyecto a Next.js 14, se deben aplicar las siguientes configuraciones de arquitectura de React Server Components (RSC):

1. **Directiva `"use client"`:** Los componentes que hacen uso de Hooks de estado, ciclo de vida o referencias (`useState`, `useEffect`, `useRef`), o librerías de cliente como Framer Motion y scroll listeners globales, **deben** marcarse con la directiva `"use client"` en la primera línea del archivo.
   * *Componentes afectados:* `Navbar.jsx`, `StickySocial.jsx`, `PortfolioCarousel.jsx`, `HeroLanding.jsx` (debido al uso de Framer Motion primitives), y los componentes del `design-system/ui/`.
2. **Carga de Videos Estáticos:** En Next.js, las fuentes de video deben ubicarse en la carpeta `/public` de la raíz del proyecto. Las rutas como `/videos/hero-pc.mp4` seguirán resolviéndose correctamente.
3. **Carga de Fuentes de Iconos:** Se recomienda reemplazar la importación remota por URL de la API de fuentes de `weloveiconfonts` por paquetes nativos instalados localmente o a través de `next/font` para optimizar la velocidad de carga de la página (evitando llamadas DNS externas bloqueantes en el renderizado inicial).
4. **Optimización de Imágenes:** Al migrar a Next.js, se debe considerar el uso del componente `<Image>` de `next/image` en las tarjetas de portafolio para habilitar compresión automática WebP, responsividad en la descarga y Lazy Loading nativo eficiente.
