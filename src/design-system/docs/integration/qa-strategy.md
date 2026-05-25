# QA Strategy: Validando Integraciones

1. **Visual Regression:** Después de envolver un Formulario con `MotionSafeWrapper`, el QA debe confirmar que NO hay scroll horizontal provocado por el layout shift inicial.
2. **Interaction Regression:** Haz click frenéticamente (Stress test) en los botones envueltos por `LegacyCardAdapter`. Valida que el `onSubmit` sigue capturándose.
3. **Rollback Validation:** El QA debe poder modificar `<IntegrationConfigProvider mode="soft">` y la app debe revertir de forma predecible sin *crashear*.
4. **Accesibilidad (Keyboard):** Tabula a través de las cards legacy envueltas en motion. El *focus-visible* debe dibujarse sobre la tarjeta animada sin cortarse por `overflow:hidden`.
