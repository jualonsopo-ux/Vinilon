/**
 * Installations Data
 * Galería de instalaciones recientes
 */

export interface Installation {
  id: string;
  /** Ruta de imagen en src/assets/img/ (para usar con import) */
  imagePath: string;
  /** Ruta estática alternativa en public/assets/img/ */
  staticSrc?: string;
  alt: string;
  caption: string;
  location?: string;
  type?: 'residential' | 'commercial' | 'industrial';
}

export const installations: Installation[] = [
  {
    id: 'oficinas-madrid',
    imagePath: '../assets/img/office-madrid.jpg',
    alt: 'Instalación de láminas solares en oficinas de Madrid',
    caption: 'Oficinas Madrid',
    location: 'Madrid',
    type: 'commercial',
  },
  {
    id: 'residencial-valencia',
    imagePath: '../assets/img/model-valencia.jpg', // Usando imagen existente como fallback
    staticSrc: '/assets/img/residential-valencia.jpg',
    alt: 'Instalación residencial en Valencia',
    caption: 'Residencial Valencia',
    location: 'Valencia',
    type: 'residential',
  },
  {
    id: 'nave-industrial',
    imagePath: '../assets/img/model-andalucia.jpg',
    alt: 'Instalación en nave industrial',
    caption: 'Nave Industrial Norte',
    type: 'industrial',
  },
];
