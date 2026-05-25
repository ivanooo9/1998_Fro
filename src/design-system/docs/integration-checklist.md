# Integration Checklist

Esta guía es obligatoria antes de realizar cualquier Pull Request que acople el Design System a código de negocio real. El objetivo es garantizar 0 regresiones.

## Fase 1: Inspección de Componente Destino
- [ ] **Lógica**: ¿El componente actual tiene `useState`, `useEffect` o consume Context/Redux?
- [ ] **Prop Drilling**: Mapear todas las props que recibe el componente original antes de ocultarlo.
- [ ] **Referencias**: ¿Usa `forwardRef` o manipulación manual del DOM que podría colisionar con Framer Motion?

## Fase 2: Ejecución de Reemplazo
- [ ] Desacoplar la UI en un componente puramente visual en la misma carpeta del negocio (si es específico de dominio) o importar del Design System.
- [ ] Pasar explícitamente los handlers (`onClick`, `onChange`, `onSubmit`) al nuevo componente.
- [ ] **Manejo de estados de Carga**: Asegurar que los botones `PremiumButton` reciban la prop `disabled={isLoading}`.

## Fase 3: Post-Integración (Performance & Accesibilidad)
- [ ] Pestaña Performance de Chrome: Ejecutar profiling confirmando que no hay *Main Thread blocking* superior a 50ms al ejecutar animaciones.
- [ ] Auditar *Layout Shifts* (CLS debe ser 0).
- [ ] Pestaña de Render de Chrome: Activar "Paint flashing" para confirmar que un hover no está re-renderizando toda la página.
- [ ] Navegación por teclado (Tab) probada.
- [ ] Testear con *Reduced Motion* habilitado en el OS (ej: Mac -> Preferences -> Accessibility -> Display -> Reduce motion).
