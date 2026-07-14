const fallbackHost = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : `http://${window.location.hostname}:3000`;

export const API_BASE_URL = import.meta.env.VITE_API_URL || fallbackHost;
