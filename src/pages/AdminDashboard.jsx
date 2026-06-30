import React, { useState, useEffect } from 'react';
import { IconPicker } from '../components/IconPicker';

// Subcomponente de Alerta Premium para mostrar éxitos y errores
const AlertMessage = ({ type, message, onClose }) => {
  if (!message) return null;
  const isError = type === 'error';
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-md transition-all duration-300 shadow-lg ${isError
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
        <label className={`shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 hover:border-white/20 text-white text-xs font-semibold cursor-pointer transition-all ${isUploading ? 'opacity-50 pointer-events-none' : ''
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
  const [workSteps, setWorkSteps] = useState([]);

  // Estados de Edición
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editingWorkStepId, setEditingWorkStepId] = useState(null);

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

  const [workStepForm, setWorkStepForm] = useState({
    title: '',
    description: '',
    iconClass: '',
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

  const handleWorkStepChange = (e) => {
    const { id, value } = e.target;
    setWorkStepForm((prev) => ({ ...prev, [id]: value }));
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
    const isService = type === 'service';
    const isWorkStep = type === 'workstep';

    let typeLabel = '';
    if (isProject) typeLabel = 'proyecto';
    else if (isService) typeLabel = 'servicio';
    else if (isWorkStep) typeLabel = 'paso de trabajo';

    if (!window.confirm(`¿Estás seguro de que deseas eliminar este ${typeLabel}?`)) return;

    let url = '';
    if (isProject) {
      url = `http://localhost:3000/api/admin/portfolio/project/${id}`;
    } else if (isService) {
      url = `http://localhost:3000/api/admin/services/service/${id}`;
    } else if (isWorkStep) {
      url = `http://localhost:3000/api/admin/worksteps/${id}`;
    }

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
      setAlert({
        type: 'success',
        message: data.message || `¡${isProject ? 'Proyecto' : isService ? 'Servicio' : 'Paso de trabajo'} eliminado exitosamente!`
      });
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

  // CRUD Pasos de Trabajo (WorkSteps)
  const submitWorkStep = async (e) => {
    e.preventDefault();
    if (!workStepForm.title || !workStepForm.description || !workStepForm.iconClass) {
      setAlert({ type: 'error', message: 'Los campos Título, Descripción e Icono son obligatorios.' });
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...workStepForm,
        order: workStepForm.order ? parseInt(workStepForm.order, 10) : undefined,
      };

      const url = editingWorkStepId
        ? `http://localhost:3000/api/admin/worksteps/${editingWorkStepId}`
        : 'http://localhost:3000/api/admin/worksteps';
      const method = editingWorkStepId ? 'PUT' : 'POST';

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
        throw new Error(errorData.error || 'Error al guardar el paso de trabajo');
      }

      const data = await response.json();
      setAlert({
        type: 'success',
        message: data.message || (editingWorkStepId ? '¡Paso de trabajo actualizado exitosamente!' : '¡Paso de trabajo añadido exitosamente!')
      });

      setWorkStepForm({
        title: '',
        description: '',
        iconClass: '',
        order: '',
      });
      setEditingWorkStepId(null);
      loadLandingContent();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const startEditWorkStep = (step) => {
    setEditingWorkStepId(step.id);
    setWorkStepForm({
      title: step.title || '',
      description: step.description || '',
      iconClass: step.iconClass || '',
      order: step.order !== undefined && step.order !== null ? String(step.order) : '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditWorkStep = () => {
    setEditingWorkStepId(null);
    setWorkStepForm({
      title: '',
      description: '',
      iconClass: '',
      order: '',
    });
  };

  const initializeDefaultWorkSteps = async () => {
    setIsSaving(true);
    try {
      const defaults = [
        { title: "1. Diagnóstico", description: "Analizamos tu presencia digital actual y definimos la estrategia ideal.", iconClass: "bi bi-search", order: 1 },
        { title: "2. Diseño & Desarrollo", description: "Creamos y programamos una experiencia premium a medida.", iconClass: "bi bi-code-slash", order: 2 },
        { title: "3. Despegue", description: "Lanzamos el producto al mercado con optimización SEO extrema.", iconClass: "bi bi-rocket", order: 3 }
      ];

      const toAdd = defaults.slice(workSteps.length);

      for (const step of toAdd) {
        const response = await fetch('http://localhost:3000/api/admin/worksteps', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(step)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al inicializar paso');
        }
      }

      setAlert({ type: 'success', message: '¡Pasos de trabajo inicializados correctamente!' });
      loadLandingContent();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
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

  const handleSelectInfoBlock = (e) => {
    const selectedValue = e.target.value;
    if (!selectedValue) {
      setInfoBlockForm({
        identifier: '',
        title: '',
        description: '',
        imageUrl: '',
        buttonText: '',
        buttonLink: '',
      });
      return;
    }

    const found = infoBlocks.find(b => b.identifier.toLowerCase() === selectedValue.toLowerCase());
    if (found) {
      setInfoBlockForm({
        identifier: found.identifier || '',
        title: found.title || '',
        description: found.description || '',
        imageUrl: found.imageUrl || '',
        buttonText: found.buttonText || '',
        buttonLink: found.buttonLink || '',
      });
      setAlert({ type: 'success', message: `Sección "${selectedValue}" cargada correctamente.` });
    } else {
      setInfoBlockForm({
        identifier: selectedValue,
        title: '',
        description: '',
        imageUrl: '',
        buttonText: '',
        buttonLink: '',
      });
    }
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
        <nav className="flex gap-1 bg-neutral-900/50 p-1.5 rounded-xl border border-neutral-900 mb-8 max-w-2xl">
          <button
            onClick={() => setActiveTab('hero')}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'hero'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-white/40 hover:text-white/80'
              }`}
          >
            Editar Hero
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'portfolio'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-white/40 hover:text-white/80'
              }`}
          >
            Portafolio
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'services'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-white/40 hover:text-white/80'
              }`}
          >
            Servicios
          </button>
          <button
            onClick={() => setActiveTab('worksteps')}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'worksteps'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-white/40 hover:text-white/80'
              }`}
          >
            Pasos de Trabajo
          </button>
          <button
            onClick={() => setActiveTab('extra')}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'extra'
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
                <h2 className="text-xl font-heading font-extrabold text-white">Gestionar Secciones Visuales</h2>
                <p className="text-xs text-white/50 mt-1">Edita los textos e imágenes de las secciones predefinidas del diseño.</p>
              </div>

              {/* MENÚ DESPLEGABLE ESTRICTO */}
              <div className="flex flex-col gap-2">
                <label htmlFor="identifier" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Selecciona la Sección a Editar
                </label>
                <div className="relative">
                  <select
                    id="identifier"
                    value={infoBlockForm.identifier}
                    onChange={(e) => {
                      const ident = e.target.value;
                      handleInfoBlockChange(e);
                      const found = infoBlocks.find(b => b.identifier === ident);
                      if (found) {
                        setInfoBlockForm({
                          identifier: found.identifier,
                          title: found.title || '',
                          description: found.description || '',
                          imageUrl: found.imageUrl || '',
                          buttonText: found.buttonText || '',
                          buttonLink: found.buttonLink || '',
                        });
                        setAlert({ type: 'success', message: `¡Datos de la sección cargados listos para editar!` });
                      } else {
                        setInfoBlockForm(prev => ({
                          ...prev, identifier: ident, title: '', description: '', imageUrl: '', buttonText: '', buttonLink: ''
                        }));
                      }
                    }}
                    required
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-3 text-sm outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>-- Haz clic aquí para elegir una sección --</option>
                    <option value="marketing">Sección: "No somos una empresa cualquiera"</option>
                    <option value="showcase">Sección: "Impulsa tu Marca" (Video Final)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-white/50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-xs font-semibold text-white/60 uppercase tracking-wider">Título de la Sección</label>
                <input type="text" id="title" value={infoBlockForm.title} onChange={handleInfoBlockChange} required className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-xs font-semibold text-white/60 uppercase tracking-wider">Texto / Descripción</label>
                <textarea id="description" value={infoBlockForm.description} onChange={handleInfoBlockChange} rows="4" required className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all resize-none" />
              </div>

              <HashedUploadInput label="Imagen o Video (Reemplaza el fondo)" id="imageUrl" value={infoBlockForm.imageUrl} onChange={handleInfoBlockChange} placeholder="Sube el archivo a Cloudinary..." fileAccept="image/*,video/mp4" uploadingField={uploadingField} setUploadingField={setUploadingField} setAlert={setAlert} token={token} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="buttonText" className="text-xs font-semibold text-white/60 uppercase tracking-wider">Texto del Botón (Opcional)</label>
                  <input type="text" id="buttonText" value={infoBlockForm.buttonText} onChange={handleInfoBlockChange} className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="buttonLink" className="text-xs font-semibold text-white/60 uppercase tracking-wider">Enlace del Botón (Opcional)</label>
                  <input type="text" id="buttonLink" value={infoBlockForm.buttonLink} onChange={handleInfoBlockChange} className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all" />
                </div>
              </div>

              <button type="submit" disabled={isSaving || !infoBlockForm.identifier} className="w-full flex items-center justify-center py-3 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 text-sm font-bold uppercase rounded-lg transition-all mt-4">
                {isSaving ? 'Guardando Cambios...' : 'Guardar Sección'}
              </button>
            </form>
          )}

          {/* TAB 5: WORKSTEPS FORM */}
          {activeTab === 'worksteps' && (
            <div>
              <div className="border-b border-neutral-800 pb-4 mb-6">
                <h2 className="text-xl font-heading font-extrabold text-white">¿Cómo trabajamos?</h2>
                <p className="text-xs text-white/50 mt-1">El diseño de la página requiere exactamente 3 tarjetas para mantener la estructura correcta.</p>
              </div>

              {/* Botón de Inicialización si faltan tarjetas */}
              {workSteps.length < 3 && (
                <div className="mb-6 p-5 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-md">
                  <div>
                    <h4 className="font-bold text-sm text-amber-400">Error de Layout: Se requieren exactamente 3 tarjetas</h4>
                    <p className="text-xs text-amber-200/70 mt-1">Actualmente hay {workSteps.length} tarjeta(s). Inicializa los pasos por defecto para corregir el grid de la Landing Page.</p>
                  </div>
                  <button
                    type="button"
                    onClick={initializeDefaultWorkSteps}
                    disabled={isSaving}
                    className="shrink-0 px-4 py-2 bg-amber-500 text-black hover:bg-amber-400 disabled:opacity-50 text-xs font-bold uppercase rounded-lg transition-all"
                  >
                    {isSaving ? 'Inicializando...' : 'Inicializar 3 pasos por defecto'}
                  </button>
                </div>
              )}

              {/* Formulario / Mensaje Condicional */}
              {!editingWorkStepId && workSteps.length >= 3 ? (
                <div className="p-5 rounded-xl border border-primary/30 bg-primary/10 text-primary-foreground text-sm font-semibold flex items-center gap-3 mb-8">
                  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Límite de 3 tarjetas alcanzado. Por favor, utiliza el botón Editar de abajo para modificar las existentes.
                </div>
              ) : (
                <form onSubmit={submitWorkStep} className="flex flex-col gap-6 mb-12 p-6 bg-neutral-950/20 border border-neutral-800/60 rounded-2xl backdrop-blur-md">
                  <div className="border-b border-neutral-800 pb-3">
                    <h3 className="text-md font-bold text-white uppercase tracking-wider font-mono">
                      {editingWorkStepId ? 'Editar Paso de Trabajo' : 'Añadir Nuevo Paso de Trabajo'}
                    </h3>
                    <p className="text-xs text-white/50 mt-0.5">
                      {editingWorkStepId 
                        ? 'Modifica los detalles del paso seleccionado a continuación.' 
                        : 'Crea un nuevo paso para la sección ¿Cómo trabajamos?.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="title" className="text-xs font-semibold text-white/60 uppercase tracking-wider">Título del Paso</label>
                      <input type="text" id="title" value={workStepForm.title} onChange={handleWorkStepChange} required className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Icono del Paso</label>
                      <IconPicker
                        value={workStepForm.iconClass}
                        onChange={(className) => setWorkStepForm(prev => ({ ...prev, iconClass: className }))}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="text-xs font-semibold text-white/60 uppercase tracking-wider">Descripción</label>
                    <textarea id="description" value={workStepForm.description} onChange={handleWorkStepChange} rows="3" required className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all resize-none" />
                  </div>

                  <div className="flex gap-4">
                    <button type="submit" disabled={isSaving} className="flex-grow flex items-center justify-center py-3 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 text-sm font-bold uppercase rounded-lg transition-all">
                      {isSaving ? 'Guardando...' : (editingWorkStepId ? 'Guardar Cambios' : 'Añadir Paso de Trabajo')}
                    </button>
                    {editingWorkStepId && (
                      <button type="button" onClick={cancelEditWorkStep} className="px-6 py-3 bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-850 text-sm font-bold uppercase rounded-lg transition-all">
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
              )}

              {/* LISTA DE PASOS EXISTENTES */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider font-mono">Pasos Existentes (Máximo 3)</h3>
                {workSteps.length === 0 ? (
                  <p className="text-sm text-white/40 font-mono">No hay pasos de trabajo registrados. Por favor haz clic en el botón de inicialización.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {workSteps.map((step) => (
                      <div key={step.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-neutral-950/40 border border-neutral-800/80 rounded-xl gap-4 hover:border-white/10 transition-all">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white/60"><i className={step.iconClass}></i></span>
                            <h4 className="font-bold text-white text-sm">{step.title}</h4>
                          </div>
                          <p className="text-xs text-white/50 mt-1">{step.description}</p>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto justify-end shrink-0">
                          <button type="button" onClick={() => startEditWorkStep(step)} className="px-5 py-2 bg-neutral-900 border border-neutral-850 hover:bg-neutral-850 text-white/80 hover:text-white rounded-lg text-xs font-bold uppercase transition-all">
                            Editar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
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
