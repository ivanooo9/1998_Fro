# 6. QA, Estándares de Código y Normas de Seguridad

Este módulo consolida las normas de calidad, prevención de colisiones visuales, checklist de QA para pruebas y directivas de seguridad para el despliegue a producción.

---

## 1. Prevención del Layout Thrashing (Rendimiento del Navegador)

El *Layout Thrashing* (o fatiga de reflujo) ocurre cuando el código de JavaScript escribe en el DOM y lee de forma alterna propiedades de diseño en un ciclo rápido, forzando al navegador a calcular posiciones físicas múltiples veces por frame.

### Buenas Prácticas en el Proyecto
*   **Agrupamiento de Operaciones**: En `Preloader.jsx` y `PortfolioCarousel.jsx`, las mediciones de tamaño (`clientWidth`, `offsetLeft`) se ejecutan dentro de hooks `useEffect` aislados, previniendo lecturas repetitivas y bloqueos visuales.
*   **Uso de `will-change`**: El componente `AntiGravity` utiliza la clase `will-change-transform` para indicar al navegador que el elemento se animará continuamente, promoviendo la tarjeta a su propia capa de composición de GPU y evitando re-renderizados del layout general.

---

## 2. Pautas para el Manejo de la Capa de Apilamiento (Z-Index)

Para evitar que elementos interactivos como el Navbar queden superpuestos por fondos dinámicos o tarjetas en scroll, se define la siguiente escala de capas virtuales en el proyecto:

*   **`z-[9999]`**: Reservado exclusivamente para componentes bloqueantes globales como `Preloader.jsx` que deben aislar por completo la interfaz del usuario.
*   **`z-50`**: Cabeceras fijas del sitio (`Navbar.jsx`).
*   **`z-40`**: Paneles flotantes temporales (Mobile Dropdown de la barra de navegación).
*   **`z-10`**: Contenedores interactivos principales que requieren soporte de interactividades flotantes, como `PortfolioCarousel` y el título de secciones.
*   **`z-0`**: Capas de video de fondo y brillos decorativos inertes (`HeroLanding` background, video overlays).

---

## 3. Checklist de QA para Despliegues a Producción

Antes de autorizar el paso de código a entornos de producción, el departamento de QA debe verificar el cumplimiento de los siguientes puntos:

### A. Compatibilidad de Compilación (Cross-Platform)
- [ ] Ejecución exitosa de `npm run build` en entornos Windows (requiere remoción previa del comando POSIX `chmod +x` del script).

### B. Rendimiento Multimedia (Límites de Carga)
- [ ] Compresión final de todos los videos de background por debajo de los 2.5 MB por archivo.
- [ ] Implementación de formatos WebM adicionales a MP4 para compatibilidad nativa.
- [ ] Conversión de imágenes en `public/images/` a formatos modernos de nueva generación (.WebP).

### C. Navegación e Interactividad
- [ ] Verificación de anclaje de scroll en Navbar móvil y de escritorio.
- [ ] Asegurar que el scroll se bloquee completamente durante la visualización del preloader y vuelva a la normalidad al expirar.
- [ ] Resolución de la sección `#blog` para evitar que el botón Navbar quede inerte.

### D. Accesibilidad y Soporte Físico
- [ ] Comprobación del comportamiento del sitio con la configuración de accesibilidad "Reduced Motion" del sistema operativo habilitada (las tarjetas no deben levitar y las listas stagger deben cargarse inmediatamente).
- [ ] Cumplimiento de relaciones mínimas de contraste para textos en Dark UI sobre fondos oscuros (relación WCAG AA 4.5:1).

---

## 4. Normas de Estabilidad Corporativa (Enterprise Safety Rules)

1.  **Protección de Componentes Legacy**: Al integrar componentes antiguos con el nuevo Design System, utilizar siempre el `IntegrationConfigProvider` con `mode={MIGRATION_MODES.SOFT}` para deshabilitar de forma automática efectos que puedan desestabilizar la visualización en el navegador del cliente.
2.  **External Link Safety**: Todos los enlaces externos (`target="_blank"`) deben contar obligatoriamente con el atributo `rel="noopener noreferrer"` para proteger al usuario final contra vulnerabilidades de phishing de pestañas abiertas (*tabnabbing*).
