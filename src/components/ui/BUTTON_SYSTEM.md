# Button Design System - Vinilone

## Principios de Diseño

- **Base unit:** 16px (1rem)
- **Múltiplos:** Todos los tamaños son múltiplos de 4px o 8px
- **Consistencia:** Mismo comportamiento visual en todas las variantes
- **Accesibilidad:** Touch targets mínimo 44px, contraste WCAG AA
- **LEY UNIVERSAL:** Nunca dos líneas de texto (`white-space: nowrap` + `min-width: max-content`)

---

## 1. Anatomía del Botón

```
┌─────────────────────────────────────┐
│  [icon]  Label Text  [trailing]     │
│  ├─gap─┤            ├─────gap─────┤ │
│  └──────────padding─────────────────┘
└─────────────────────────────────────┘
```

- **Icon (opcional):** Leading icon, siempre 20px (1.25rem)
- **Label:** Texto del botón
- **Trailing (opcional):** Icon trailing o indicador
- **Gap:** Espacio entre elementos = 8px

---

## 2. Tamaños (Size)

| Size | Height | Padding X | Padding Y | Font Size | Icon | Use Case |
|------|--------|-----------|-----------|-----------|------|----------|
| `xs` | 32px   | 12px      | 6px       | 12px      | 16px | Inline, tags |
| `sm` | 40px   | 16px      | 10px      | 14px      | 18px | Secondary actions |
| `md` | 48px   | 20px      | 14px      | 14px      | 20px | **Default**, primary CTAs |
| `lg` | 56px   | 24px      | 18px      | 16px      | 20px | Hero CTAs, emphasis |

### Icon-Only Buttons

| Size | Dimensions | Icon Size | Use Case |
|------|------------|-----------|----------|
| `xs` | 32×32px    | 16px      | Dense UI, toolbars |
| `sm` | 40×40px    | 20px      | **Default** icon buttons |
| `md` | 48×48px    | 24px      | Primary icon actions |
| `lg` | 56×56px    | 28px      | Hero, floating actions |

---

## 3. Variantes de Color (Variant)

### Solid Variants (fondo sólido)

| Variant | Background | Text | Hover BG | Use Case |
|---------|------------|------|----------|----------|
| `primary` | brand-500 | white | brand-600 | Primary CTA |
| `dark` | brand-900 | white | black | Wizard, dark contexts |
| `secondary` | white | azure-900 | azure-50 | Secondary actions |
| `whatsapp` | #25D366 | white | #1DA851 | WhatsApp CTA |
| `danger` | error-500 | white | error-600 | Destructive actions |

### Outline Variants (borde, fondo transparente)

| Variant | Border | Text | Hover | Use Case |
|---------|--------|------|-------|----------|
| `outline` | azure-200 | azure-700 | azure-50 bg | Tertiary actions |
| `outline-brand` | brand-500 | brand-600 | brand-50 bg | Brand emphasis |

### Ghost Variants (sin borde, sin fondo)

| Variant | Text | Hover | Use Case |
|---------|------|-------|----------|
| `ghost` | azure-500 | azure-50 bg, azure-700 | Navigation, dismiss |
| `ghost-brand` | brand-600 | brand-50 bg | Brand links |
| `ghost-white` | white/70 | white | Dark backgrounds |

---

## 4. Estados

### Default
```css
cursor: pointer;
transform: translateY(0);
opacity: 1;
```

### Hover
```css
transform: translateY(-1px);
box-shadow: elevated;
/* Color shift según variante */
```

### Active/Pressed
```css
transform: scale(0.98);
box-shadow: none;
```

### Disabled
```css
opacity: 0.5;
cursor: not-allowed;
pointer-events: none;
transform: none;
box-shadow: none;
```

### Loading
```css
pointer-events: none;
/* Spinner icon reemplaza leading icon */
/* Texto "Cargando..." o mantiene label */
```

### Focus Visible
```css
outline: 2px solid brand-500;
outline-offset: 2px;
```

---

## 5. Modificadores

| Modifier | Behavior |
|----------|----------|
| `fullWidth` | width: 100%, justify-content: center |
| `iconOnly` | Aspect ratio 1:1, padding igual en todos lados |
| `uppercase` | text-transform: uppercase, letter-spacing: 0.05em |
| `rounded` | border-radius: 9999px (pill shape) |

---

## 6. CSS Custom Properties

```css
/* Tokens del botón */
--btn-height-xs: 32px;
--btn-height-sm: 40px;
--btn-height-md: 48px;
--btn-height-lg: 56px;

--btn-padding-x-xs: 12px;
--btn-padding-x-sm: 16px;
--btn-padding-x-md: 20px;
--btn-padding-x-lg: 24px;

--btn-font-xs: 12px;
--btn-font-sm: 14px;
--btn-font-md: 14px;
--btn-font-lg: 16px;

--btn-icon-xs: 16px;
--btn-icon-sm: 18px;
--btn-icon-md: 20px;
--btn-icon-lg: 20px;

--btn-radius: 12px;
--btn-gap: 8px;
```

---

## 7. Mapeo de Clases Antiguas → Nuevas

| Antigua | Nueva | Notas |
|---------|-------|-------|
| `.btn-primary` | `<Button variant="primary">` | Default size=md |
| `.btn-primary-dark` | `<Button variant="dark">` | |
| `.btn-secondary` | `<Button variant="secondary">` | |
| `.btn-whatsapp` | `<Button variant="whatsapp" fullWidth>` | |
| `.btn-ghost` | `<Button variant="ghost">` | |
| `.btn .btn-ghost` | `<Button variant="ghost">` | Eliminar redundancia |
| `.icon-btn` | `<Button variant="secondary" iconOnly size="sm">` | |
| `.stepper-btn` | `<Button variant="outline" iconOnly size="xs">` | Stepper minus |
| `.stepper-btn.plus` | `<Button variant="secondary" iconOnly size="xs">` | Stepper plus |
| `.btn-wizard-prev` | `<Button variant="ghost-white" size="sm">` | |

---

## 8. Component API (Props)

```typescript
interface ButtonProps {
  // Core
  variant?: 'primary' | 'dark' | 'secondary' | 'whatsapp' | 'danger'
          | 'outline' | 'outline-brand'
          | 'ghost' | 'ghost-brand' | 'ghost-white';
  size?: 'xs' | 'sm' | 'md' | 'lg';

  // Modifiers
  fullWidth?: boolean;
  iconOnly?: boolean;
  uppercase?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;

  // HTML
  href?: string;        // Renders as <a>
  type?: 'button' | 'submit' | 'reset';

  // Icons (Lucide icon names)
  iconLeft?: string;
  iconRight?: string;

  // Styling
  class?: string;
}
```

---

## 9. Ejemplos de Uso

```astro
<!-- Primary CTA -->
<Button variant="primary" size="lg" iconRight="arrow-right">
  Solicitar Presupuesto
</Button>

<!-- Secondary -->
<Button variant="secondary">Ver Más</Button>

<!-- Ghost navigation -->
<Button variant="ghost" iconLeft="arrow-left">Volver</Button>

<!-- Icon only -->
<Button variant="secondary" iconOnly size="sm" aria-label="Instagram">
  <Icon name="instagram" />
</Button>

<!-- WhatsApp full width -->
<Button variant="whatsapp" fullWidth iconLeft="message-circle">
  Contactar por WhatsApp
</Button>

<!-- Stepper -->
<Button variant="outline" iconOnly size="xs">-</Button>
<Button variant="secondary" iconOnly size="xs">+</Button>

<!-- Dark context (wizard) -->
<Button variant="dark" fullWidth>Continuar</Button>
<Button variant="ghost-white" size="sm" iconLeft="arrow-left">Anterior</Button>

<!-- Loading state -->
<Button variant="primary" loading>Enviando...</Button>

<!-- Disabled -->
<Button variant="primary" disabled>No disponible</Button>
```

---

## 10. Checklist de Migración

- [ ] Crear nuevo Button.astro con todas las props
- [ ] Crear CSS con tokens y variantes
- [ ] Migrar Hero.astro (icon-btn → Button)
- [ ] Migrar Models.astro (btn-ghost, btn-primary)
- [ ] Migrar Wizard.astro (btn-primary-dark, stepper-btn, btn-wizard-prev)
- [ ] Migrar Footer.astro (icon buttons)
- [ ] Migrar SelectorCard.astro (stepper-btn)
- [ ] Eliminar clases CSS obsoletas
- [ ] Actualizar design-system.astro con ejemplos

---

## 11. Notas de Implementación

1. **El componente maneja iconos internamente** - No necesitas envolver iconos, solo pasa `iconLeft="name"` o `iconRight="name"`

2. **Accesibilidad** - Cuando `iconOnly`, require `aria-label`

3. **Links vs Buttons** - Si `href` está presente, renderiza `<a>`, sino `<button>`

4. **Loading state** - Deshabilita interacción, muestra spinner, mantiene dimensiones

5. **Stepper buttons** - Usar `iconOnly size="xs"` con variant="outline" (minus) o variant="secondary" (plus)
