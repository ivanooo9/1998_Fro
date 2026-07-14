import { useState, useEffect } from 'react';
import { IntegrationConfigProvider, ThemeProvider, MIGRATION_MODES } from '@/design-system';
import { Home } from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Configurar la restauración de scroll como manual para evitar saltos del navegador
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Desplazar al tope superior de la página
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  return (
    <ThemeProvider>
      <IntegrationConfigProvider mode={MIGRATION_MODES.HYBRID}>
        {currentPath === '/admin' ? <AdminDashboard /> : <Home />}
      </IntegrationConfigProvider>
    </ThemeProvider>
  );
}
