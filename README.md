# 1998 - Desarrollo de Software y Marketing Digital

Este repositorio contiene la landing page corporativa de **1998**, una agencia especializada en el desarrollo de software a medida, branding, publicidad digital y estrategias de automatización de ventas.

El sitio está estructurado como una Single Page Application (SPA) de alto rendimiento e interactividad cinematográfica utilizando una estética oscura premium (*Premium Dark UI*).

---

## Documentación Técnica del Proyecto

Para facilitar el desarrollo, mantenimiento y escalabilidad de la plataforma, se ha redactado una guía técnica maestra exhaustiva:

### 📄 [Documentación Técnica Maestra](file:///c:/Users/eduardo/Documents/Practicas/front_1998/docs/DOCUMENTACION_TECNICA.md)
Este documento principal cubre todos los aspectos clave del proyecto frontend, incluyendo:
*   **Introducción y Requisitos Previos**: Entorno de ejecución y dependencias de desarrollo.
*   **Arquitectura General**: Integración híbrida con React/Vite y la guía de preparación y migración progresiva a **Next.js (App Router)**.
*   **Sistema de Diseño y Estilos**: Implementación cromática HSL, tipografía fluida y guía de **Glassmorphism** utilizando Tailwind CSS.
*   **Animaciones Avanzadas con GSAP**: Configuración paso a paso de GreenSock, registro de plugins (`ScrollTrigger`), hooks de integración segura (`useGSAP`), guías de accesibilidad para Reduced Motion y ejemplos de código interactivo.
*   **Componentes Clave**: Detalle técnico del Preloader líquido, Navbar inteligente, carrusel de proyectos y componentes atómicos.

### Módulos de Soporte Adicionales
*   [4. Framework de Integración y Compatibilidad](file:///c:/Users/eduardo/Documents/Practicas/front_1998/docs/4-framework-de-integracion.md): Gestión de Feature Flags y modos de migración (`SOFT`, `HYBRID`, `FULL`).
*   [5. Blueprint de Migración a Next.js 14](file:///c:/Users/eduardo/Documents/Practicas/front_1998/docs/5-blueprint-migracion-nextjs.md): RSC vs Client Components y resolución de hidratación SSR.
*   [6. QA, Estándares de Código y Normas de Seguridad](file:///c:/Users/eduardo/Documents/Practicas/front_1998/docs/6-qa-y-normas-de-seguridad.md): Prevención de Layout Thrashing y normas de estabilidad empresarial.
*   [Auditoría Técnica Exhaustiva (AUDIT.md)](file:///c:/Users/eduardo/Documents/Practicas/front_1998/docs/AUDIT.md): Análisis detallado del código fuente y roadmap de prioridades de deuda técnica.

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
