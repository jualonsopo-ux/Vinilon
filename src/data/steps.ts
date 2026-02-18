/**
 * Steps Data
 * Pasos del proceso para "Cómo Trabajamos"
 */

export interface Step {
  id: string;
  step: number;
  title: string;
  description: string;
}

export const howWeWorkSteps: Step[] = [
  {
    id: 'presupuesto',
    step: 1,
    title: 'Solicita tu Presupuesto',
    description: 'Contacta con nosotros indicando tu ciudad y tipo de necesidad (podrás hacer una estimación orientativa de tu presupuesto concreto directamente en la web).',
  },
  {
    id: 'asesoramiento',
    step: 2,
    title: 'Asesoramiento Técnico',
    description: 'Analizamos la orientación y el tipo de cristal para recomendarte la lámina exacta.',
  },
  {
    id: 'instalacion',
    step: 3,
    title: 'Instalación Profesional',
    description: 'Equipo propio en tu zona. Instalación rápida, limpia y sin obras.',
  },
];
