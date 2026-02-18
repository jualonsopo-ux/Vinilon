# Vinilone Design System

**Versión:** 2.0
**Última actualización:** Febrero 2026
**Arquitectura:** Astro + Tailwind CSS + CSS Custom Properties

---

## Índice

1. [Principios de Diseño](#principios-de-diseño)
2. [Tokens de Diseño](#tokens-de-diseño)
   - [Colores](#colores)
   - [Tipografía](#tipografía)
   - [Espaciado](#espaciado)
   - [Sombras y Efectos](#sombras-y-efectos)
3. [Componentes UI](#componentes-ui)
   - [Button](#button)
   - [Badge](#badge)
   - [IconBox](#iconbox)
   - [Cards](#cards)
   - [Forms](#forms)
4. [Patrones de Nomenclatura](#patrones-de-nomenclatura)
5. [Sistema de Grid y Layout](#sistema-de-grid-y-layout)
6. [Accesibilidad](#accesibilidad)
7. [Guía de Migración](#guía-de-migración)

---

## Principios de Diseño

### 1. **Mobile-First**
Todos los estilos base están optimizados para móvil. Las mejoras visuales se añaden progresivamente con media queries.

### 2. **Token-Driven**
Usamos CSS Custom Properties como single source of truth. Los valores hardcodeados están prohibidos.

### 3. **Spacing System: Múltiplos de 8px**
**LEY UNIVERSAL del sistema:**
- Todos los espacios (gaps, margins, paddings) deben ser múltiplos de 8px
- Sistema base: 8px, 16px, 24px, 32px, 40px, 48px, 64px
- Clases Tailwind: `gap-2` (8px), `gap-4` (16px), `gap-6` (24px), `gap-8` (32px)
- ❌ **NUNCA usar:** `gap-3` (12px), `gap-5` (20px), `mb-3` (12px)
- ✅ **SIEMPRE usar:** `gap-2` (8px), `gap-4` (16px), `gap-6` (24px), `gap-8` (32px)
- ⚠️ `gap-1` (4px) permitido para micro-ajustes internos

### 4. **Semántico sobre Utilitario**
Preferimos clases descriptivas sobre composición de utilidades:
- ✅ `.heading-1`, `.text-body`, `.caption`
- ❌ `.text-3xl.font-bold.leading-tight`

### 5. **Component-Based**
Cada componente UI tiene:
- Props tipadas (TypeScript interfaces)
- Documentación inline
- Variantes bien definidas
- Estados interactivos

### 6. **Consistencia Visual**
- Border radius: 12px por defecto (puede ser 8px, 16px, 24px según contexto)
- Transiciones: 0.2s ease por defecto
- Focus rings: 2px solid brand-400 con offset 2px

### 7. **Botones: Nunca Dos Líneas**
**LEY UNIVERSAL:** Los botones nunca pueden tener texto en dos líneas.
```css
white-space: nowrap;      /* Evita el salto de línea */
min-width: max-content;   /* Ancho mínimo = ancho del texto */
```
- El botón siempre se expandirá para acomodar su contenido
- Si el contenedor es muy pequeño, el botón desbordará (overflow) antes de partirse

---

## Tokens de Diseño

### Colores

#### Brand Colors (Primario: 500)
```css
--brand-50:  #ece9fc;  /* Backgrounds suaves */
--brand-100: #c3baf7;  /* Hover states suaves */
--brand-200: #B9ADF4;  /* Borders */
--brand-300: #7c6aee;  /* Disabled states */
--brand-400: #634dea;  /* Focus rings */
--brand-500: #3c20e5;  /* PRIMARY - Botones, CTAs */
--brand-600: #371dd0;  /* Hover principal */
--brand-700: #2b17a3;  /* Active states */
--brand-800: #21127e;  /* Textos enfáticos */
--brand-900: #190d60;  /* Fondos oscuros */
```

#### Azure Colors (Neutros)
```css
--azure-50:  #F8FAFC;  /* Fondo principal de la app */
--azure-100: #F1F5F9;  /* Cards, secciones */
--azure-200: #E2E8F0;  /* Borders */
--azure-300: #CBD5E1;  /* Borders hover */
--azure-400: #94A3B8;  /* Placeholders, disabled text */
--azure-500: #64748B;  /* Secondary text */
--azure-600: #475569;  /* Body text secondary */
--azure-700: #334155;  /* Labels */
--azure-800: #1E293B;  /* Headings secondary */
--azure-900: #0F172A;  /* PRIMARY TEXT */
```

#### Colores Semánticos
```css
/* Success */
--color-success:       #22C55E;
--color-success-light: #DCFCE7;
--color-success-dark:  #14532D;

/* Error */
--color-error:       #EF4444;
--color-error-light: #FEE2E2;
--color-error-dark:  #DC2626;

/* Warning */
--color-warning:    #F59E0B;
--color-warning-bg: #FEF3C7;
--color-warning-text: #92400E;

/* WhatsApp */
--color-whatsapp:       #25D366;
--color-whatsapp-hover: #1DA851;
```

#### Glassmorphism
```css
--glass-bg:           rgba(255, 255, 255, 0.1);
--glass-bg-hover:     rgba(255, 255, 255, 0.15);
--glass-border:       rgba(255, 255, 255, 0.15);
--glass-border-hover: rgba(255, 255, 255, 0.3);
--glass-highlight:    rgba(255, 255, 255, 0.2);
```

**Uso:** Badges sobre imágenes, overlays en carruseles.

---

### Tipografía

#### Font Families
```css
--font-body:    'Inter', sans-serif;         /* Textos, párrafos */
--font-heading: 'Inter Tight', 'Inter', sans-serif; /* Títulos, headings */
```

#### Escala de Tamaños (Mobile-First)
| Token | Tamaño | Uso |
|-------|--------|-----|
| `--text-xs`   | 12px | Captions, metadata |
| `--text-sm`   | 14px | Labels, secondary text |
| `--text-base` | 16px | **Body text por defecto** |
| `--text-lg`   | 18px | Emphasized body |
| `--text-xl`   | 20px | Small headings |
| `--text-2xl`  | 24px | Card headings |
| `--text-3xl`  | 28px | Section headings |
| `--text-4xl`  | 36px | Page headings |
| `--text-5xl`  | 42px | Hero mobile |
| `--text-6xl`  | 48px | Hero tablet |
| `--text-7xl`  | 56px | Hero desktop |
| `--text-8xl`  | 64px | Hero large screens |

#### Clases Semánticas de Tipografía

**Display (Super Headlines)**
```css
.display-1  /* 48px → 72px (lg) | Weight: 900 | Letter-spacing: -0.03em */
.display-2  /* 40px → 64px (lg) | Weight: 800 */
.display-3  /* 36px → 56px (lg) | Weight: 800 */
```

**Headings**
```css
.heading-1  /* 42px → 64px (md+) | Weight: 700 */
.heading-2  /* 36px → 48px (md+) | Weight: 700 */
.heading-3  /* 28px → 40px (md+) | Weight: 600 */
.heading-4  /* 24px fijo | Weight: 600 */
.heading-5  /* 20px fijo | Weight: 600 */
.heading-6  /* 18px fijo | Weight: 700 | Uppercase | Tracking: 0.05em */
```

**Body & Utility**
```css
.text-body   /* 16px | Weight: 400 | Line-height: 1.5 */
.caption     /* 14px | Weight: 400 | Line-height: 1.5 */
.eyebrow     /* 12px | Weight: 700 | Uppercase | Tracking: 0.1em */
.label       /* 14px | Weight: 500 */
```

**Colores de Texto**
```css
.text-primary     /* azure-900 - Headings, textos principales */
.text-secondary   /* azure-600 - Textos secundarios */
.text-tertiary    /* azure-500 - Textos de soporte */
.text-muted       /* azure-400 - Placeholders, disabled */
.text-inverse     /* white/90 - Sobre fondos oscuros */
.text-brand       /* brand-600 - Acentos, links */
```

#### Font Weights
```css
--font-normal:    400;
--font-medium:    500;
--font-semibold:  600;
--font-bold:      700;
--font-extrabold: 800;
```

#### Line Heights
```css
--leading-none:    1;       /* Badges, números grandes */
--leading-tight:   1.1;     /* Headings */
--leading-snug:    1.25;    /* Subheadings */
--leading-normal:  1.5;     /* Body text */
--leading-relaxed: 1.625;   /* Long-form content */
```

#### Letter Spacing
```css
--tracking-tighter: -0.03em;  /* Display text */
--tracking-tight:   -0.015em; /* Headings */
--tracking-normal:  0;        /* Body */
--tracking-wide:    0.025em;  /* Buttons */
--tracking-wider:   0.05em;   /* Labels */
--tracking-widest:  0.1em;    /* Eyebrow, badges */
```

---

### Espaciado

#### Tokens de Espaciado (Base 4px)
```css
--space-0:   0px;
--space-0-5: 2px;   /* Micro ajustes */
--space-1:   4px;   /* ❌ Evitar en layouts */
--space-2:   8px;   /* ✅ Base mínima */
--space-3:   12px;  /* ❌ NO USAR - no es múltiplo de 8 */
--space-4:   16px;  /* ✅ Estándar */
--space-5:   20px;  /* ⚠️  Casos especiales */
--space-6:   24px;  /* ✅ Recomendado */
--space-8:   32px;  /* ✅ Recomendado */
--space-10:  40px;  /* ✅ Secciones */
--space-12:  48px;  /* ✅ Secciones grandes */
--space-16:  64px;  /* ✅ Hero sections */
```

#### Mapeo Tailwind → Píxeles
| Clase | Valor | Uso Recomendado |
|-------|-------|-----------------|
| `gap-1` | 4px  | ❌ Evitar |
| `gap-2` | 8px  | ✅ Mínimo recomendado |
| `gap-3` | 12px | ❌ NO USAR |
| `gap-4` | 16px | ✅ **Estándar para cards** |
| `gap-5` | 20px | ⚠️  Casos especiales |
| `gap-6` | 24px | ✅ **Secciones internas** |
| `gap-8` | 32px | ✅ **Entre secciones** |

#### Espaciado Semántico
```css
--space-component-gap: 16px;  /* Dentro de componentes */
--space-section-gap:   32px;  /* Entre secciones (mobile) */
                       64px;  /* Entre secciones (desktop) */
--container-padding:   20px;  /* Padding lateral del app-container */
```

---

### Sombras y Efectos

#### Sombras Estándar
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);        /* Borders sutiles */
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);      /* Cards default */
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);    /* Cards hover */
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);    /* Modales */
```

#### Sombras Brand
```css
--shadow-brand:        0 10px 15px -3px rgba(60, 32, 229, 0.15);
--shadow-brand-strong: 0 20px 25px -5px rgba(60, 32, 229, 0.4),
                       0 10px 10px -5px rgba(60, 32, 229, 0.3);
```

#### Border Radius
```css
--radius-xs:   4px;
--radius-sm:   8px;
--radius:      12px;  /* Default */
--radius-lg:   16px;
--radius-xl:   24px;
--radius-full: 9999px; /* Pills, badges */
```

#### Transiciones
```css
--duration-fast:   0.15s;
--duration-normal: 0.2s;
--duration-slow:   0.3s;

--ease-out:    cubic-bezier(0.25, 0.8, 0.25, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Componentes UI

### Button

**Archivo:** `src/components/ui/Button.astro`
**Documentación completa:** `src/components/ui/BUTTON_SYSTEM.md`

#### Props API
```typescript
interface ButtonProps {
  variant?: 'primary' | 'dark' | 'secondary' | 'whatsapp' | 'danger'
          | 'outline' | 'outline-brand'
          | 'ghost' | 'ghost-brand' | 'ghost-white';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  iconOnly?: boolean;
  uppercase?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  iconLeft?: string;
  iconRight?: string;
  class?: string;
}
```

#### Tamaños
| Size | Height | Padding X | Font | Icon | Uso |
|------|--------|-----------|------|------|-----|
| xs   | 32px   | 12px      | 12px | 16px | Inline, tags |
| sm   | 40px   | 16px      | 14px | 18px | Secondary |
| md   | 48px   | 20px      | 14px | 20px | **Default** |
| lg   | 56px   | 24px      | 16px | 20px | Hero CTAs |

#### Ejemplos
```astro
<!-- Primary CTA -->
<Button variant="primary" size="lg" iconRight="arrow-right">
  Solicitar Presupuesto
</Button>

<!-- Ghost navigation -->
<Button variant="ghost" iconLeft="arrow-left">Volver</Button>

<!-- Icon only -->
<Button variant="secondary" iconOnly size="sm" aria-label="Cerrar">
  <i data-lucide="x"></i>
</Button>
```

---

### Badge

**Archivo:** `src/components/ui/Badge.astro`
**Documentación completa:** `src/components/ui/BADGE_SYSTEM.md`

#### Props API
```typescript
interface BadgeProps {
  variant?: 'default' | 'brand' | 'highlight' | 'success' | 'error' | 'accent' | 'glass';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  iconLeft?: string;
  class?: string;
}
```

#### Variantes
| Variant | Uso |
|---------|-----|
| `default` | Neutro, información general |
| `brand` | Destacar con color de marca |
| `highlight` | **Top Ventas, promociones** |
| `success` | Estados positivos |
| `error` | Estados negativos |
| `accent` | Acento suave |
| `glass` | Sobre fondos oscuros/imágenes |

#### Ejemplos
```astro
<!-- Top Ventas -->
<Badge variant="highlight" size="md">Top Ventas</Badge>

<!-- Sobre imagen -->
<Badge variant="glass">Premium</Badge>

<!-- Con icono -->
<Badge variant="success" iconLeft="check">Verificado</Badge>
```

---

### IconBox

**Archivo:** `src/components/ui/IconBox.astro`

Contenedor estandarizado para iconos con fondo y bordes.

#### Props API
```typescript
interface IconBoxProps {
  icon: string;              // Nombre del icono Lucide
  size?: 'sm' | 'md' | 'lg';
  variant?: 'brand' | 'orange' | 'azure' | 'white';
  class?: string;
}
```

#### Tamaños (Múltiplos de 8)
| Size | Dimensiones | Icon Size |
|------|-------------|-----------|
| sm   | 32×32px     | 16px      |
| md   | 40×40px     | 20px      |
| lg   | 48×48px     | 24px      |

#### Variantes
```css
brand:  bg-brand-50, border-brand-100, text-brand-600
orange: bg-orange-50, border-orange-100, text-orange-600
azure:  bg-azure-100, border-azure-200, text-azure-600
white:  bg-white, border-azure-100, text-azure-600
```

#### Ejemplo
```astro
<IconBox icon="zap" size="md" variant="brand" />
```

---

### Cards

#### BaseCard
**Archivo:** `src/components/ui/BaseCard.astro`

Card genérica con variantes de estilo.

```typescript
interface BaseCardProps {
  as?: 'div' | 'article' | 'section';
  variant?: 'default' | 'white' | 'ghost' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  class?: string;
}
```

#### SectionCard
**Archivo:** `src/components/ui/SectionCard.astro`

Wrapper de sección con título, subtítulo y acciones.

```astro
<SectionCard subtitle="32 reseñas">
  <span slot="title">Lo que dicen nuestros clientes</span>
  <div slot="actions"><!-- Actions --></div>
  <!-- Content -->
</SectionCard>
```

#### ModelCard
**Archivo:** `src/components/ui/ModelCard.astro`

Card de modelo con imagen, overlay y badge.

```astro
<ModelCard
  slug="cantabria"
  title="Cantabria"
  subtitle="Privacidad + Luz"
  image={import('../../assets/img/model-cantabria.jpg')}
  badge="Top Ventas"
/>
```

#### FeatureCard
**Archivo:** `src/components/ui/FeatureCard.astro`

Card pequeña para features con icono.

```astro
<FeatureCard
  icon="zap"
  title="Ahorro Energético"
  description="Reduce costes de climatización"
/>
```

#### BenefitCard
**Archivo:** `src/components/ui/BenefitCard.astro`

Card de beneficio con IconBox y texto.

```astro
<BenefitCard
  icon="shield"
  title="Privacidad Total"
  description="Protección de vistas exteriores"
  iconVariant="brand"
/>
```

#### StepCard
**Archivo:** `src/components/ui/StepCard.astro`

Card para procesos con número de paso.

```astro
<StepCard
  step="1"
  title="Contacto Inicial"
  description="Nos cuentas tus necesidades"
/>
```

#### ReviewCard
**Archivo:** `src/components/ui/ReviewCard.astro`

Card de reseña con nombre, fecha y texto.

```astro
<ReviewCard
  name="María S"
  date="2025-09-09"
  text="¡Todo un acierto en casa!"
  rating={5}
/>
```

---

### Forms

#### Input Base
```css
.form-input {
  height: 48px;              /* Múltiplo de 8 */
  padding: 12px 16px;        /* Múltiplos de 4 y 8 */
  border-radius: 12px;
  border: 1px solid azure-200;
  font-size: 14px;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: brand-400;
  box-shadow: 0 0 0 3px rgba(60, 32, 229, 0.1);
}
```

#### Input con Icono
```astro
<div class="relative">
  <div class="input-group-icon">
    <i data-lucide="mail" class="w-5 h-5"></i>
  </div>
  <input
    type="email"
    class="form-input input-with-icon pl-11"
    placeholder="tu@email.com"
  />
</div>
```

---

## Patrones de Nomenclatura

### BEM (Block Element Modifier)
Usado en CSS global para componentes complejos:

```css
/* Block */
.btn { }

/* Element */
.btn__icon { }

/* Modifier */
.btn--primary { }
.btn--sm { }
.btn--disabled { }
```

### Componentes Astro
- **PascalCase:** `Button.astro`, `ModelCard.astro`
- **Props:** camelCase (`iconLeft`, `fullWidth`)
- **Slots:** kebab-case (`<slot name="actions" />`)

### Archivos de Datos
- **camelCase:** `reviews.ts`, `models.ts`
- **Exports:** PascalCase para types, camelCase para data

```typescript
export interface Review { }
export const reviewsRow1: Review[] = [];
```

### CSS Custom Properties
```css
/* Pattern: --{category}-{variant}-{scale} */
--brand-500
--azure-100
--text-xl
--space-4
--btn-height-md
--shadow-brand-strong
```

---

## Sistema de Grid y Layout

### App Container
```css
.app-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;         /* 16px móvil */
  min-height: 100vh;
}

@media (min-width: 1024px) {
  .app-container {
    padding: 1.5rem;     /* 24px desktop */
  }
}
```

### Breakpoints
```css
/* Mobile-first */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### Spacing entre Secciones
```astro
<main class="space-y-5 md:space-y-8 lg:space-y-10">
  <!-- 20px → 32px → 40px -->
</main>
```

---

## Accesibilidad

### Focus Management
```css
:focus-visible {
  outline: 2px solid var(--brand-400);
  outline-offset: 2px;
}
```

### Skip Links
```astro
<a href="#main-content" class="sr-only">
  Saltar al contenido principal
</a>
```

### ARIA Labels
```astro
<!-- Icon-only buttons -->
<Button iconOnly aria-label="Cerrar modal">
  <i data-lucide="x"></i>
</Button>

<!-- Form inputs -->
<input type="email" aria-label="Correo electrónico" />
```

### Color Contrast
- Textos sobre blanco: mínimo `azure-600` (4.5:1)
- Textos sobre brand-500: solo blanco
- Badges highlight: `warning-dark` sobre `warning-light` (7:1)

### Touch Targets
- Mínimo: 44×44px (WCAG 2.1 Level AAA)
- Botones sm: 40×40px (acceptable para secundarios)
- Botones md/lg: 48×48px y 56×56px ✅

---

## Guía de Migración

### De Clases CSS a Componentes

#### Botones
```diff
- <button class="btn btn-primary">Continuar</button>
+ <Button variant="primary">Continuar</Button>

- <button class="btn btn-ghost">
-   <i data-lucide="arrow-left"></i>
-   Volver
- </button>
+ <Button variant="ghost" iconLeft="arrow-left">Volver</Button>
```

#### Badges
```diff
- <span class="badge badge-highlight">Top Ventas</span>
+ <Badge variant="highlight">Top Ventas</Badge>
```

#### Espaciado
```diff
- <div class="flex gap-3">  <!-- ❌ 12px -->
+ <div class="flex gap-4">  <!-- ✅ 16px -->

- <div class="mb-3">        <!-- ❌ 12px -->
+ <div class="mb-4">        <!-- ✅ 16px -->

- <div class="mt-1">        <!-- ❌ 4px -->
+ <div class="mt-2">        <!-- ✅ 8px -->
```

### Checklist de Refactorización

- [ ] Todos los `gap-3` → `gap-4`
- [ ] Todos los `mb-3` → `mb-4`
- [ ] Todos los `mt-1` → `mt-2`
- [ ] Botones inline → Componente `<Button>`
- [ ] Badges inline → Componente `<Badge>`
- [ ] Textos con múltiples clases → Clases semánticas
- [ ] Valores hardcodeados → CSS Custom Properties
- [ ] Eliminar `!important` innecesarios

---

## Recursos Adicionales

### Archivos Clave
- **Design Tokens:** `src/styles/global.css` (líneas 1-233)
- **Tipografía Sistema:** `src/styles/TYPOGRAPHY_SYSTEM.md`
- **Button System:** `src/components/ui/BUTTON_SYSTEM.md`
- **Badge System:** `src/components/ui/BADGE_SYSTEM.md`
- **Componentes UI:** `src/components/ui/*.astro`
- **Design System Preview:** `src/pages/design-system.astro`

### Herramientas
- **Lucide Icons:** https://lucide.dev
- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **Astro Docs:** https://docs.astro.build

---

**Mantenido por:** Juan Alonso Porras (Senior Frontend Architect)
**Contacto:** Para sugerencias y mejoras, abrir issue en el repositorio.

