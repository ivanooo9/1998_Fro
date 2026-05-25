# Component API & Usage

## Composición Básica (CN Utility)
Gracias a `cn()`, puedes pasar un `className` custom a cualquier componente y este se unirá con seguridad sin romper el layout.

```jsx
import { PremiumButton } from '@/design-system/ui/PremiumButton';

// El mt-4 sobreescribirá márgenes anteriores sin colisión
<PremiumButton className="mt-4">
  Haz click aquí
</PremiumButton>
```

## Motion Stagger
El `MotionContainer` está pensado para evitar mapeos complejos. Sólo envuelve a los hijos en componentes de Motion como `FadeIn` y listo.

```jsx
<MotionContainer staggerChildren={0.2}>
   <FadeIn>Item 1</FadeIn>
   <FadeIn>Item 2</FadeIn>
</MotionContainer>
```
