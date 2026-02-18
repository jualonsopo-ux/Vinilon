# Badge Design System - Vinilone

## Principios de Diseño

- **Base unit:** 4px para padding
- **Forma:** Siempre `rounded-full` (pill shape)
- **Tipografía:** Uppercase, bold, tracking wide
- **Consistencia:** Mismo comportamiento visual en todas las variantes

---

## 1. Tamaños (Size)

| Size | Height | Padding X | Padding Y | Font Size | Use Case |
|------|--------|-----------|-----------|-----------|----------|
| `xs` | ~18px  | 6px       | 2px       | 10px      | Tags inline, compactos |
| `sm` | ~22px  | 8px       | 3px       | 10px      | **Default**, etiquetas |
| `md` | ~26px  | 10px      | 4px       | 12px      | Badges destacados |
| `lg` | ~30px  | 12px      | 5px       | 12px      | CTAs, promociones |

---

## 2. Variantes de Color (Variant)

### Solid Variants

| Variant | Background | Text | Border | Use Case |
|---------|------------|------|--------|----------|
| `default` | azure-100 | azure-700 | azure-200 | Neutro, info |
| `brand` | brand-600 | white | - | Brand highlight |
| `highlight` | warning-light | warning-dark | warning/10 | **Promociones, Top Ventas** |
| `success` | success-light | success-dark | success/20 | Estados positivos |
| `error` | error-light | error-dark | error/20 | Estados negativos |
| `accent` | brand-50 | brand-600 | brand-200 | Accent suave |

### Glass Variant (para fondos oscuros)

| Variant | Background | Text | Border | Use Case |
|---------|------------|------|--------|----------|
| `glass` | white/15 + blur | white | white/30 | Sobre imágenes/gradientes |

---

## 3. Tokens CSS

```css
:root {
  /* Sizes */
  --badge-height-xs: 18px;
  --badge-height-sm: 22px;
  --badge-height-md: 26px;
  --badge-height-lg: 30px;

  --badge-px-xs: 6px;
  --badge-px-sm: 8px;
  --badge-px-md: 10px;
  --badge-px-lg: 12px;

  --badge-py-xs: 2px;
  --badge-py-sm: 3px;
  --badge-py-md: 4px;
  --badge-py-lg: 5px;

  --badge-font-xs: 10px;
  --badge-font-sm: 10px;
  --badge-font-md: 12px;
  --badge-font-lg: 12px;

  --badge-radius: 9999px;
}
```

---

## 4. Component API (Props)

```typescript
interface BadgeProps {
  /** Variante de color */
  variant?: 'default' | 'brand' | 'highlight' | 'success' | 'error' | 'accent' | 'glass';

  /** Tamaño */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /** Icono izquierdo (opcional) */
  iconLeft?: string;

  /** Clases adicionales */
  class?: string;
}
```

---

## 5. Mapeo de Clases Antiguas → Nuevas

| Antigua | Nueva |
|---------|-------|
| `.badge` | `<Badge>` (default) |
| `.badge .badge-highlight` | `<Badge variant="highlight">` |
| `.badge .badge-glass` | `<Badge variant="glass">` |
| `.badge .badge-accent` | `<Badge variant="accent">` |

---

## 6. Ejemplos de Uso

```astro
<!-- Default -->
<Badge>Etiqueta</Badge>

<!-- Promociones -->
<Badge variant="highlight" size="sm">Top Ventas</Badge>

<!-- Brand -->
<Badge variant="brand" size="md">Nuevo</Badge>

<!-- Estados -->
<Badge variant="success">En stock</Badge>
<Badge variant="error">Sin stock</Badge>

<!-- Sobre fondo oscuro -->
<Badge variant="glass">Premium</Badge>

<!-- Con icono -->
<Badge variant="success" iconLeft="check">Verificado</Badge>

<!-- Accent suave -->
<Badge variant="accent" size="xs">Top</Badge>
```

---

## 7. Notas de Implementación

1. **Siempre uppercase** - El componente aplica `text-transform: uppercase` automáticamente

2. **Tracking wide** - Letter-spacing de `0.05em` por defecto

3. **Line height 1** - Para centrado vertical perfecto

4. **Glass variant** - Requiere `backdrop-blur`, usar sobre fondos con contenido

5. **Iconos** - Tamaño proporcional al font-size del badge
