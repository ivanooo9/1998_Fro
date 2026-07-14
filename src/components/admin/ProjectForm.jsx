import React, { useState } from 'react';
import HashedUploadInput from './HashedUploadInput';
import { API_BASE_URL } from '../../config/api';

export const ProjectForm = ({ 
  projects, 
  token, 
  setAlert, 
  loadLandingContent, 
  uploadingField, 
  setUploadingField 
}) => {
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    imageUrl: '',
    href: '',
    order: '',
  });

  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const startEdit = (project) => {
    setEditingId(project.id);
    setForm({
      title: project.title || '',
      category: project.category || '',
      description: project.description || '',
      imageUrl: project.imageUrl || '',
      href: project.href || '',
      order: project.order !== undefined && project.order !== null ? String(project.order) : '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      title: '',
      category: '',
      description: '',
      imageUrl: '',
      href: '',
      order: '',
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.imageUrl) {
      setAlert({ type: 'error', message: 'Los campos Título, Categoría e Imagen son obligatorios.' });
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...form,
        order: form.order ? parseInt(form.order, 10) : undefined,
      };

      const url = editingId
        ? `${API_BASE_URL}/api/admin/portfolio/project/${editingId}`
        : `${API_BASE_URL}/api/admin/portfolio/project`;
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
        throw new Error(errorData.error || 'Error al guardar el proyecto');
      }

      const data = await response.json();
      setAlert({
        type: 'success',
        message: data.message || (editingId ? '¡Proyecto actualizado exitosamente!' : '¡Proyecto añadido exitosamente!')
      });

      cancelEdit();
      loadLandingContent();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/portfolio/project/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar el proyecto');
      }

      const data = await response.json();
      setAlert({
        type: 'success',
        message: data.message || '¡Proyecto eliminado exitosamente!'
      });
      loadLandingContent();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="border-b border-neutral-800 pb-4">
          <h2 className="text-xl font-heading font-extrabold text-white">
            {editingId ? 'Editar Proyecto' : 'Añadir Nuevo Proyecto'}
          </h2>
          <p className="text-xs text-white/50 mt-1">
            {editingId ? 'Modifica los datos del proyecto seleccionado.' : 'Inserta un nuevo caso de estudio en el carrusel de proyectos.'}
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
              value={form.title}
              onChange={handleChange}
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
              value={form.category}
              onChange={handleChange}
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
            value={form.description}
            onChange={handleChange}
            placeholder="Breve reseña del proyecto realizado..."
            rows="3"
            className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all resize-none placeholder:text-neutral-600"
          />
        </div>

        <HashedUploadInput
          label="Imagen de Portada (Image Url)"
          id="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
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
              value={form.href}
              onChange={handleChange}
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
              value={form.order}
              onChange={handleChange}
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
            {isSaving ? 'Guardando...' : (editingId ? 'Guardar Cambios' : 'Añadir Proyecto al Portafolio')}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
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
                    onClick={() => startEdit(project)}
                    className="px-3 py-1.5 bg-neutral-900 border border-neutral-850 hover:bg-neutral-850 text-white/80 hover:text-white rounded-lg text-xs font-semibold transition-all font-mono"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(project.id)}
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
  );
};

export default ProjectForm;
