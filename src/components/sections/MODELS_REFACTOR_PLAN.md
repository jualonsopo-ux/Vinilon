# Plan de Refactorización: Sección Modelos

## Auditoría Completa

### 1. VIOLACIONES DE SPACING (Múltiplos de 8px)

| Archivo | Problema | Valor Actual | Valor Correcto |
|---------|----------|--------------|----------------|
| ModelCard.astro | `mb-1` | 4px | `mb-2` (8px) |
| ModelCard.astro | `mt-1` | 4px | `mt-2` (8px) |
| ModelCard.astro | `mb-3` | 12px | `mb-4` (16px) |
| Models.astro | `py-5` (header/footer) | 20px | `py-4` (16px) o `py-6` (24px) |
| Models.astro | `gap-1` (precio) | 4px | `gap-2` (8px) |
| Models.astro | `mb-1` (eyebrow) | 4px | `mb-2` (8px) |
| Models.astro | `ml-0.5` (play icon) | 2px | eliminar o `ml-1` (4px OK en iconos) |
| SpecRow.astro | `gap-3` | 12px | `gap-2` (8px) o `gap-4` (16px) |
| FeatureCard.astro | `mb-3` | 12px | `mb-4` (16px) |
| FeatureCard.astro | `mb-1` | 4px | `mb-2` (8px) |
| SectionCard.astro | `gap-3` | 12px | `gap-4` (16px) |
| SectionCard.astro | `mt-1` | 4px | `mt-2` (8px) |
| IconBox.astro | `md: w-9 h-9` | 36px | `w-10 h-10` (40px) |
| global.css | `--space-5` en overlay | 20px | `--space-4` (16px) |

---

### 2. INCONSISTENCIAS TIPOGRÁFICAS

| Archivo | Elemento | Actual | Debería Ser |
|---------|----------|--------|-------------|
| ModelCard.astro | Título | `text-white font-bold text-xl` | `.heading-5 text-white` |
| ModelCard.astro | Subtítulo | `text-white/80` | `.text-sm text-inverse` |
| Models.astro | Subtítulo detalle | `text-lg text-azure-400` | `.text-lg text-tertiary` |
| SpecRow.astro | Label | `text-sm font-medium text-azure-700` | `.text-sm text-secondary` |
| SpecRow.astro | Value | `font-heading font-bold text-xl` | `.heading-4` |
| FeatureCard.astro | Title | `.heading-card` | `.heading-6` |
| FeatureCard.astro | Desc | `.text-body text-azure-500` | `.caption text-tertiary` |

---

### 3. BADGES INCONSISTENTES

| Ubicación | Implementación | Estado |
|-----------|----------------|--------|
| ModelCard (carrusel) | `<Badge variant="highlight" size="md">` | ✅ Correcto |
| Models detalle | `<span class="badge badge--highlight badge--md">` | ❌ HTML raw |

**Solución:** Usar componente `<Badge>` en ambos lugares.

---

### 4. ESTRUCTURA DE ARCHIVOS ACTUAL vs PROPUESTA

```
ACTUAL:
src/components/
├── sections/
│   └── Models.astro (380 líneas - monolítico)
└── ui/
    ├── ModelCard.astro
    ├── SpecRow.astro
    ├── FeatureCard.astro
    ├── IconBox.astro
    ├── Badge.astro
    └── SectionCard.astro

PROPUESTA:
src/components/
├── sections/
│   └── Models.astro (~100 líneas - orquestador)
├── ui/
│   ├── ModelCard.astro (corregido)
│   ├── ModelDetailModal.astro (NUEVO)
│   ├── SpecRow.astro (corregido)
│   ├── FeatureCard.astro (corregido)
│   ├── IconBox.astro (corregido)
│   ├── Badge.astro
│   └── SectionCard.astro (corregido)
└── scripts/
    └── model-detail.ts (NUEVO - lógica extraída)
```

---

## PLAN DE EJECUCIÓN

### Fase 1: Tokens Base (15 min)

**1.1 IconBox.astro** - Corregir tamaño `md`
```diff
const sizeClasses = {
  sm: 'w-8 h-8',      // 32px ✓
- md: 'w-9 h-9',      // 36px ✗
+ md: 'w-10 h-10',    // 40px ✓
  lg: 'w-12 h-12',    // 48px ✓
};
```

**1.2 global.css** - Corregir .model-card-overlay
```diff
.model-card-overlay {
-   padding: var(--space-5);  /* 20px */
+   padding: var(--space-4);  /* 16px */
}
```

---

### Fase 2: Componentes UI (30 min)

**2.1 ModelCard.astro** - Tipografía y spacing
```astro
<button class="model-card-trigger snap-item shrink-0" data-model={slug}>
  <Image ... />
  <div class="model-card-overlay">
    {badge && <Badge variant="highlight" size="md" class="mb-2">{badge}</Badge>}
    <h4 class="heading-5 text-white">{title}</h4>
    <p class="text-sm text-inverse mt-2 mb-4">{subtitle}</p>
    <div class="model-card-cta">...</div>
  </div>
</button>
```

**2.2 SpecRow.astro** - Tipografía semántica
```diff
- <span class="text-sm font-medium text-azure-700">{label}</span>
+ <span class="text-sm text-secondary">{label}</span>
...
- <span class="font-heading font-bold text-xl text-azure-900">{value}</span>
+ <span class="heading-4">{value}</span>
```

**2.3 FeatureCard.astro** - Spacing y tipografía
```diff
- <IconBox icon={icon} size="md" variant="brand" class="mb-3" />
+ <IconBox icon={icon} size="md" variant="brand" class="mb-4" />
- <h5 class="heading-card mb-1">
+ <h5 class="heading-6 mb-2">
- <p class="text-body text-azure-500">{description}</p>
+ <p class="caption text-tertiary">{description}</p>
```

**2.4 SectionCard.astro** - Spacing
```diff
- <div class="flex items-center gap-3 ...">
+ <div class="flex items-center gap-4 ...">
...
- {subtitle && <p class="text-base text-azure-400 mt-1">{subtitle}</p>}
+ {subtitle && <p class="text-sm text-muted mt-2">{subtitle}</p>}
```

---

### Fase 3: ModelDetailModal.astro (NUEVO) (45 min)

Extraer el modal de Models.astro a un componente independiente:

```astro
---
import Badge from './Badge.astro';
import Button from './Button.astro';
import SpecRow from './SpecRow.astro';
import FeatureCard from './FeatureCard.astro';

interface Props {
  models: Record<string, ModelData>;
}

interface ModelData {
  title: string;
  subtitle: string;
  badge?: string;
  price: string;
  desc: string;
  specs: { heat: string; uv: string; light: string };
  features: Array<{ icon: string; title: string; desc: string }>;
  image: string;
}

const { models } = Astro.props;
---

<div id="models-detail-view" class="hidden">
  <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm
              flex items-center justify-center p-4 lg:p-8">

    <div class="bg-white w-full max-w-[1216px] h-full lg:h-auto
                lg:max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden
                flex flex-col" role="dialog" aria-modal="true">

      <!-- Header -->
      <div class="flex-none px-6 py-4 lg:px-8 lg:py-6 border-b border-azure-100
                  flex justify-between items-center gap-4">
        <Button id="btn-back-internal" variant="ghost" size="sm" iconLeft="arrow-left">
          Volver
        </Button>
        <Button id="btn-x-internal" variant="ghost" size="sm" iconOnly class="lg:hidden">
          <i data-lucide="x" class="w-5 h-5"></i>
        </Button>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-y-auto">
        <div class="flex flex-col lg:flex-row gap-8 p-6 lg:p-8">

          <!-- Imagen + Reels -->
          <div class="flex-1 lg:flex-[1.4] flex flex-col gap-4">
            <div class="relative w-full aspect-[4/3] bg-azure-100 rounded-xl overflow-hidden">
              <img id="detail-img" src="" alt="" class="w-full h-full object-cover" />
              <Badge id="detail-badge" variant="highlight" size="md"
                     class="absolute top-4 left-4 shadow-lg hidden" />
            </div>

            <!-- Reels card -->
            <div class="bg-azure-50 rounded-xl p-4 border border-azure-100 flex flex-col gap-4">
              <h3 class="heading-4 text-tertiary">Ver reels</h3>
              <div class="grid grid-cols-4 gap-4">
                <!-- Reels placeholders -->
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="flex-1 flex flex-col gap-4">
            <div>
              <h2 id="detail-title" class="heading-1"></h2>
              <p id="detail-subtitle" class="text-lg text-tertiary mt-2"></p>
            </div>

            <p id="detail-desc" class="text-body text-secondary"></p>

            <!-- Specs -->
            <div class="bg-azure-50 rounded-xl p-4 border border-azure-100 flex flex-col gap-4">
              <h3 class="heading-4 text-tertiary">Especificaciones técnicas</h3>
              <div class="flex flex-col gap-4">
                <SpecRow icon="thermometer-sun" label="Reducción de Calor" valueId="spec-heat" />
                <SpecRow icon="shield" label="Protección UV" valueId="spec-uv" />
                <SpecRow icon="eye" label="Transmisión de Luz" valueId="spec-light" isLast />
              </div>
            </div>

            <!-- Features pre-rendered -->
            {Object.entries(models).map(([key, model]) => (
              <div data-model-features={key} class="hidden grid grid-cols-3 gap-4">
                {model.features.map(f => (
                  <FeatureCard icon={f.icon} title={f.title} description={f.desc} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex-none px-6 py-4 lg:px-8 lg:py-6 border-t border-azure-100
                  flex items-center justify-between gap-4">
        <div class="flex flex-col">
          <span class="eyebrow text-muted mb-2">Precio estimado material</span>
          <div class="flex items-baseline gap-2">
            <span id="detail-price" class="heading-2"></span>
            <span class="text-sm text-muted">/ m²</span>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <Button variant="ghost" size="md" iconLeft="file-text" class="hidden lg:flex">
            Ficha Técnica
          </Button>
          <Button id="btn-add-budget-internal" variant="primary" size="md"
                  iconRight="arrow-right" uppercase>
            Pedir Presupuesto
          </Button>
        </div>
      </div>

    </div>
  </div>
</div>
```

---

### Fase 4: model-detail.ts (30 min)

Extraer lógica a TypeScript con tipos:

```typescript
// src/scripts/model-detail.ts

interface ModelData {
  title: string;
  subtitle: string;
  badge?: string;
  price: string;
  desc: string;
  specs: { heat: string; uv: string; light: string };
  features: Array<{ icon: string; title: string; desc: string }>;
  image: string;
}

type ModelsMap = Record<string, ModelData>;

export function initModelDetail(models: ModelsMap) {
  const listView = document.getElementById('models-list-view');
  const detailView = document.getElementById('models-detail-view');
  const headerMain = document.getElementById('header-main');
  const headerDetail = document.getElementById('header-detail-nav');

  let triggerElement: HTMLElement | null = null;

  function openDetail(key: string, trigger?: HTMLElement) {
    const data = models[key];
    if (!data) return;

    triggerElement = trigger ?? null;

    // Populate DOM
    const img = document.getElementById('detail-img') as HTMLImageElement;
    img.src = data.image;
    img.alt = data.title;

    setText('detail-title', data.title);
    setText('detail-subtitle', data.subtitle);
    setText('detail-desc', data.desc);
    setText('spec-heat', data.specs.heat);
    setText('spec-uv', data.specs.uv);
    setText('spec-light', data.specs.light);
    setText('detail-price', data.price);

    // Badge
    const badge = document.getElementById('detail-badge');
    if (badge) {
      badge.textContent = data.badge ?? '';
      badge.classList.toggle('hidden', !data.badge);
    }

    // Features
    document.querySelectorAll('[data-model-features]').forEach(
      el => el.classList.add('hidden')
    );
    document.querySelector(`[data-model-features="${key}"]`)?.classList.remove('hidden');

    // Toggle views
    listView?.classList.add('hidden');
    detailView?.classList.remove('hidden');
    headerMain?.classList.add('hidden');
    headerDetail?.classList.remove('hidden');

    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      document.getElementById('btn-back-internal')?.focus();
    });
  }

  function closeDetail() {
    detailView?.classList.add('hidden');
    listView?.classList.remove('hidden');
    headerDetail?.classList.add('hidden');
    headerMain?.classList.remove('hidden');

    document.body.style.overflow = '';

    triggerElement?.focus();
    triggerElement = null;
  }

  function goToCalculator() {
    closeDetail();
    setTimeout(() => {
      document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  // Helpers
  function setText(id: string, text: string) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // Event binding
  document.querySelectorAll('.model-card-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      openDetail((btn as HTMLElement).dataset.model!, btn as HTMLElement);
    });
  });

  document.getElementById('btn-back-models')?.addEventListener('click', closeDetail);
  document.getElementById('btn-back-internal')?.addEventListener('click', closeDetail);
  document.getElementById('btn-x-internal')?.addEventListener('click', closeDetail);
  document.getElementById('btn-add-budget-internal')?.addEventListener('click', goToCalculator);

  detailView?.querySelector('.fixed')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeDetail();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !detailView?.classList.contains('hidden')) {
      closeDetail();
    }
  });
}
```

---

### Fase 5: Models.astro Simplificado (15 min)

Después de extraer componentes:

```astro
---
import SectionCard from '../ui/SectionCard.astro';
import ModelCard from '../ui/ModelCard.astro';
import ModelDetailModal from '../ui/ModelDetailModal.astro';
import Button from '../ui/Button.astro';
import { getImage } from 'astro:assets';

// Images
import imgCantabria from '../../assets/img/model-cantabria.jpg';
import imgValencia from '../../assets/img/model-valencia.jpg';
import imgAndalucia from '../../assets/img/model-andalucia.jpg';

const optimizedCantabria = await getImage({ src: imgCantabria, format: 'webp', width: 800 });
const optimizedValencia = await getImage({ src: imgValencia, format: 'webp', width: 800 });
const optimizedAndalucia = await getImage({ src: imgAndalucia, format: 'webp', width: 800 });

// Data
const MODELS = { ... }; // Sin cambios
---

<section id="models-section" class="w-full">
  <SectionCard id="models-card">
    <div slot="title" class="w-full flex flex-col justify-center min-h-[40px]">
      <div id="header-main" class="flex flex-col items-start">
        <span class="heading-6">Nuestros Modelos</span>
        <p class="caption text-muted hidden lg:block mt-2">Explora las opciones disponibles</p>
      </div>
      <div id="header-detail-nav" class="hidden">
        <Button id="btn-back-models" variant="ghost" size="sm" iconLeft="arrow-left">
          Volver
        </Button>
      </div>
    </div>

    <!-- Carrusel -->
    <div id="models-list-view">
      <div id="models-carousel" class="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4
                                        snap-x md:grid md:grid-cols-3 md:overflow-visible
                                        md:pb-0 md:px-0 md:mx-0">
        <ModelCard slug="cantabria" title="Cantabria" subtitle="Privacidad + Luz"
                   image={import('../../assets/img/model-cantabria.jpg')} badge="Top Ventas" />
        <ModelCard slug="valencia" title="Valencia" subtitle="Equilibrio Solar"
                   image={import('../../assets/img/model-valencia.jpg')} />
        <ModelCard slug="andalucia" title="Andalucía" subtitle="Máxima Protección"
                   image={import('../../assets/img/model-andalucia.jpg')} />
      </div>
    </div>

    <!-- Modal -->
    <ModelDetailModal models={MODELS} />
  </SectionCard>
</section>

<script>
  import { initModelDetail } from '../../scripts/model-detail';

  // Define MODELS inline or import from shared config
  const MODELS = { ... };

  document.addEventListener('DOMContentLoaded', () => initModelDetail(MODELS));
  document.addEventListener('astro:page-load', () => initModelDetail(MODELS));
</script>
```

---

## RESUMEN DE CAMBIOS

### Archivos a MODIFICAR:
1. `IconBox.astro` - md: 36px → 40px
2. `ModelCard.astro` - Tipografía + spacing
3. `SpecRow.astro` - gap-3 → gap-4, tipografía semántica
4. `FeatureCard.astro` - mb-3 → mb-4, heading-card → heading-6
5. `SectionCard.astro` - gap-3 → gap-4, mt-1 → mt-2
6. `global.css` - .model-card-overlay padding
7. `Models.astro` - Simplificar, usar componentes

### Archivos a CREAR:
1. `ModelDetailModal.astro` - Modal extraído
2. `model-detail.ts` - Lógica TypeScript

### Tokens de Spacing Válidos (múltiplos de 8):
- 8px: `gap-2`, `p-2`, `m-2`
- 16px: `gap-4`, `p-4`, `m-4`
- 24px: `gap-6`, `p-6`, `m-6`
- 32px: `gap-8`, `p-8`, `m-8`
- 40px: `gap-10`, `p-10`, `m-10`
- 48px: `gap-12`, `p-12`, `m-12`

### ⚠️ ELIMINADOS (no usar):
- 4px: `gap-1`, `m-1` (excepto para iconos inline)
- 12px: `gap-3`, `m-3`, `p-3`
- 20px: `gap-5`, `m-5`, `p-5`

---

## ORDEN DE EJECUCIÓN

1. ✅ Crear este plan
2. ⏳ Fase 1: Tokens (IconBox, global.css)
3. ⏳ Fase 2: Componentes UI (ModelCard, SpecRow, FeatureCard, SectionCard)
4. ⏳ Fase 3: ModelDetailModal.astro
5. ⏳ Fase 4: model-detail.ts
6. ⏳ Fase 5: Models.astro refactorizado
7. ⏳ Pruebas visuales
