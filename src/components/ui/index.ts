/**
 * UI Components Index
 *
 * Exporta todos los componentes UI atómicos para facilitar imports.
 *
 * Uso:
 * ---
 * import { BenefitCard, StepCard, Badge } from '../components/ui';
 * ---
 *
 * Nota: En Astro, los componentes .astro no pueden re-exportarse directamente
 * desde un archivo .ts. Este archivo sirve como documentación del catálogo
 * de componentes disponibles.
 *
 * Para usar los componentes, importa directamente:
 *
 * import IconBox from './ui/IconBox.astro';
 * import BenefitCard from './ui/BenefitCard.astro';
 * import StepCard from './ui/StepCard.astro';
 * import ReviewCard from './ui/ReviewCard.astro';
 * import SpecRow from './ui/SpecRow.astro';
 * import SelectorCard from './ui/SelectorCard.astro';
 * import SocialIconButton from './ui/SocialIconButton.astro';
 * import Badge from './ui/Badge.astro';
 * import FeatureCard from './ui/FeatureCard.astro';
 * import GalleryItem from './ui/GalleryItem.astro';
 * import Button from './ui/Button.astro';
 * import ModelCard from './ui/ModelCard.astro';
 * import SectionCard from './ui/SectionCard.astro';
 */

// ═══════════════════════════════════════════════════════════════════════════
// CATÁLOGO DE COMPONENTES UI
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Componentes Base (Atómicos)
 * ---------------------------
 * IconBox        - Contenedor cuadrado para iconos con variantes de color
 * Badge          - Etiqueta/tag con variantes (highlight, glass, brand, etc.)
 * Button         - Botón polivalente con variantes (primary, secondary, whatsapp, etc.)
 */

/**
 * Componentes de Card
 * -------------------
 * BenefitCard    - Tarjeta de beneficio (icono + título + descripción)
 * StepCard       - Tarjeta de paso numerado (número + título + descripción)
 * ReviewCard     - Tarjeta de reseña de Google (nombre + fecha + texto + estrellas)
 * FeatureCard    - Tarjeta de característica para detalle de modelo
 * SectionCard    - Contenedor de sección con header y opción collapsible
 * ModelCard      - Tarjeta de modelo para carrusel
 */

/**
 * Componentes de Formulario
 * -------------------------
 * SelectorCard   - Selector con stepper (+/-) para cantidades
 * SpecRow        - Fila de especificación técnica (icono + label + valor)
 */

/**
 * Componentes de Navegación/Social
 * --------------------------------
 * SocialIconButton - Botón de red social (Instagram, WhatsApp, TikTok, etc.)
 */

/**
 * Componentes de Media
 * --------------------
 * GalleryItem    - Item de galería con imagen y caption overlay
 */

// Este archivo es solo documentación - los componentes se importan directamente
export {};
