/**
 * Curvas de Bézier centralizadas para garantizar consistencia cinematográfica.
 * Nunca hardcodear arrays de easings en los componentes.
 */
export const easings = {
  // Premium smooth easing, ideal para transiciones de layout, reveals y hovers.
  cinematic: [0.22, 1, 0.36, 1],
  
  // Rápido, para microinteracciones donde no queremos que se sienta lento.
  snappy: [0.175, 0.885, 0.32, 1.275],
  
  // Desplazamiento lineal suave, ideal para carousels contínuos o background pans.
  linearSmooth: [0.25, 0.1, 0.25, 1],

  // Curva de Merlin Studio (alta inercia para transiciones líquidas).
  merlin: [0.76, 0, 0.24, 1],
};

/**
 * Duraciones predefinidas en segundos.
 */
export const durations = {
  fast: 0.3,
  base: 0.5,
  slow: 0.8,
  cinematic: 1.2
};
