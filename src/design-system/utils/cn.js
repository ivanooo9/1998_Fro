import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina clases dinámicas de Tailwind de forma segura.
 * Utiliza `clsx` para evaluación condicional y `twMerge` para resolver
 * colisiones de clases en Tailwind (ej: px-4 y p-6).
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
