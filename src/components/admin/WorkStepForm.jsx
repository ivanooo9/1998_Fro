import React, { useState, useEffect } from 'react';
import { IconPicker } from '../IconPicker';
import { API_BASE_URL } from '../../config/api';

export const WorkStepForm = ({ 
  workSteps, 
  workStepsHeader,
  token, 
  setAlert, 
  loadLandingContent 
}) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    iconClass: '',
    order: '',
  });

  const [headerForm, setHeaderForm] = useState({
    title: '',
    description: '',
  });

  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingHeader, setIsSavingHeader] = useState(false);

  useEffect(() => {
    if (workStepsHeader) {
      setHeaderForm({
        title: workStepsHeader.title || '',
        description: workStepsHeader.description || '',
      });
    }
  }, [workStepsHeader]);

  const handleHeaderSubmit = async (e) => {
    e.preventDefault();
    if (!headerForm.title || !headerForm.description) {
      setAlert({ type: 'error', message: 'El título y la descripción de la cabecera son obligatorios.' });
      return;
    }
    setIsSavingHeader(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/worksteps/header`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(headerForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar la cabecera');
      }

      const data = await response.json();
      setAlert({ type: 'success', message: data.message || '¡Cabecera actualizada exitosamente!' });
      loadLandingContent();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setIsSavingHeader(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const startEdit = (step) => {
    setEditingId(step.id);
    setForm({
      title: step.title || '',
      description: step.description || '',
      iconClass: step.iconClass || '',
      order: step.order !== undefined && step.order !== null ? String(step.order) : '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      title: '',
      description: '',
      iconClass: '',
      order: '',
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.iconClass) {
      setAlert({ type: 'error', message: 'Los campos Título, Descripción e Icono son obligatorios.' });
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...form,
        order: form.order ? parseInt(form.order, 10) : undefined,
      };

      const url = editingId
        ? `${API_BASE_URL}/api/admin/worksteps/${editingId}`
        : `${API_BASE_URL}/api/admin/worksteps`;
      const method = editingId ? 'PUT' : 'POST';

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
        message: data.message || (editingId ? '¡Paso de trabajo actualizado exitosamente!' : '¡Paso de trabajo añadido exitosamente!')
      });

      cancelEdit();
      loadLandingContent();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const initializeDefaults = async () => {
    setIsSaving(true);
    try {
      const defaults = [
        { title: "1. Diagnóstico", description: "Analizamos tu presencia digital actual y definimos la estrategia ideal.", iconClass: "bi bi-search", order: 1 },
        { title: "2. Diseño & Desarrollo", description: "Creamos y programamos una experiencia premium a medida.", iconClass: "bi bi-code-slash", order: 2 },
        { title: "3. Despegue", description: "Lanzamos el producto al mercado con optimización SEO extrema.", iconClass: "bi bi-rocket", order: 3 }
      ];

      const toAdd = defaults.slice(workSteps.length);

      for (const step of toAdd) {
        const response = await fetch(`${API_BASE_URL}/api/admin/worksteps`, {
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

  return (
    <div>
      <div className="border-b border-neutral-800 pb-4 mb-6">
        <h2 className="text-xl font-heading font-extrabold text-white">
          {workStepsHeader?.title || "¿Cómo trabajamos?"}
        </h2>
        <p className="text-xs text-white/50 mt-1">
          {workStepsHeader?.description || "El diseño de la página requiere exactamente 3 tarjetas para mantener la estructura correcta."}
        </p>
      </div>

      {/* Formulario de Cabecera de Sección */}
      <form onSubmit={handleHeaderSubmit} className="flex flex-col gap-4 mb-8 p-5 bg-neutral-950/40 border border-neutral-800/80 rounded-2xl backdrop-blur-md">
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider font-mono">Editar Cabecera de la Sección</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="headerTitle" className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Título de la Sección</label>
            <input
              type="text"
              id="headerTitle"
              value={headerForm.title}
              onChange={(e) => setHeaderForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="¿Cómo trabajamos?"
              className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-3 py-2 text-xs outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="headerDescription" className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Descripción / Subtítulo</label>
            <input
              type="text"
              id="headerDescription"
              value={headerForm.description}
              onChange={(e) => setHeaderForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Rápido, claro y enfocado en resultados."
              className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-3 py-2 text-xs outline-none transition-all"
            />
          </div>
        </div>
        <div className="flex justify-end mt-1">
          <button
            type="submit"
            disabled={isSavingHeader}
            className="px-5 py-2 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 text-xs font-bold uppercase rounded-lg transition-all"
          >
            {isSavingHeader ? 'Guardando...' : 'Actualizar Cabecera de Sección'}
          </button>
        </div>
      </form>

      {/* Botón de Inicialización si faltan tarjetas */}
      {workSteps.length < 3 && (
        <div className="mb-6 p-5 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-md">
          <div>
            <h4 className="font-bold text-sm text-amber-400">Error de Layout: Se requieren exactamente 3 tarjetas</h4>
            <p className="text-xs text-amber-200/70 mt-1">Actualmente hay {workSteps.length} tarjeta(s). Inicializa los pasos por defecto para corregir el grid de la Landing Page.</p>
          </div>
          <button
            type="button"
            onClick={initializeDefaults}
            disabled={isSaving}
            className="shrink-0 px-4 py-2 bg-amber-500 text-black hover:bg-amber-400 disabled:opacity-50 text-xs font-bold uppercase rounded-lg transition-all"
          >
            {isSaving ? 'Inicializando...' : 'Inicializar 3 pasos por defecto'}
          </button>
        </div>
      )}

      {/* Formulario / Mensaje Condicional */}
      {!editingId && workSteps.length >= 3 ? (
        <div className="p-5 rounded-xl border border-primary/30 bg-primary/10 text-primary-foreground text-sm font-semibold flex items-center gap-3 mb-8">
          <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Límite de 3 tarjetas alcanzado. Por favor, utiliza el botón Editar de abajo para modificar las existentes.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-6 mb-12 p-6 bg-neutral-950/20 border border-neutral-800/60 rounded-2xl backdrop-blur-md">
          <div className="border-b border-neutral-800 pb-3">
            <h3 className="text-md font-bold text-white uppercase tracking-wider font-mono">
              {editingId ? 'Editar Paso de Trabajo' : 'Añadir Nuevo Paso de Trabajo'}
            </h3>
            <p className="text-xs text-white/50 mt-0.5">
              {editingId 
                ? 'Modifica los detalles del paso seleccionado a continuación.' 
                : 'Crea un nuevo paso para la sección ¿Cómo trabajamos?.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-xs font-semibold text-white/60 uppercase tracking-wider">Título del Paso</label>
              <input type="text" id="title" value={form.title} onChange={handleChange} required className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Icono del Paso</label>
              <IconPicker
                value={form.iconClass}
                onChange={(className) => setForm(prev => ({ ...prev, iconClass: className }))}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-xs font-semibold text-white/60 uppercase tracking-wider">Descripción</label>
            <textarea id="description" value={form.description} onChange={handleChange} rows="3" required className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all resize-none" />
          </div>

          <div className="flex gap-4">
            <button type="submit" disabled={isSaving} className="flex-grow flex items-center justify-center py-3 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 text-sm font-bold uppercase rounded-lg transition-all">
              {isSaving ? 'Guardando...' : (editingId ? 'Guardar Cambios' : 'Añadir Paso de Trabajo')}
            </button>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="px-6 py-3 bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-850 text-sm font-bold uppercase rounded-lg transition-all">
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
                  <button type="button" onClick={() => startEdit(step)} className="px-5 py-2 bg-neutral-900 border border-neutral-850 hover:bg-neutral-850 text-white/80 hover:text-white rounded-lg text-xs font-bold uppercase transition-all">
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkStepForm;
