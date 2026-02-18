/**
 * Reviews Data
 * Reseñas de Google para el componente Reviews
 */

export interface Review {
  id: string;
  name: string;
  date: string; // Formato ISO: YYYY-MM-DD
  text: string;
  rating: number;
}

// Marquee 1 (scroll izquierda)
export const reviewsRow1: Review[] = [
  {
    id: 'jesus-ml',
    name: 'Jesús Ml',
    date: '2026-01-09',
    text: 'El trato de Guillermo fue súper amable y el trabajo super profesional. Muy contentos con el resultado, se nota muchísimo la diferencia de temperatura.',
    rating: 5,
  },
  {
    id: 'maria-s',
    name: 'María S',
    date: '2025-09-09',
    text: '¡Todo un acierto en casa! Solicitamos los vinilos con el objetivo de reducir el calor y la verdad que se nota muchísimo la diferencia. El trato con Guillermo genial.',
    rating: 5,
  },
  {
    id: 'raquel',
    name: 'Raquel',
    date: '2025-03-09',
    text: 'Servicio y resultado impecable! Buscaba un vinilo que aportara privacidad y redujera el calor en verano. Guillermo me asesoró y el resultado es perfecto.',
    rating: 5,
  },
  {
    id: 'daniel',
    name: 'Daniel',
    date: '2025-02-09',
    text: 'Buen servicio',
    rating: 5,
  },
  {
    id: 'christian',
    name: 'Christian',
    date: '2024-02-09',
    text: 'Excelente servicio. Muy recomendable',
    rating: 5,
  },
  {
    id: 'eduardo-gonzalez',
    name: 'Eduardo González',
    date: '2024-02-09',
    text: 'Excelente servicio y atención! Colocaron una lámina para el sol en un ático y estamos encantados con el resultado. Muy profesionales y eficientes.',
    rating: 5,
  },
];

// Marquee 2 (scroll derecha)
export const reviewsRow2: Review[] = [
  {
    id: 'dcl',
    name: 'DCL',
    date: '2024-02-09',
    text: 'Muy buen servicio y atención. Rápido, eficaz y buen resultado. Muy recomendable.',
    rating: 5,
  },
  {
    id: 'ignacio-mut',
    name: 'Ignacio Mut',
    date: '2024-02-09',
    text: 'Instalaron un vinilo en mi casa para proteger del sol. La instalación fue rápida, limpia y el resultado excelente. Muy profesionales. 100% recomendable.',
    rating: 5,
  },
  {
    id: 'javier-garcia',
    name: 'Javier García B.',
    date: '2024-02-09',
    text: 'Gran servicio. Recomendable.',
    rating: 5,
  },
  {
    id: 'israel-maldonado',
    name: 'Israel Maldonado',
    date: '2023-02-09',
    text: 'Muy buenos profesionales. Muy recomendables.',
    rating: 5,
  },
  {
    id: 'santiago-franco',
    name: 'Santiago Franco',
    date: '2023-02-09',
    text: 'Muy profesionales, puntuales y trabajadores. Me instalaron láminas en 16 ventanas en menos de lo esperado. Recomendados 100%.',
    rating: 5,
  },
  {
    id: 'maria-gallego',
    name: 'María Gallego',
    date: '2023-02-09',
    text: 'Muy profesionales, rápidos y el resultado final ha superado nuestras expectativas. Laminado de 3 ventanas grandes en nuestro ático.',
    rating: 5,
  },
];

// Todas las reviews combinadas
export const allReviews: Review[] = [...reviewsRow1, ...reviewsRow2];

// Estadísticas
export const reviewStats = {
  totalReviews: allReviews.length,
  averageRating: 5,
  googleUrl: 'https://www.google.com/search?sa=X&sca_esv=896419ed210a4547&rlz=1C5CHFA_enES1030ES1030&aep=1&sxsrf=ANbL-n7IOfWXy2BjhofLG-M-WEdzii1N2w:1770653896016&q=Vinilone+Rese%C3%B1as&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDY1NTI3MLY0NzGzMDM3sTQxM9rAyPiKUTAsMy8zJz8vVSEotTj18MbE4kWsmGIAMiAvnEMAAAA&rldimm=13552703974686749462&tbm=lcl&prmd=ivns&hl=es-ES&ved=2ahUKEwi3z_fj58ySAxXbQ_EDHYqYJGgQ9fQKegQIQRAG&biw=1728&bih=992&dpr=2#lkt=LocalPoiReviews',
};
