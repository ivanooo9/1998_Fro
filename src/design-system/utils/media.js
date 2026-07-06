/**
 * Determina si una URL (por ejemplo de Cloudinary) representa un archivo de video.
 * @param {string} url - URL del recurso multimedia.
 * @returns {boolean} True si es video, False de lo contrario.
 */
export const isVideo = (url) => {
  if (!url) return false;
  const cleanUrl = url.split('?')[0].split('#')[0].toLowerCase();
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.quicktime'];
  return videoExtensions.some(ext => cleanUrl.endsWith(ext)) || url.toLowerCase().includes('/video/upload/');
};
