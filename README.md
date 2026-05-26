# 1998 - Desarrollo de Software y Marketing Digital

Este repositorio contiene la landing page corporativa de **1998**, una agencia especializada en el desarrollo de software a medida, branding, publicidad digital y estrategias de automatización de ventas.

El sitio está estructurado como una Single Page Application (SPA) de alto rendimiento e interactividad cinematográfica utilizando una estética oscura premium (*Premium Dark UI*).

---

## Documentación Técnica del Proyecto

Para evitar la duplicidad de contenidos y facilitar el mantenimiento de la plataforma, la documentación se ha modularizado y dividido en guías técnicas específicas según su área de dominio:

### 1. [Arquitectura General y Configuración](file:///c:/Users/eduardo/Documents/Practicas/front_1998/docs/1-arquitectura-general.md)
*   Stack tecnológico principal (React, Vite, Tailwind CSS, Framer Motion, React Icons).
*   Estructura y árbol jerárquico de directorios de todo el repositorio.
*   Configuración de aliases de ruta (`@/`) y ciclo de vida de arranque del sitio.

### 2. [Sistema de Diseño (Design System) y Motor de Motion](file:///c:/Users/eduardo/Documents/Practicas/front_1998/docs/2-sistema-de-diseno-y-motion.md)
*   Tokens de estilo HSL globales (`theme.css`) y clases utilitarias personalizadas (`.glass`, `.glass-intense`).
*   Catálogo de primitivas visuales animadas (`FadeIn`, `GlassCard`, `HoverMotion`, etc.).
*   Especificación de físicas de animación, curvas de Bézier centralizadas e integración de accesibilidad para Reduced Motion.

### 3. [Componentes y Secciones de Producción](file:///c:/Users/eduardo/Documents/Practicas/front_1998/docs/3-componentes-de-produccion.md)
*   Lógica y layouts estructurales de la landing page (`Navbar`, `Footer`, `StickySocial`).
*   Explicación técnica detallada de secciones interactivas del sitio:
    *   Carga multimedia responsiva en el Hero (`HeroLanding`).
    *   Efecto de apilamiento 3D (Z-Index virtual) de tarjetas de servicios (`InfiniteServicesMarquee`).
    *   Centrado programático inicial en el carrusel horizontal de proyectos (`PortfolioCarousel`).

### 4. [Framework de Integración y Compatibilidad](file:///c:/Users/eduardo/Documents/Practicas/front_1998/docs/4-framework-de-integracion.md)
*   Modos de migración y compatibilidad progresiva (`SOFT`, `HYBRID`, `FULL`).
*   Feature Flags del tema e interactividad.
*   Presupuestos de rendimiento (límites de staggers y capas de animación).
*   Envolturas y adaptadores de seguridad (`MotionSafeWrapper`, `LegacyCardAdapter`, `ProgressiveEnhancer`).

### 5. [Blueprint de Migración a Next.js 14 (App Router)](file:///c:/Users/eduardo/Documents/Practicas/front_1998/docs/5-blueprint-migracion-nextjs.md)
*   Jerarquía y separación entre React Server Components (RSC) y Client Components.
*   Resolución segura de hidratación en entornos SSR al consumir objetos del navegador (`window`).
*   Estrategias de optimización de imágenes (`next/image`) y fuentes del lado del servidor (`next/font`).

### 6. [QA, Estándares de Código y Normas de Seguridad](file:///c:/Users/eduardo/Documents/Practicas/front_1998/docs/6-qa-y-normas-de-seguridad.md)
*   *Do's and Don'ts* esenciales para evitar el retraso del navegador (*Layout Thrashing*).
*   *Enterprise Safety Rules* (Mandamientos de estabilidad del negocio).
*   Prevención de conflictos de apilamiento visual (Z-index).
*   Checklist y plan de pruebas de QA para integraciones.

---

## Inicio Rápido (Desarrollo Local)

### Requisitos Previos
*   [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada).
*   Administrador de paquetes `npm` (incluido con Node.js).

### 1. Instalación de Dependencias
Descargue los paquetes requeridos por el proyecto y el sistema de diseño visual corriendo en la terminal:
```bash
npm install
```

### 2. Ejecutar Entorno de Desarrollo
Inicie el servidor local con Hot Module Replacement (HMR) y recarga rápida corriendo:
```bash
npm run dev
```
*   Por defecto, el entorno se levantará en [http://localhost:5173](http://localhost:5173).

### 3. Generar Build de Producción
Para empaquetar y optimizar la plataforma en archivos estáticos minimizados listos para desplegar:
```bash
npm run build
```
*   El compilador colocará los activos compilados en el directorio `/dist`.
