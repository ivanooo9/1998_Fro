import React, { useState, useEffect } from 'react';

// Subcomponente de Alerta Premium para mostrar éxitos y errores
const AlertMessage = ({ type, message, onClose }) => {
  if (!message) return null;
  const isError = type === 'error';
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-md transition-all duration-300 shadow-lg ${
      isError 
        ? 'bg-red-500/10 border-red-500/20 text-red-400' 
        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
    }`}>
      <div className={`w-2 h-2 rounded-full ${isError ? 'bg-red-500' : 'bg-emerald-500'} animate-pulse`} />
      <span className="text-sm font-medium">{message}</span>
      <button 
        onClick={onClose} 
        className="ml-4 hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

// Subcomponente reutilizable para Input con opción de subida a Cloudinary
const HashedUploadInput = ({ label, id, value, onChange, placeholder, fileAccept = "video/*,image/*", uploadingField, setUploadingField, setAlert, token }) => {
  const isUploading = uploadingField === id;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingField(id);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fallo al subir el archivo');
      }

      const data = await response.json();
      onChange({ target: { id, value: data.url } }); // Actualizar el input con la URL devuelta
      setAlert({ type: 'success', message: '¡Archivo subido y procesado exitosamente!' });
    } catch (err) {
      console.error(err);
      setAlert({ type: 'error', message: err.message || 'Error en la subida a Cloudinary' });
    } finally {
      setUploadingField(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-semibold text-white/60 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-grow bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
        />
        <label className={`shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 hover:border-white/20 text-white text-xs font-semibold cursor-pointer transition-all ${
          isUploading ? 'opacity-50 pointer-events-none' : ''
        }`}>
          {isUploading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Subiendo...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Subir
            </>
          )}
          <input
            type="file"
            accept={fileAccept}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export const AdminDashboard = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [activeTab, setActiveTab] = useState('hero');
  const [uploadingField, setUploadingField] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  // Estados para listas CRUD
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [infoBlocks, setInfoBlocks] = useState([]);

  // Estados de Edición
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingServiceId, setEditingServiceId] = useState(null);

  // Estados para Login
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Estados de los formularios
  const [heroForm, setHeroForm] = useState({
    seoTitle: '',
    videoDesktopUrl: '',
    videoTabletUrl: '',
    videoMobileUrl: '',
  });

  const [projectForm, setProjectForm] = useState({
    title: '',
    category: '',
    description: '',
    imageUrl: '',
    href: '',
    order: '',
  });

  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    bgVideoUrl: '',
    bgVideoMobileUrl: '',
    order: '',
  });

  const [infoBlockForm, setInfoBlockForm] = useState({
    identifier: '',
    title: '',
    description: '',
    imageUrl: '',
    buttonText: '',
    buttonLink: '',
  });

  // Carga de datos de la Landing Page
  const loadLandingContent = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/landing-content');
      if (!response.ok) throw new Error('Error al cargar contenido de la API');
      const data = await response.json();
      
      if (data.portfolio && data.portfolio.projects) {
        setProjects(data.portfolio.projects);
      }
      if (data.servicesMarquee && data.servicesMarquee.services) {
        setServices(data.servicesMarquee.services);
      }
      if (data.infoBlocks) {
        setInfoBlocks(data.infoBlocks);
      }
    } catch (err) {
      console.error('Error cargando contenidos:', err);
    }
  };

  useEffect(() => {
    loadLandingContent();
  }, []);

  // Manejadores genéricos de inputs
  const handleHeroChange = (e) => {
    const { id, value } = e.target;
    setHeroForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleProjectChange = (e) => {
    const { id, value } = e.target;
    setProjectForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleServiceChange = (e) => {
    const { id, value } = e.target;
    setServiceForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleInfoBlockChange = (e) => {
    const { id, value } = e.target;
    setInfoBlockForm((prev) => ({ ...prev, [id]: value }));
  };

  // Manejadores de Autenticación
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password) {
      setAlert({ type: 'error', message: 'Por favor, ingrese la contraseña maestra.' });
      return;
    }
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
    setPassword('');
    setAlert({ type: 'success', message: 'Sesión cerrada exitosamente.' });
  };

  // Envíos de formularios y operaciones CRUD
  const submitHero = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {};
      Object.keys(heroForm).forEach((key) => {
        if (heroForm[key].trim() !== '') {
          payload[key] = heroForm[key];
        }
      });

      const response = await fetch('http://localhost:3000/api/admin/hero', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar el Hero');
      }

      const data = await response.json();
      setAlert({ type: 'success', message: data.message || '¡Hero actualizado exitosamente!' });
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  // CRUD Proyectos
  const submitProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.category || !projectForm.imageUrl) {
      setAlert({ type: 'error', message: 'Los campos Título, Categoría e Imagen son obligatorios.' });
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...projectForm,
        order: projectForm.order ? parseInt(projectForm.order, 10) : undefined,
      };

      const url = editingProjectId 
        ? `http://localhost:3000/api/admin/portfolio/project/${editingProjectId}`
        : 'http://localhost:3000/api/admin/portfolio/project';
      const method = editingProjectId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar el proyecto');
      }

      const data = await response.json();
      setAlert({ 
        type: 'success', 
        message: data.message || (editingProjectId ? '¡Proyecto actualizado exitosamente!' : '¡Proyecto añadido exitosamente!') 
      });

      setProjectForm({
        title: '',
        category: '',
        description: '',
        imageUrl: '',
        href: '',
        order: '',
      });
      setEditingProjectId(null);
      loadLandingContent();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (type, id) => {
    const isProject = type === 'project';
    const typeLabel = isProject ? 'proyecto' : 'servicio';
    if (!window.confirm(`¿Estás seguro de que deseas eliminar este ${typeLabel}?`)) return;

    const url = isProject 
      ? `http://localhost:3000/api/admin/portfolio/project/${id}`
      : `http://localhost:3000/api/admin/services/service/${id}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error al eliminar el ${typeLabel}`);
      }

      const data = await response.json();
      setAlert({ type: 'success', message: data.message || `¡${isProject ? 'Proyecto' : 'Servicio'} eliminado exitosamente!` });
      loadLandingContent();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    }
  };

  const startEditProject = (project) => {
    setEditingProjectId(project.id);
    setProjectForm({
      title: project.title || '',
      category: project.category || '',
      description: project.description || '',
      imageUrl: project.imageUrl || '',
      href: project.href || '',
      order: project.order !== undefined && project.order !== null ? String(project.order) : '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditProject = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: '',
      category: '',
      description: '',
      imageUrl: '',
      href: '',
      order: '',
    });
  };

  // CRUD Servicios
  const submitService = async (e) => {
    e.preventDefault();
    if (!serviceForm.title || !serviceForm.description || !serviceForm.bgVideoUrl) {
      setAlert({ type: 'error', message: 'Los campos Título, Descripción y Video son obligatorios.' });
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...serviceForm,
        order: serviceForm.order ? parseInt(serviceForm.order, 10) : undefined,
      };

      const url = editingServiceId
        ? `http://localhost:3000/api/admin/services/service/${editingServiceId}`
        : 'http://localhost:3000/api/admin/services/service';
      const method = editingServiceId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar el servicio');
      }

      const data = await response.json();
      setAlert({ 
        type: 'success', 
        message: data.message || (editingServiceId ? '¡Servicio actualizado exitosamente!' : '¡Servicio añadido exitosamente!') 
      });

      setServiceForm({
        title: '',
        description: '',
        bgVideoUrl: '',
        bgVideoMobileUrl: '',
        order: '',
      });
      setEditingServiceId(null);
      loadLandingContent();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };


  const startEditService = (service) => {
    setEditingServiceId(service.id);
    setServiceForm({
      title: service.title || '',
      description: service.description || '',
      bgVideoUrl: service.bgVideoUrl || '',
      bgVideoMobileUrl: service.bgVideoMobileUrl || '',
      order: service.order !== undefined && service.order !== null ? String(service.order) : '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditService = () => {
    setEditingServiceId(null);
    setServiceForm({
      title: '',
      description: '',
      bgVideoUrl: '',
      bgVideoMobileUrl: '',
      order: '',
    });
  };

  // CRUD InfoBlock
  const submitInfoBlock = async (e) => {
    e.preventDefault();
    if (!infoBlockForm.identifier || !infoBlockForm.title || !infoBlockForm.description) {
      setAlert({ type: 'error', message: 'Los campos Identificador, Título y Descripción son obligatorios.' });
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`http://localhost:3000/api/admin/infoblock/${infoBlockForm.identifier}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: infoBlockForm.title,
          description: infoBlockForm.description,
          imageUrl: infoBlockForm.imageUrl || null,
          buttonText: infoBlockForm.buttonText || null,
          buttonLink: infoBlockForm.buttonLink || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar el bloque de información');
      }

      const data = await response.json();
      setAlert({ type: 'success', message: data.message || '¡Bloque de información guardado exitosamente!' });
      
      setInfoBlockForm({
        identifier: '',
        title: '',
        description: '',
        imageUrl: '',
        buttonText: '',
        buttonLink: '',
      });
      loadLandingContent();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const loadInfoBlockToForm = (block) => {
    setInfoBlockForm({
      identifier: block.identifier || '',
      title: block.title || '',
      description: block.description || '',
      imageUrl: block.imageUrl || '',
      buttonText: block.buttonText || '',
      buttonLink: block.buttonLink || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setAlert({ type: 'success', message: `Bloque "${block.identifier}" cargado en el formulario.` });
  };

  const loadInfoBlockByIdentifier = () => {
    const ident = infoBlockForm.identifier.trim();
    if (!ident) {
      setAlert({ type: 'error', message: 'Por favor ingrese un identificador para buscar.' });
      return;
    }
    const found = infoBlocks.find(b => b.identifier.toLowerCase() === ident.toLowerCase());
    if (found) {
      setInfoBlockForm({
        identifier: found.identifier || '',
        title: found.title || '',
        description: found.description || '',
        imageUrl: found.imageUrl || '',
        buttonText: found.buttonText || '',
        buttonLink: found.buttonLink || '',
      });
      setAlert({ type: 'success', message: `¡Bloque "${ident}" cargado correctamente!` });
    } else {
      setAlert({ type: 'error', message: `No se encontró ningún bloque con identificador "${ident}". Se creará uno nuevo al guardar.` });
    }
  };

  // Renderizado Condicional: Pantalla de Login Minimalista y Premium ("1998")
  if (!token) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-foreground font-sans flex flex-col items-center justify-center py-12 px-4 relative selection:bg-primary selection:text-primary-foreground">
        {/* Background radial soft light */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px]" />
        </div>

        <div className="w-full max-w-md z-10 bg-neutral-950/40 border border-neutral-800/80 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl font-display font-black text-white tracking-widest uppercase mb-2">
              1998
            </h1>
            <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase font-mono">
              Acceso Restringido / Admin
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="masterPassword" className="text-xs font-semibold text-white/50 uppercase tracking-widest font-mono">
                Contraseña Maestra
              </label>
              <input
                type="password"
                id="masterPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-neutral-900 border border-neutral-800/80 focus:border-white/20 text-white rounded-lg px-4 py-3 text-sm outline-none transition-all placeholder:text-neutral-700 text-center tracking-widest font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 text-xs font-bold uppercase tracking-widest rounded-lg transition-all font-mono"
            >
              {isLoggingIn ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  VALIDANDO...
                </>
              ) : (
                'INGRESAR'
              )}
            </button>
          </form>
        </div>

        {/* Alerta de notificación flotante */}
        <AlertMessage 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert({ type: '', message: '' })} 
        />
      </div>
    );
  }

  // Dashboard de Administración (Usuario Autenticado)
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
        <nav className="flex gap-1 bg-neutral-900/50 p-1.5 rounded-xl border border-neutral-900 mb-8 max-w-xl">
          <button
            onClick={() => setActiveTab('hero')}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === 'hero'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            Editar Hero
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === 'portfolio'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            Portafolio
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === 'services'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            Servicios
          </button>
          <button
            onClick={() => setActiveTab('extra')}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === 'extra'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            Secciones Extra
          </button>
        </nav>

        {/* Dashboard Panels */}
        <main className="bg-neutral-900/20 border border-neutral-800/60 rounded-2xl p-6 md:p-8 backdrop-blur-md">
          
          {/* TAB 1: HERO FORM */}
          {activeTab === 'hero' && (
            <form onSubmit={submitHero} className="flex flex-col gap-6">
              <div className="border-b border-neutral-800 pb-4">
                <h2 className="text-xl font-heading font-extrabold text-white">Editar Configuración del Hero</h2>
                <p className="text-xs text-white/50 mt-1">Los campos vacíos conservarán sus valores originales en la base de datos.</p>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="seoTitle" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Título SEO (Para indexadores y lectores de pantalla)
                </label>
                <input
                  type="text"
                  id="seoTitle"
                  value={heroForm.seoTitle}
                  onChange={handleHeroChange}
                  placeholder="Ej: 1998 - Agencia de Desarrollo Web..."
                  className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
                />
              </div>

              <HashedUploadInput
                label="Video de Escritorio (Desktop)"
                id="videoDesktopUrl"
                value={heroForm.videoDesktopUrl}
                onChange={handleHeroChange}
                placeholder="Ruta relativa o URL externa de Cloudinary"
                fileAccept="video/mp4"
                uploadingField={uploadingField}
                setUploadingField={setUploadingField}
                setAlert={setAlert}
                token={token}
              />

              <HashedUploadInput
                label="Video de Tableta (Tablet)"
                id="videoTabletUrl"
                value={heroForm.videoTabletUrl}
                onChange={handleHeroChange}
                placeholder="Ruta relativa o URL externa de Cloudinary"
                fileAccept="video/mp4"
                uploadingField={uploadingField}
                setUploadingField={setUploadingField}
                setAlert={setAlert}
                token={token}
              />

              <HashedUploadInput
                label="Video de Móvil (Mobile)"
                id="videoMobileUrl"
                value={heroForm.videoMobileUrl}
                onChange={handleHeroChange}
                placeholder="Ruta relativa o URL externa de Cloudinary"
                fileAccept="video/mp4"
                uploadingField={uploadingField}
                setUploadingField={setUploadingField}
                setAlert={setAlert}
                token={token}
              />

              <button
                type="submit"
                disabled={isSaving}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 text-sm font-bold uppercase rounded-lg transition-all"
              >
                {isSaving ? 'Guardando cambios...' : 'Actualizar Sección Hero'}
              </button>
            </form>
          )}

          {/* TAB 2: PORTFOLIO FORM */}
          {activeTab === 'portfolio' && (
            <div>
              <form onSubmit={submitProject} className="flex flex-col gap-6">
                <div className="border-b border-neutral-800 pb-4">
                  <h2 className="text-xl font-heading font-extrabold text-white">
                    {editingProjectId ? 'Editar Proyecto' : 'Añadir Nuevo Proyecto'}
                  </h2>
                  <p className="text-xs text-white/50 mt-1">
                    {editingProjectId ? 'Modifica los datos del proyecto seleccionado.' : 'Inserta un nuevo caso de estudio en el carrusel de proyectos.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                      Título del Proyecto
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={projectForm.title}
                      onChange={handleProjectChange}
                      placeholder="Ej: Secultura"
                      required
                      className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="category" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                      Categoría
                    </label>
                    <input
                      type="text"
                      id="category"
                      value={projectForm.category}
                      onChange={handleProjectChange}
                      placeholder="Ej: Plataforma Cultural"
                      required
                      className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                    Descripción Corta
                  </label>
                  <textarea
                    id="description"
                    value={projectForm.description}
                    onChange={handleProjectChange}
                    placeholder="Breve reseña del proyecto realizado..."
                    rows="3"
                    className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all resize-none placeholder:text-neutral-600"
                  />
                </div>

                <HashedUploadInput
                  label="Imagen de Portada (Image Url)"
                  id="imageUrl"
                  value={projectForm.imageUrl}
                  onChange={handleProjectChange}
                  placeholder="Enlace de la imagen o súbela a Cloudinary"
                  fileAccept="image/*"
                  uploadingField={uploadingField}
                  setUploadingField={setUploadingField}
                  setAlert={setAlert}
                  token={token}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="href" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                      Enlace de Destino (HREF)
                    </label>
                    <input
                      type="text"
                      id="href"
                      value={projectForm.href}
                      onChange={handleProjectChange}
                      placeholder="Ej: https://secultura.net/"
                      className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="order" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                      Orden de Visualización
                    </label>
                    <input
                      type="number"
                      id="order"
                      value={projectForm.order}
                      onChange={handleProjectChange}
                      placeholder="Ej: 1"
                      className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-grow flex items-center justify-center gap-2 py-3 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 text-sm font-bold uppercase rounded-lg transition-all"
                  >
                    {isSaving ? 'Guardando...' : (editingProjectId ? 'Guardar Cambios' : 'Añadir Proyecto al Portafolio')}
                  </button>
                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={cancelEditProject}
                      className="px-6 py-3 bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-850 text-sm font-bold uppercase rounded-lg transition-all"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>

              {/* LISTA DE PROYECTOS EXISTENTES */}
              <div className="mt-12 border-t border-neutral-800/80 pt-8">
                <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider font-mono">Proyectos Existentes</h3>
                {projects.length === 0 ? (
                  <p className="text-sm text-white/40 font-mono">No hay proyectos registrados.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {projects.map((project) => (
                      <div key={project.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-neutral-950/40 border border-neutral-800/80 rounded-xl gap-4 hover:border-white/10 transition-all">
                        <div className="flex items-center gap-4">
                          {project.imageUrl ? (
                            <img src={project.imageUrl} alt={project.title} className="w-16 h-12 object-cover rounded-lg border border-neutral-800" />
                          ) : (
                            <div className="w-16 h-12 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center text-xs text-white/20 font-mono">Sin img</div>
                          )}
                          <div>
                            <h4 className="font-bold text-white text-sm">{project.title}</h4>
                            <p className="text-xs text-white/50">{project.category}</p>
                            {project.order !== undefined && (
                              <span className="text-[10px] bg-neutral-800 text-white/60 px-2 py-0.5 rounded font-mono mt-1 inline-block">Orden: {project.order}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto justify-end">
                          <button
                            type="button"
                            onClick={() => startEditProject(project)}
                            className="px-3 py-1.5 bg-neutral-900 border border-neutral-850 hover:bg-neutral-850 text-white/80 hover:text-white rounded-lg text-xs font-semibold transition-all font-mono"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete('project', project.id)}
                            className="px-3 py-1.5 bg-red-950/10 border border-red-950 hover:bg-red-950/20 text-red-400 hover:text-red-300 rounded-lg text-xs font-semibold transition-all font-mono"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SERVICES FORM */}
          {activeTab === 'services' && (
            <div>
              <form onSubmit={submitService} className="flex flex-col gap-6">
                <div className="border-b border-neutral-800 pb-4">
                  <h2 className="text-xl font-heading font-extrabold text-white">
                    {editingServiceId ? 'Editar Servicio' : 'Añadir Nuevo Servicio'}
                  </h2>
                  <p className="text-xs text-white/50 mt-1">
                    {editingServiceId ? 'Modifica los datos del servicio seleccionado.' : 'Crea una nueva tarjeta de servicio interactiva en el scroll infinito.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                      Título del Servicio
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={serviceForm.title}
                      onChange={handleServiceChange}
                      placeholder="Ej: 1. Web & App"
                      required
                      className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="order" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                      Orden de Visualización
                    </label>
                    <input
                      type="number"
                      id="order"
                      value={serviceForm.order}
                      onChange={handleServiceChange}
                      placeholder="Ej: 1"
                      className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    value={serviceForm.description}
                    onChange={handleServiceChange}
                    placeholder="Describe la solución brindada en el servicio..."
                    rows="3"
                    required
                    className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all resize-none placeholder:text-neutral-600"
                  />
                </div>

                <HashedUploadInput
                  label="Video de Fondo (Desktop Video Url)"
                  id="bgVideoUrl"
                  value={serviceForm.bgVideoUrl}
                  onChange={handleServiceChange}
                  placeholder="Ruta del video o súbelo a Cloudinary"
                  fileAccept="video/mp4"
                  uploadingField={uploadingField}
                  setUploadingField={setUploadingField}
                  setAlert={setAlert}
                  token={token}
                />

                <HashedUploadInput
                  label="Video de Fondo Móvil (Mobile Video Url)"
                  id="bgVideoMobileUrl"
                  value={serviceForm.bgVideoMobileUrl}
                  onChange={handleServiceChange}
                  placeholder="Ruta del video móvil o súbelo a Cloudinary (opcional)"
                  fileAccept="video/mp4"
                  uploadingField={uploadingField}
                  setUploadingField={setUploadingField}
                  setAlert={setAlert}
                  token={token}
                />

                <div className="flex gap-4 mt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-grow flex items-center justify-center gap-2 py-3 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 text-sm font-bold uppercase rounded-lg transition-all"
                  >
                    {isSaving ? 'Guardando...' : (editingServiceId ? 'Guardar Cambios' : 'Añadir Servicio a la Sección')}
                  </button>
                  {editingServiceId && (
                    <button
                      type="button"
                      onClick={cancelEditService}
                      className="px-6 py-3 bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-850 text-sm font-bold uppercase rounded-lg transition-all"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>

              {/* LISTA DE SERVICIOS EXISTENTES */}
              <div className="mt-12 border-t border-neutral-800/80 pt-8">
                <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider font-mono">Servicios Existentes</h3>
                {services.length === 0 ? (
                  <p className="text-sm text-white/40 font-mono">No hay servicios registrados.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {services.map((service) => (
                      <div key={service.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-neutral-950/40 border border-neutral-800/80 rounded-xl gap-4 hover:border-white/10 transition-all">
                        <div>
                          <h4 className="font-bold text-white text-sm">{service.title}</h4>
                          <p className="text-xs text-white/50 line-clamp-1 mt-0.5">{service.description}</p>
                          {service.order !== undefined && (
                            <span className="text-[10px] bg-neutral-800 text-white/60 px-2 py-0.5 rounded font-mono mt-1.5 inline-block">Orden: {service.order}</span>
                          )}
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto justify-end shrink-0">
                          <button
                            type="button"
                            onClick={() => startEditService(service)}
                            className="px-3 py-1.5 bg-neutral-900 border border-neutral-850 hover:bg-neutral-850 text-white/80 hover:text-white rounded-lg text-xs font-semibold transition-all font-mono"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete('service', service.id)}
                            className="px-3 py-1.5 bg-red-950/10 border border-red-950 hover:bg-red-950/20 text-red-400 hover:text-red-300 rounded-lg text-xs font-semibold transition-all font-mono"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: EXTRA SECTIONS (INFOBLOCKS) */}
          {activeTab === 'extra' && (
            <form onSubmit={submitInfoBlock} className="flex flex-col gap-6">
              <div className="border-b border-neutral-800 pb-4">
                <h2 className="text-xl font-heading font-extrabold text-white">Gestionar Bloques de Información (InfoBlock)</h2>
                <p className="text-xs text-white/50 mt-1">Crea o actualiza bloques informativos genéricos (ej: 'nosotros', 'cta').</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="identifier" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                    Identificador Único del Bloque (Identifier)
                  </label>
                  <input
                    type="text"
                    id="identifier"
                    value={infoBlockForm.identifier}
                    onChange={handleInfoBlockChange}
                    placeholder="Ej: nosotros, cta, servicios-intro"
                    required
                    className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600 font-mono"
                  />
                </div>
                <button
                  type="button"
                  onClick={loadInfoBlockByIdentifier}
                  className="w-full py-2.5 bg-neutral-900 border border-neutral-800 hover:bg-neutral-850 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all font-mono h-[42px]"
                >
                  Buscar / Cargar
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Título del Bloque
                </label>
                <input
                  type="text"
                  id="title"
                  value={infoBlockForm.title}
                  onChange={handleInfoBlockChange}
                  placeholder="Ej: Sobre Nosotros"
                  required
                  className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Contenido / Descripción
                </label>
                <textarea
                  id="description"
                  value={infoBlockForm.description}
                  onChange={handleInfoBlockChange}
                  placeholder="Escribe el texto principal de este bloque..."
                  rows="4"
                  required
                  className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all resize-none placeholder:text-neutral-600"
                />
              </div>

              <HashedUploadInput
                label="Imagen del Bloque (Image Url)"
                id="imageUrl"
                value={infoBlockForm.imageUrl}
                onChange={handleInfoBlockChange}
                placeholder="Enlace de la imagen o súbela a Cloudinary"
                fileAccept="image/*"
                uploadingField={uploadingField}
                setUploadingField={setUploadingField}
                setAlert={setAlert}
                token={token}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="buttonText" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                    Texto del Botón (Opcional)
                  </label>
                  <input
                    type="text"
                    id="buttonText"
                    value={infoBlockForm.buttonText}
                    onChange={handleInfoBlockChange}
                    placeholder="Ej: Saber Más"
                    className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="buttonLink" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                    Enlace del Botón (Opcional)
                  </label>
                  <input
                    type="text"
                    id="buttonLink"
                    value={infoBlockForm.buttonLink}
                    onChange={handleInfoBlockChange}
                    placeholder="Ej: /nosotros"
                    className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-grow flex items-center justify-center gap-2 py-3 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 text-sm font-bold uppercase rounded-lg transition-all"
                >
                  {isSaving ? 'Guardando Bloque...' : 'Guardar Bloque de Información'}
                </button>
              </div>

              {/* LISTA DE INFOBLOCKS EXISTENTES */}
              <div className="mt-12 border-t border-neutral-800/80 pt-8">
                <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider font-mono">Bloques Existentes</h3>
                {infoBlocks.length === 0 ? (
                  <p className="text-sm text-white/40 font-mono">No hay bloques de información registrados.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {infoBlocks.map((block) => (
                      <div key={block.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-neutral-950/40 border border-neutral-800/80 rounded-xl gap-4 hover:border-white/10 transition-all">
                        <div className="flex items-center gap-4">
                          {block.imageUrl ? (
                            <img src={block.imageUrl} alt={block.title} className="w-16 h-12 object-cover rounded-lg border border-neutral-800" />
                          ) : (
                            <div className="w-16 h-12 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center text-xs text-white/20 font-mono">Sin img</div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-white text-sm">{block.title}</h4>
                              <span className="text-[9px] bg-white/10 text-white/80 px-1.5 py-0.5 rounded font-mono">{block.identifier}</span>
                            </div>
                            <p className="text-xs text-white/50 line-clamp-1 mt-0.5">{block.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto justify-end">
                          <button
                            type="button"
                            onClick={() => loadInfoBlockToForm(block)}
                            className="px-3 py-1.5 bg-neutral-900 border border-neutral-850 hover:bg-neutral-850 text-white/80 hover:text-white rounded-lg text-xs font-semibold transition-all font-mono"
                          >
                            Cargar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
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
