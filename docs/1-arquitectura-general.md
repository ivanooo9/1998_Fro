# 1. Arquitectura General y Configuración del Proyecto

Este documento detalla la infraestructura tecnológica base, la estructura de directorios y la configuración del entorno de desarrollo para el proyecto **front_1998**.

---

## 1. Stack Tecnológico Principal

El proyecto está diseñado como una Single Page Application (SPA) renderizada del lado del cliente (Client-Side Rendering - CSR) enfocada en animaciones fluidas de alto rendimiento y una estética minimalista premium.

*   **React 18.3.1**: Biblioteca base para la construcción de interfaces de usuario mediante componentes declarativos y reactivos.
*   **Vite 5.2.11**: Entorno de desarrollo rápido y empaquetador (bundler). Utiliza Hot Module Replacement (HMR) ultrarrápido basado en ESM nativo en desarrollo y Rollup para la generación de bundles de producción optimizados.
*   **Tailwind CSS v3.4.3**: Framework de CSS atómico (utility-first) que genera estilos bajo demanda (JIT - Just-In-Time Compiler), minimizando el tamaño del archivo CSS de producción.
*   **Framer Motion v11.2.6**: Motor de animaciones físicas y declarativas optimizado para React. Permite animar de forma segura aprovechando la GPU.
*   **React Icons v5.6.0**: Conjunto de iconos SVG inyectados directamente en línea en el HTML para evitar dependencias de CDN externas u hojas de estilo de fuentes pesadas.

---

## 2. Estructura de Directorios

El código del proyecto está estructurado para separar el sistema de diseño visual de la lógica de negocio y presentación de la landing page.

```text
front_1998/
├── docs/                               # Documentación técnica unificada del proyecto
│   ├── 1-arquitectura-general.md       # Este archivo
│   ├── 2-sistema-de-diseno-y-motion.md # Tokens y primitivas de diseño
│   ├── 3-componentes-de-produccion.md  # Detalle de componentes de la página
│   ├── 4-framework-de-integracion.md   # Feature Flags y adapters de migración
│   ├── 5-blueprint-migracion-nextjs.md # Guía para la migración a Next.js 14
│   └── 6-qa-y-normas-de-seguridad.md   # Estándares de desarrollo y QA
├── public/                             # Recursos estáticos servidos directamente
│   ├── videos/                         # Archivos de video para la sección Hero (.mp4)
│   │   ├── hero-mobile.mp4             # Optimizado para pantallas móviles
│   │   ├── hero-tablet.mp4             # Optimizado para tablets
│   │   └── hero-pc.mp4                 # Optimizado para computadoras de escritorio
│   └── images/                         # Archivos de imágenes locales para el marquee y secciones
├── src/                                # Código fuente de la aplicación
│   ├── main.jsx                        # Punto de entrada de JavaScript (Montaje del DOM)
│   ├── App.jsx                         # Componente raíz con el Config Provider global
│   ├── index.css                       # Estilos globales y utilidades personalizadas
│   ├── components/                     # Componentes y secciones de la aplicación
│   │   ├── cards/                      # Componentes de tarjetas específicos del negocio
│   │   │   └── MarketingCard.jsx
│   │   ├── layout/                     # Componentes de envoltura estructural (Header, Footer)
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── sections/                   # Secciones de la landing page
│   │   │   ├── CTASection.jsx
│   │   │   ├── CinematicShowcase.jsx
│   │   │   ├── FeatureGrid.jsx
│   │   │   ├── HeroLanding.jsx
│   │   │   └── InfiniteServicesMarquee.jsx
│   │   ├── PortfolioCarousel.jsx       # Carrusel interactivo de portafolio
│   │   ├── StickySocial.jsx            # Barra flotante lateral de redes sociales
│   │   └── StickySocial.css            # Estilos específicos aislados de la barra lateral
│   ├── design-system/                  # Sistema de diseño desacoplado (UI Primitives)
│   │   ├── index.js                    # API pública de exportación centralizada
│   │   ├── integration/                # Lógica de compatibilidad, budgets y feature flags
│   │   │   ├── wrappers/               # Envolturas de seguridad para integraciones
│   │   │   ├── IntegrationConfigProvider.jsx
│   │   │   ├── featureFlags.js
│   │   │   ├── migrationModes.js
│   │   │   ├── performanceBudgets.js
│   │   │   └── useIntegrationConfig.js
│   │   ├── layout/                     # Estructura del Layout del Design System
│   │   │   └── StickyHeader.jsx
│   │   ├── motion/                     # Configuración de físicas, easings y hooks de motion
│   │   │   ├── easingPresets.js
│   │   │   ├── motionVariants.js
│   │   │   └── useReducedMotionGlobal.js
│   │   ├── playground/                 # Sandbox aislado de QA visual y experimentación
│   │   │   └── DesignSystemPreview.jsx
│   │   ├── sections/                   # Templates de secciones del design system
│   │   │   └── HeroSection.jsx
│   │   ├── tokens/                     # Variables de tema y variables CSS nativas
│   │   │   └── theme.css
│   │   ├── ui/                         # Primitivas visuales atómicas y animadas
│   │   │   ├── FadeIn.jsx
│   │   │   ├── GlassCard.jsx
│   │   │   ├── HoverMotion.jsx
│   │   │   ├── MotionContainer.jsx
│   │   │   ├── PremiumButton.jsx
│   │   │   └── RevealText.jsx
│   │   └── utils/                      # Utilidades puras de UI
│   │       └── cn.js
│   └── pages/                          # Contenedores de vistas completas de la aplicación
│       └── Home.jsx                    # Estructura de la Landing Page principal
├── index.html                          # Plantilla HTML raíz
├── package.json                        # Definición de scripts, dependencias y metadata
├── postcss.config.js                   # Configuración del motor de PostCSS para Tailwind
├── tailwind.config.js                  # Configuración de reglas y personalizaciones de Tailwind
└── vite.config.js                      # Configuración de Vite y resolución de rutas alias
```

---

## 3. Configuración de Entorno y Aliases de Ruta

### Vite y Resolución de Paths (`vite.config.js`)
Para evitar rutas relativas complejas e inestables (como `../../../../design-system`), el proyecto cuenta con un alias de ruta configurado en Vite:
*   El símbolo `@` apunta directamente al directorio `./src`.
*   Esto se implementa en [vite.config.js](file:///c:/Users/eduardo/Documents/Practicas/front_1998/vite.config.js) mediante la función `resolve()` de Node.js:
    ```javascript
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    }
    ```

### Soporte de Autocompletado del IDE (`jsconfig.json`)
Para garantizar que editores como VS Code puedan autocompletar e indexar correctamente los paths con alias, se ha definido el archivo [jsconfig.json](file:///c:/Users/eduardo/Documents/Practicas/front_1998/jsconfig.json) en la raíz:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

---

## 4. Ciclo de Vida de Arranque de la Aplicación

1.  **Carga del HTML (`index.html`)**: El navegador descarga el archivo de entrada. Este contiene el contenedor `<div id="root"></div>` y carga de forma asíncrona `/src/main.jsx` usando soporte ESM nativo (`type="module"`). También precarga las fuentes de Google Fonts (*Inter* y *Playfair Display*).
2.  **Montaje de React (`src/main.jsx`)**: El script inicializa el renderizado de React en el nodo `#root` mediante `createRoot`, envolviendo la aplicación en `<React.StrictMode>` e importando los estilos globales de [index.css](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/index.css).
3.  **Inyección de Proveedores (`src/App.jsx`)**: El componente [App.jsx](file:///c:/Users/eduardo/Documents/Practicas/front_1998/src/App.jsx) actúa como wrapper principal e inyecta el `IntegrationConfigProvider` configurado por defecto en modo `HYBRID`, protegiendo a todos los componentes descendientes con las políticas de animación de la app.
4.  **Renderizado de la Página (`src/pages/Home.jsx`)**: Se monta la estructura principal de la landing page, instanciando los componentes de layout (`Navbar`, `Footer`, `StickySocial`) y las secciones interactivas del sitio.
