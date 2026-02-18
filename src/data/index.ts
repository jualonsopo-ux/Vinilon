/**
 * Data Index
 * Centraliza la exportación de todos los datos del proyecto
 *
 * Uso:
 * import { benefits, howWeWorkSteps, models, reviewsRow1 } from '../data';
 */

// Benefits (Sobre Nosotros)
export { benefits } from './benefits';
export type { Benefit } from './benefits';

// Steps (Cómo Trabajamos)
export { howWeWorkSteps } from './steps';
export type { Step } from './steps';

// Models (Catálogo de Láminas)
export {
  models,
  modelsList,
  modelSlugs,
  modelsForCarousel,
  getModel,
  specLabels,
  specIcons,
} from './models';
export type { Model, ModelFeature, ModelSpecs } from './models';

// Reviews (Social Proof)
export {
  reviewsRow1,
  reviewsRow2,
  allReviews,
  reviewStats,
} from './reviews';
export type { Review } from './reviews';

// Installations (Galería)
export { installations } from './installations';
export type { Installation } from './installations';
