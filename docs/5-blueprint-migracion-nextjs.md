# 5. Blueprint de Migración a Next.js (App Router)

Este módulo provee la hoja de ruta y especificaciones técnicas necesarias para migrar el proyecto **1998** a **Next.js (App Router)** de forma segura, garantizando la optimización de SEO, Server-Side Rendering (SSR) y rendimiento en la carga inicial.

---

## 1. División entre Server y Client Components

Para preservar el alto rendimiento y la velocidad de carga inicial de Next.js, se debe separar estrictamente la lógica estática (RSC) de las interactividades dinámicas (Client Components):

### React Server Components (Por Defecto)
Los componentes estáticos deben compilarse en el servidor para reducir el peso del bundle enviado al cliente:
*   `Home.jsx` (Orquestador principal).
*   `HeroLanding.jsx` (Contenedor base).
*   `FeatureGrid.jsx` (Estructura de la grilla de características).
*   `CinematicShowcase.jsx` (Maquetación base).
*   `CTASection.jsx` (Contenedor de planes).
*   `Footer.jsx` (Pie de página estático).

### Client Components (`"use client"`)
Deben marcarse explícitamente en la primera línea con la directiva `"use client"` aquellos componentes que utilicen hooks (`useState`, `useEffect`), interactividad del navegador o animaciones de Framer Motion:
*   `Navbar.jsx` (Escucha de scroll vertical y estado de menú móvil).
*   `Preloader.jsx` (Detección de tamaño de pantalla e inyección de overflow).
*   `InfiniteServicesMarquee.jsx` & `ServiceCard` (Cálculo de posiciones y reproducción programática de video).
*   `PortfolioCarousel.jsx` (Manipulación directa del DOM mediante `scrollLeft`).
*   Todas las primitivas de animación de `src/design-system/ui/*` (`FadeIn`, `HoverMotion`, `AntiGravity`, etc.) debido a su dependencia directa con el motor físico de Framer Motion.

---

## 2. Resolución de Errores de Hidratación en SSR

Al renderizar componentes en el servidor que interactúan directamente con el objeto global `window` o `document`, se pueden producir discrepancias visuales (*Hydration Mismatches*). 

### 2.1. Mitigación en el Preloader (`Preloader.jsx`)
En Next.js, la llamada directa a `window.innerWidth` en el montaje inicial provocará un fallo inmediato en el servidor (donde `window` no está definido). Se debe posponer el renderizado interactivo hasta que el componente esté completamente montado en el navegador:

```javascript
// Solución segura de hidratación en Next.js
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  // Retorna un fallback estático idéntico al renderizado del servidor
  return <div className="fixed inset-0 bg-[#0d0d0d] z-[9999]" />;
}
```

### 2.2. Mitigación en el `ThemeContext`
Asegurar que la inyección de la clase `.dark` en el elemento raíz `<html>` se ejecute de forma segura dentro de un hook `useEffect` o mediante la inyección directa de un script in-line en el layout de Next.js para prevenir destellos blancos (*flash of light*).

---

## 3. Optimización de Assets nativa de Next.js

### 3.1. Tipografías (`next/font`)
Reemplazar la llamada externa a Google Fonts del cabezal de `index.html` por la carga local y optimizada de Next.js en `app/layout.js`:

```javascript
import { Poppins, Playfair_Display } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '800'],
  variable: '--font-primary',
});
```

### 3.2. Imágenes (`next/image`)
En `PortfolioCarousel.jsx`, sustituir las etiquetas `<img>` nativas por el componente `<Image>` de Next.js. Esto habilita de forma automatizada:
*   Conversión de formato a WebP/AVIF.
*   Redimensión responsiva de imágenes según tamaño de pantalla.
*   Precarga inteligente y blur-up de carga diferida.

---

## 4. Estructura de Rutas y Navegación

Next.js utiliza enrutamiento basado en carpetas físicas dentro de `/app`:
1.  **Landing Page**: Mapeada a `app/page.js` (Ruta raíz).
2.  **Sección Blog (Pendiente)**: Se puede estructurar como una sub-ruta real `app/blog/page.js` facilitando el SEO de artículos sin sobrecargar la landing page principal.
3.  **Formulario de Contacto**: Utilizar API Routes `app/api/contact/route.js` para recibir peticiones y procesar el envío de correos desde el servidor de Next.js.
