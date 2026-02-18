# Typography Design System - Vinilone

## Principios

- **Escala modular:** Ratio ~1.25 (Major Third)
- **Mobile-first:** Tamaños base para móvil, escalan en breakpoints
- **Semántico:** Nombres descriptivos por uso, no por tamaño
- **Sin `!important`:** Clases específicas > selectores genéricos

---

## 1. Escala Tipográfica

### Display (Heroes, impacto visual)

| Clase | Mobile | Tablet | Desktop | Weight | Tracking | Uso |
|-------|--------|--------|---------|--------|----------|-----|
| `.display-1` | 48px | 64px | 80px | 900 | -0.03em | Hero principal |
| `.display-2` | 36px | 48px | 56px | 800 | -0.02em | Hero secundario |

### Headings (Secciones, cards)

| Clase | Mobile | Tablet | Desktop | Weight | Tracking | Uso |
|-------|--------|--------|---------|--------|----------|-----|
| `.heading-1` | 32px | 40px | 48px | 700 | -0.02em | Secciones principales |
| `.heading-2` | 24px | 28px | 32px | 700 | -0.015em | Subsecciones |
| `.heading-3` | 20px | 22px | 24px | 600 | -0.01em | Cards grandes |
| `.heading-4` | 18px | 18px | 20px | 600 | 0 | Cards medianas |
| `.heading-5` | 16px | 16px | 18px | 600 | 0 | Cards pequeñas |
| `.heading-6` | 14px | 14px | 14px | 700 | 0.05em | Items lista, labels |

### Body (Contenido)

| Clase | Size | Line Height | Weight | Uso |
|-------|------|-------------|--------|-----|
| `.text-lg` | 18px | 1.6 | 400 | Intro, lead paragraphs |
| `.text-body` | 16px | 1.6 | 400 | **Default**, párrafos |
| `.text-sm` | 14px | 1.5 | 400 | Texto secundario |
| `.text-xs` | 12px | 1.4 | 400 | Captions, metadata |

### Labels (UI, metadata)

| Clase | Size | Weight | Transform | Tracking | Uso |
|-------|------|--------|-----------|----------|-----|
| `.label` | 14px | 500 | uppercase | 0.05em | Labels de formulario |
| `.eyebrow` | 12px | 500 | uppercase | 0.08em | Categorías, secciones |
| `.caption` | 12px | 400 | none | 0 | Notas, helpers |
| `.overline` | 10px | 700 | uppercase | 0.1em | Tags mínimos |

---

## 2. Colores de Texto

| Clase | Variable | Uso |
|-------|----------|-----|
| `.text-primary` | azure-900 | Headings, texto principal |
| `.text-secondary` | azure-600 | Body text, párrafos |
| `.text-tertiary` | azure-500 | Texto secundario |
| `.text-muted` | azure-400 | Metadata, placeholders |
| `.text-brand` | brand-600 | Enlaces, acentos |
| `.text-white` | white | Sobre fondos oscuros |
| `.text-inverse` | white/80 | Sobre fondos oscuros (suave) |

---

## 3. Tokens CSS

```css
:root {
  /* Font Families */
  --font-display: 'Inter Tight', 'Inter', sans-serif;
  --font-heading: 'Inter Tight', 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Font Sizes - Mobile Base */
  --text-display-1: 3rem;      /* 48px */
  --text-display-2: 2.25rem;   /* 36px */
  --text-h1: 2rem;             /* 32px */
  --text-h2: 1.5rem;           /* 24px */
  --text-h3: 1.25rem;          /* 20px */
  --text-h4: 1.125rem;         /* 18px */
  --text-h5: 1rem;             /* 16px */
  --text-h6: 0.875rem;         /* 14px */
  --text-lg: 1.125rem;         /* 18px */
  --text-base: 1rem;           /* 16px */
  --text-sm: 0.875rem;         /* 14px */
  --text-xs: 0.75rem;          /* 12px */
  --text-xxs: 0.625rem;        /* 10px */

  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.15;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.6;
  --leading-loose: 1.8;

  /* Letter Spacing */
  --tracking-tighter: -0.03em;
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.08em;
  --tracking-widest: 0.1em;

  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  --font-black: 900;
}
```

---

## 4. Responsive Breakpoints

```css
/* Tablet (md) */
@media (min-width: 768px) {
  --text-display-1: 4rem;      /* 64px */
  --text-display-2: 3rem;      /* 48px */
  --text-h1: 2.5rem;           /* 40px */
  --text-h2: 1.75rem;          /* 28px */
  --text-h3: 1.375rem;         /* 22px */
}

/* Desktop (lg) */
@media (min-width: 1024px) {
  --text-display-1: 5rem;      /* 80px */
  --text-display-2: 3.5rem;    /* 56px */
  --text-h1: 3rem;             /* 48px */
  --text-h2: 2rem;             /* 32px */
  --text-h3: 1.5rem;           /* 24px */
  --text-h4: 1.25rem;          /* 20px */
  --text-h5: 1.125rem;         /* 18px */
}
```

---

## 5. Mapeo de Clases Antiguas → Nuevas

| Antigua | Nueva | Notas |
|---------|-------|-------|
| `h1` (tag) | `.display-1` o `.heading-1` | Según contexto |
| `h2` (tag) | `.heading-1` o `.heading-2` | Según jerarquía |
| `.heading-card` | `.heading-6` | Misma función |
| `.text-body` | `.text-body` | Sin cambios |
| `.text-eyebrow` | `.eyebrow` | Simplificado |
| `.text-muted` | `.text-muted` o `.caption` | Según contexto |
| `.text-caption` | `.caption` | Simplificado |
| `style="font-size:48px"` | `.heading-1` | Eliminar inline |

---

## 6. Ejemplos de Uso

```html
<!-- Hero -->
<h1 class="display-1">Privacidad y frescor</h1>
<p class="text-lg text-secondary">Expertos en láminas solares.</p>

<!-- Sección -->
<h2 class="heading-1">Nuestros Modelos</h2>
<p class="eyebrow text-muted">Explora las opciones</p>

<!-- Card -->
<h3 class="heading-4">Modelo Cantabria</h3>
<p class="text-sm text-tertiary">Privacidad + Luz natural</p>

<!-- Modal título grande -->
<h2 class="heading-1">Cantabria</h2>
<p class="text-body text-secondary">Descripción del modelo...</p>

<!-- Labels -->
<span class="eyebrow">Precio estimado</span>
<span class="heading-2">45€</span>
<span class="text-muted">/ m²</span>
```

---

## 7. Checklist de Migración

- [ ] Actualizar tokens en :root
- [ ] Crear clases .display-1, .display-2
- [ ] Actualizar .heading-1 a .heading-6
- [ ] Simplificar .eyebrow, .caption, .overline
- [ ] Eliminar duplicados de .text-caption
- [ ] Quitar !important de h1-h6
- [ ] Migrar inline styles en Models.astro
- [ ] Actualizar design-system.astro
