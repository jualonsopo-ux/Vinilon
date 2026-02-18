/**
 * Benefits Data
 * Beneficios para la sección "Sobre Nosotros"
 */

export interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const benefits: Benefit[] = [
  {
    id: 'control-termico',
    icon: 'thermometer-sun',
    title: 'Control Térmico y Ahorro',
    description: 'Mejora el confort térmico reduciendo el calor directo. Esto se traduce en un notable ahorro energético en aire acondicionado.',
  },
  {
    id: 'privacidad',
    icon: 'eye-off',
    title: 'Privacidad Diurna',
    description: 'Efecto espejo durante el día: "ves sin ser visto". Mantén tu intimidad total desde el exterior sin sacrificar la luz natural.',
  },
  {
    id: 'proteccion-uv',
    icon: 'shield',
    title: 'Protección UV del 99%',
    description: 'Bloquea los rayos ultravioleta dañinos, protegiendo suelos, muebles y escaparates de la decoloración y el deterioro.',
  },
  {
    id: 'garantia',
    icon: 'badge-check',
    title: 'Garantía y Durabilidad',
    description: 'Inversión a largo plazo. Ofrecemos 5 años de garantía con una vida útil de nuestros materiales de hasta 15 años.',
  },
];
