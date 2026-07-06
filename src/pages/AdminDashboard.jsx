import React, { useState, useEffect } from 'react';
import AlertMessage from '../components/admin/AlertMessage';
import AdminLoginForm from '../components/admin/AdminLoginForm';
import HeroForm from '../components/admin/HeroForm';
import ProjectForm from '../components/admin/ProjectForm';
import ServiceForm from '../components/admin/ServiceForm';
import WorkStepForm from '../components/admin/WorkStepForm';
import InfoBlockForm from '../components/admin/InfoBlockForm';

export const AdminDashboard = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [activeTab, setActiveTab] = useState('hero');
  const [uploadingField, setUploadingField] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Estados globales de la Landing Page
  const [heroData, setHeroData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [infoBlocks, setInfoBlocks] = useState([]);
  const [workSteps, setWorkSteps] = useState([]);

  // Carga de datos de la Landing Page
  const loadLandingContent = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/landing-content');
      if (!response.ok) throw new Error('Error al cargar contenido de la API');
      const data = await response.json();

      setHeroData(data.hero);
      if (data.portfolio && data.portfolio.projects) {
        setProjects(data.portfolio.projects);
      }
      if (data.servicesMarquee && data.servicesMarquee.services) {
        setServices(data.servicesMarquee.services);
      }
      if (data.infoBlocks) {
        setInfoBlocks(data.infoBlocks);
      }
      if (data.workSteps) {
        setWorkSteps(data.workSteps);
      }
    } catch (err) {
      console.error('Error cargando contenidos:', err);
    }
  };

  useEffect(() => {
    loadLandingContent();
  }, []);

  const handleLogin = async (password) => {
    setIsLoggingIn(true);
    try {
      const response = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Contraseña incorrecta');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setAlert({ type: 'success', message: 'Sesión iniciada correctamente.' });
      loadLandingContent();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setAlert({ type: 'success', message: 'Sesión cerrada exitosamente.' });
  };

  if (!token) {
    return (
      <AdminLoginForm
        handleLogin={handleLogin}
        isLoggingIn={isLoggingIn}
        alert={alert}
        setAlert={setAlert}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground font-sans flex flex-col items-center py-12 px-4 md:px-8 relative selection:bg-primary selection:text-primary-foreground">
      {/* Background radial soft light */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-[100%] blur-[120px] opacity-60" />
      </div>

      <div className="w-full max-w-4xl z-10">
        {/* Header Dashboard */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-neutral-800/80 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-black text-white tracking-tight uppercase">
              1998 Admin Panel
            </h1>
            <p className="text-xs text-white/40 mt-1 font-mono tracking-wider">
              GESTIÓN DE CONTENIDOS Y ARCHIVOS MULTIMEDIA
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/"
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 border border-neutral-800 rounded-full hover:bg-white/5 hover:border-white/20 transition-all font-mono text-white/70 hover:text-white"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              VOLVER AL SITIO
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 border border-red-950 bg-red-950/10 text-red-400 rounded-full hover:bg-red-950/20 hover:border-red-900 transition-all font-mono"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              CERRAR SESIÓN
            </button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="flex gap-1 bg-neutral-900/50 p-1.5 rounded-xl border border-neutral-900 mb-8 max-w-2xl overflow-x-auto">
          {['hero', 'portfolio', 'services', 'worksteps', 'extra'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              {tab === 'hero' ? 'Editar Hero' :
               tab === 'portfolio' ? 'Portafolio' :
               tab === 'services' ? 'Servicios' :
               tab === 'worksteps' ? 'Pasos de Trabajo' : 'Secciones Extra'}
            </button>
          ))}
        </nav>

        {/* Dashboard Panels */}
        <main className="bg-neutral-900/20 border border-neutral-800/60 rounded-2xl p-6 md:p-8 backdrop-blur-md">
          {activeTab === 'hero' && (
            <HeroForm
              heroData={heroData}
              token={token}
              setAlert={setAlert}
              uploadingField={uploadingField}
              setUploadingField={setUploadingField}
            />
          )}

          {activeTab === 'portfolio' && (
            <ProjectForm
              projects={projects}
              token={token}
              setAlert={setAlert}
              loadLandingContent={loadLandingContent}
              uploadingField={uploadingField}
              setUploadingField={setUploadingField}
            />
          )}

          {activeTab === 'services' && (
            <ServiceForm
              services={services}
              token={token}
              setAlert={setAlert}
              loadLandingContent={loadLandingContent}
              uploadingField={uploadingField}
              setUploadingField={setUploadingField}
            />
          )}

          {activeTab === 'worksteps' && (
            <WorkStepForm
              workSteps={workSteps}
              token={token}
              setAlert={setAlert}
              loadLandingContent={loadLandingContent}
            />
          )}

          {activeTab === 'extra' && (
            <InfoBlockForm
              infoBlocks={infoBlocks}
              token={token}
              setAlert={setAlert}
              loadLandingContent={loadLandingContent}
              uploadingField={uploadingField}
              setUploadingField={setUploadingField}
            />
          )}
        </main>
      </div>

      {/* Alerta de notificación flotante */}
      <AlertMessage
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: '', message: '' })}
      />
    </div>
  );
};

export default AdminDashboard;
