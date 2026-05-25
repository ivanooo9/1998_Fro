# 1998 - Desarrollo de Software y Marketing Digital
## Documentación Técnica de Arquitectura Frontend y Blueprint de Migración

Este documento detalla la especificación de la arquitectura frontend del proyecto **front_1998**. Su propósito es servir como la única fuente de verdad técnica para los desarrolladores actuales y como guía estratégica (blueprint) para la migración del sitio hacia la arquitectura **Next.js 14 (App Router)**.

---

## 1. Visión General del Proyecto

El proyecto **front_1998** es una landing page corporativa de alto rendimiento y conversión diseñada para **1998**, una agencia de desarrollo de software y marketing digital.

### Enfoque Estético e Identidad Visual (Premium Dark UI)
El diseño del sitio implementa una estética cinematográfica oscura y minimalista. Sus pilares visuales son:
* **Focalización y Contraste:** Acentos cromáticos de alta intensidad y sombras sutiles que guían la atención del usuario hacia los puntos de conversión.
* **Efectos Glassmorphism:** Capas translúcidas con desenfoque de fondo acelerado por hardware para simular profundidad física.
* **Fluidez Dinámica:** Animaciones orquestadas mediante interpolación matemática de scroll y microinteracciones de CSS puro.

### Copywriting Persuasivo y Estructura de Conversión
La interfaz cuenta con copywriting estructurado en español orientado a mitigar fricciones comerciales:
* **Sección Hero:** Declaración de valor clara ("*Estrategia, creatividad y resultados reales.*").
* **Feature Grid:** Descripción metodológica clara ("*¿Cómo trabajamos?*") que detalla las fases de selección de servicios, comunicación directa mediante canalizaciones a WhatsApp y entregas ágiles.
* **Secciones de Marketing e Intermedias:** Argumentación basada en beneficios, respaldada por un portafolio de proyectos reales.

---

## 2. Arquitectura Frontend Actual

El sitio está estructurado como una Single Page Application (SPA) renderizada del lado del cliente.

### Stack Tecnológico Principal
* **React 18 & Vite 5:** Base reactiva y entorno de desarrollo optimizado mediante Hot Module Replacement (HMR) y empaquetamiento ESM.
* **Tailwind CSS v3:** Sistema de diseño atómico para la inyección eficiente de estilos de utilidad en tiempo de compilación.
* **Framer Motion v11:** Motor de animación declarativo para orquestar la física de scroll e interacciones complejas en el cliente.
* **React Icons v5:** Carga local de iconos SVG en línea, lo que reduce las llamadas HTTP y evita fallas de carga por fuentes externas obsoletas.

### Especificación del Tema y Tipografía
La consistencia visual se rige por variables CSS definidas en el sistema de diseño:
* **Archivo de Tokens:** [theme.css](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/design-system/tokens/theme.css) especifica la paleta de colores corporativa, variables de borde y configuraciones de glassmorphism.
* **Tipografía de Respaldo:** Configurada globalmente en [index.css](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/index.css) con `'Playfair Display', Georgia, serif` para el contenido elegante si fallan las fuentes del lado del servidor.

### Estructura de Directorios
```text
front_1998/
├── public/                        # Activos estáticos
│   ├── images/                    # Archivos de imágenes locales para el marquee
│   │   ├── fondo-marquee-1.png
│   │   └── ...
│   └── videos/                    # Archivos de video responsivos para el Hero
│       ├── hero-mobile.mp4
│       ├── hero-tablet.mp4
│       └── hero-pc.mp4
├── src/                           # Código fuente de la aplicación
│   ├── App.jsx                    # Punto de entrada de React e inyección de Providers
│   ├── main.jsx                   # Montaje en el DOM
│   ├── index.css                  # Estilos globales y utilidades personalizadas
│   ├── components/                # Componentes reactivos modulares
│   │   ├── PortfolioCarousel.jsx  # Carrusel con centrado dinámico inicial
│   │   ├── StickySocial.jsx       # Barra flotante lateral de redes sociales
│   │   ├── StickySocial.css       # Estilos específicos para la barra lateral
│   │   ├── layout/
│   │   │   ├── Navbar.jsx         # Menú con lógica de smooth scroll y autocierre
│   │   │   └── Footer.jsx         # Pie de página adaptado
│   │   └── sections/
│   │       ├── HeroLanding.jsx    # Sección Hero con carga de video condicional
│   │       ├── FeatureGrid.jsx    # Cuadrícula de características del negocio
│   │       ├── InfiniteServicesMarquee.jsx # Acordeón 3D de tarjetas con física de scroll
│   │       └── ...
│   └── design-system/             # Componentes internos de la librería de diseño
```

---

## 3. Componentes Clave del Sistema

### A. `<HeroLanding />` (Carga Responsiva de Multimedia)
Ubicación del archivo: [HeroLanding.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/components/sections/HeroLanding.jsx)

Este componente genera el primer impacto visual de la landing page sin penalizar la carga de datos del usuario.

* **Selección Dinámica del Viewport:** Se delega al motor del navegador la elección del video a descargar mediante elementos `<source>` nativos con queries `media` en lugar de evaluar la anchura en JavaScript:
  ```html
  <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
    <source media="(min-width: 1024px)" src="/videos/hero-pc.mp4" type="video/mp4" />
    <source media="(min-width: 768px)" src="/videos/hero-tablet.mp4" type="video/mp4" />
    <source src="/videos/hero-mobile.mp4" type="video/mp4" />
  </video>
  ```
* **Optimización de Interacción:** 
  - `playsInline` evita que iOS reproduzca el video a pantalla completa de manera forzada.
  - La clase `pointer-events-none` se aplica al video para garantizar que los eventos de clic pasen a través del elemento sin bloquear la experiencia de usuario.
  - Se añade un overlay oscuro (`bg-black/60`) para mantener el contraste tipográfico por encima del estándar de accesibilidad WCAG.

---

### B. `<PortfolioCarousel />` (Alineación y Centrado por Script)
Ubicación del archivo: [PortfolioCarousel.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/components/PortfolioCarousel.jsx)

Carrusel horizontal interactivo que renderiza 12 proyectos integrando alineación táctil nativa y foco de inicio programático.

* **Scroll Snap Nativo:** Se utiliza scroll acelerado por hardware aplicando `scroll-snap-type: x mandatory` al contenedor y `scroll-snap-align: center` a cada una de las tarjetas.
* **Cálculo de Foco Inicial:** Al montarse el componente en el cliente, se localiza el nodo destacado (clase `.scroll-start` asignada al quinto proyecto, *Electrocercos*) y se realiza un desplazamiento programado para centrarlo horizontalmente:
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

---

### C. `<StickySocial />` (Barra de Enlaces Optimizada)
Ubicación del archivo: [StickySocial.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/components/StickySocial.jsx)

Barra fija lateral izquierda con visibilidad diferida para evitar distracciones en el área principal de la pantalla.

* **Carga de Iconografía Local:** Se migró la iconografía remota obsoleta a componentes locales de `react-icons/fa` (`FaFacebookF`, `FaTwitter`, `FaLinkedinIn`, `FaInstagram`), reduciendo el tamaño general de recursos externos y mejorando los tiempos de renderizado.
* **Control de Visibilidad en Scroll:** El componente permanece oculto por debajo del umbral de altura del viewport del Hero (`window.innerHeight - 100`) y se revela mediante un desplazamiento lateral (`transform`) y opacidad suave al desplazarse hacia abajo:
  ```javascript
  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight - 100;
      setIsVisible(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  ```

---

### D. `<Navbar />` (Smooth Scrolling y Menú Autocolapsable)
Ubicación del archivo: [Navbar.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/components/layout/Navbar.jsx)

Controlador del encabezado principal que integra navegación suave, efectos de transparencia dinámica y lógica de autocierre.

* **Smooth Scroll Programático y Autocierre:** Los clics en la barra de navegación se interceptan para desplazar la pantalla de forma suave y colapsar el menú en móviles automáticamente:
  ```javascript
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };
  ```
* **Efectos de Vidrio Interactivos:** Utiliza `useScroll` y `useTransform` para cambiar progresivamente la transparencia y el desenfoque del Navbar al superar los `50px` de scroll vertical, dando un aspecto fluido y premium.

---

### E. `<InfiniteServicesMarquee />` (Efecto Parallax Stacked Cards)
Ubicación del archivo: [InfiniteServicesMarquee.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/components/sections/InfiniteServicesMarquee.jsx)

Efecto de apilamiento vertical inspirado en Merlin Studio, donde las tarjetas se desplazan y encogen recreando una baraja 3D.

* **Layout con Posicionamiento Sticky:** Cada tarjeta se configura con `sticky` de Tailwind CSS y una compensación de margen en el eje `top` basada en su índice para que queden apiladas progresivamente:
  ```javascript
  style={{
    top: `calc(15vh + ${index * 30}px)`,
    marginBottom: index === services.length - 1 ? '0' : '80vh'
  }}
  ```
* **Efecto de Profundidad Tridimensional:** Framer Motion se encarga de calcular el progreso de scroll del contenedor (`scrollYProgress`). A medida que una tarjeta queda en la parte trasera de la baraja, se escala y oscurece usando una capa de fondo negro (`darken` con opacidad controlada):
  ```javascript
  const range = [index * (1 / services.length), 1];
  const targetScale = 1 - ((services.length - index) * 0.04);

  const scale = useTransform(scrollYProgress, range, [1, targetScale]);
  const darken = useTransform(scrollYProgress, range, [0, 0.6]);
  ```

---

## 4. Estilos Globales y UX

Para evitar colisiones entre el compilador Tailwind JIT y las hojas de estilos personalizadas, se definieron reglas estrictas en el archivo CSS global:

### Compensación de Navegación Fija
Dado que el Navbar posee una altura de `80px`, se define la propiedad `scroll-padding-top` en la raíz del documento en [index.css](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/index.css) para que las anclas no se posicionen debajo del encabezado:
```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}
```

### Ocultación de Scrollbars
Para mantener la limpieza visual en navegadores Safari, Chrome y Firefox, se inyectan clases de ocultación sin eliminar la funcionalidad táctil horizontal:
```css
.carousel {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Edge */
}
.carousel::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
```

### Soporte de Desenfoques de Fondo (Backdrop Filters)
Para maximizar la compatibilidad del glassmorphism en dispositivos antiguos que utilicen motores Safari, las reglas de CSS personalizadas inyectan el prefijo `-webkit-` de manera obligatoria:
```css
-webkit-backdrop-filter: blur(12px);
backdrop-filter: blur(12px);
```

---

## 5. Compatibilidad y Problemas Técnicos

El proyecto actual posee ciertos puntos críticos de compatibilidad que requieren especial atención:

### Fallas de Hidratación en Entornos SSR
El acceso directo al objeto global `window` o variables de pantalla (`window.innerHeight`, `window.scrollY`) fuera de ciclos de vida protegidos romperá el flujo en entornos de renderizado del lado del servidor (SSR), puesto que dichas variables no existen en el servidor y generan inconsistencias en el marcado de HTML inicial.

### Colisión JIT y Especificidad de CSS
El motor JIT de Tailwind CSS puede anular estilos Vanilla CSS si no se estructuran con nombres de clase específicos o selectores de IDs. Toda regla CSS ajena a Tailwind debe residir en archivos locales e integrarse con nombres de clase únicos (por ejemplo, `#sticky-social`).

---

## 6. Blueprint de Migración a Next.js 14

La migración a Next.js 14 (App Router) mejorará el SEO de la landing page y automatizará optimizaciones de recursos.

### A. Server Components vs. Client Components
Para optimizar el peso inicial del JavaScript enviado al navegador, estructuramos la jerarquía bajo la regla: *Server Components por defecto, Client Components solo si es interactivo*.

* **React Server Components (RSC):**
  - Contenedor de la página principal (`page.js`).
  - Sección de metodologías (`FeatureGrid.jsx`).
  - Pie de página (`Footer.jsx`).
  - Contenido institucional.
* **Client Components (`"use client"`):**
  - `Navbar.jsx`: Utiliza hooks de animación e interactividad.
  - `StickySocial.jsx`: Accede a eventos de scroll global del objeto `window`.
  - `PortfolioCarousel.jsx`: Manipula desplazamientos mediante referencias directas del DOM.
  - `InfiniteServicesMarquee.jsx`: Requiere hooks reactivos de scroll físico (`useScroll`, `useTransform`).
  - Wrappers del sistema de diseño interactivo (`FadeIn.jsx`, `RevealText.jsx`).

---

### B. Seguridad en la Hidratación de SSR (Hydration Safety)
Para evitar que Next.js falle al renderizar componentes interactivos que acceden a variables del navegador, se debe utilizar el hook `useEffect` para forzar a que estas variables se calculen únicamente en el cliente:
```javascript
"use client";
import React, { useState, useEffect } from 'react';

export const StickySocial = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}>
      {/* Marcado de iconos */}
    </div>
  );
};
```

---

### C. Optimización de Imágenes con `next/image`
Todas las imágenes deben migrarse al componente `<Image />` de Next.js para permitir compresión en WebP/AVIF y Lazy Loading automático.

Para habilitar la descarga segura de las imágenes remotas del portafolio alojadas en `mil998.com`, configure el archivo `next.config.js` de la siguiente manera:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mil998.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
```

---

### D. Optimización Tipográfica con `next/font`
Para evitar el Cumulative Layout Shift (CLS) provocado por la carga tardía de fuentes externas, se integrará la tipografía del sistema directamente en el layout principal usando el optimizador nativo:
```javascript
import { Playfair_Display, Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

---

## 7. Reglas de Oro del Proyecto

> [!IMPORTANT]
> ### Regla I: Integridad del DOM de Animación
> Los wrappers dinámicos del sistema de diseño (`<RevealText />`, `<FadeIn />`, `<MotionContainer />`) manipulan e inyectan propiedades directas a sus nodos hijos en base a Framer Motion. Está prohibido envolver a los elementos hijos con etiquetas HTML adicionales improvisadas sin configurar las variantes adecuadas, puesto que esto rompe la propagación de variantes (*stagger effect*).

> [!WARNING]
> ### Regla II: Aislamiento CSS y namespaces
> Para evitar colisiones JIT causadas por Tailwind, todas las hojas de estilo nativas adicionales (como [`StickySocial.css`](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/components/StickySocial.css)) deben estar encapsuladas utilizando identificadores de clase únicos. No se deben aplicar estilos a etiquetas HTML globales directas en hojas de estilo específicas de componentes.
