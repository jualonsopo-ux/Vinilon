/**
 * Models Data
 * Datos de modelos de láminas solares - Single Source of Truth
 */

export interface ModelFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface ModelSpecs {
  /** Porcentaje de reducción de calor */
  heat: string;
  /** Porcentaje de protección UV */
  uv: string;
  /** Porcentaje de transmisión de luz */
  light: string;
}

export interface Model {
  /** Slug/ID del modelo */
  slug: string;
  /** Nombre del modelo */
  title: string;
  /** Subtítulo descriptivo */
  subtitle: string;
  /** Badge opcional (ej: "Top Ventas") */
  badge?: string;
  /** Precio por m² */
  price: string;
  /** Descripción larga */
  desc: string;
  /** Especificaciones técnicas */
  specs: ModelSpecs;
  /** Lista de características/features */
  features: ModelFeature[];
  /** Ruta de la imagen */
  image: string;
  /** Ruta de imagen optimizada (src/assets) */
  imagePath?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// MODELOS - CATÁLOGO PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════

export const models: Record<string, Model> = {
  cantabria: {
    slug: 'cantabria',
    title: 'Cantabria',
    subtitle: 'Lámina de Control Solar Residencial',
    badge: 'Top Ventas',
    price: '45€',
    desc: 'El modelo Cantabria representa el pináculo de la ingeniería en films solares residenciales. Ofrece el equilibrio perfecto entre luminosidad natural y protección térmica avanzada. Diseñada específicamente para hogares con exposición solar directa, esta lámina reduce drásticamente la carga térmica sin oscurecer sus estancias, manteniendo el confort visual y protegiendo mobiliario delicado.',
    specs: { heat: '65%', uv: '99%', light: '35%' },
    features: [
      { icon: 'zap', title: 'Ahorro Energético', desc: 'Reduce costes de climatización' },
      { icon: 'shield', title: 'Privacidad', desc: 'Visión unidireccional diurna' },
      { icon: 'armchair', title: 'Protección Muebles', desc: 'Evita la decoloración solar' },
    ],
    image: '/assets/img/model-cantabria.jpg',
    imagePath: '../assets/img/model-cantabria.jpg',
  },
  valencia: {
    slug: 'valencia',
    title: 'Valencia',
    subtitle: 'Equilibrio Solar Avanzado',
    price: '42€',
    desc: 'Un equilibrio perfecto entre protección y luminosidad. Ofrece un nivel intermedio de privacidad con una reducción de luz más notable, ideal para zonas con alta incidencia solar. Mantiene la claridad visual mientras bloquea eficazmente el calor excesivo.',
    specs: { heat: '75%', uv: '99%', light: '25%' },
    features: [
      { icon: 'thermometer-sun', title: 'Confort Térmico', desc: 'Ideal para zonas soleadas' },
      { icon: 'eye', title: 'Visión Clara', desc: 'Baja reflectividad interior' },
      { icon: 'sun', title: 'Control Solar', desc: 'Reducción significativa de calor' },
    ],
    image: '/assets/img/model-valencia.jpg',
    imagePath: '../assets/img/model-valencia.jpg',
  },
  andalucia: {
    slug: 'andalucia',
    title: 'Andalucía',
    subtitle: 'Máxima Protección Solar',
    price: '48€',
    desc: 'Nuestra opción más potente para condiciones extremas. Proporciona privacidad total y un rechazo de calor superior. Ideal para estancias muy expuestas, áticos, oficinas o escaparates comerciales que requieren máxima protección.',
    specs: { heat: '85%', uv: '99%', light: '15%' },
    features: [
      { icon: 'shield-check', title: 'Privacidad Total', desc: 'Máxima intimidad día y noche' },
      { icon: 'flame', title: 'Anti-Calor', desc: 'Rechazo térmico extremo' },
      { icon: 'lock', title: 'Seguridad', desc: 'Protección contra roturas' },
    ],
    image: '/assets/img/model-andalucia.jpg',
    imagePath: '../assets/img/model-andalucia.jpg',
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

/** Lista de modelos como array */
export const modelsList: Model[] = Object.values(models);

/** Obtener modelo por slug */
export function getModel(slug: string): Model | undefined {
  return models[slug];
}

/** Slugs disponibles */
export const modelSlugs = Object.keys(models) as Array<keyof typeof models>;

/** Datos simplificados para el carrusel */
export const modelsForCarousel = modelsList.map(m => ({
  slug: m.slug,
  title: m.title,
  subtitle: m.subtitle.split(' ').slice(0, 3).join(' '), // Versión corta del subtítulo
  badge: m.badge,
  image: m.image,
  imagePath: m.imagePath,
}));

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTES DE ESPECIFICACIONES
// ═══════════════════════════════════════════════════════════════════════════

export const specLabels = {
  heat: 'Reducción de Calor',
  uv: 'Protección UV',
  light: 'Transmisión de Luz',
} as const;

export const specIcons = {
  heat: 'thermometer-sun',
  uv: 'sun',
  light: 'eye',
} as const;
