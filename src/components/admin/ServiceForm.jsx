import React, { useState } from 'react';
import HashedUploadInput from './HashedUploadInput';

export const ServiceForm = ({ 
  services, 
  token, 
  setAlert, 
  loadLandingContent, 
  uploadingField, 
  setUploadingField 
}) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    bgVideoUrl: '',
    bgVideoMobileUrl: '',
    order: '',
  });

  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const startEdit = (service) => {
    setEditingId(service.id);
    setForm({
      title: service.title || '',
      description: service.description || '',
      bgVideoUrl: service.bgVideoUrl || '',
      bgVideoMobileUrl: service.bgVideoMobileUrl || '',
      order: service.order !== undefined && service.order !== null ? String(service.order) : '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      title: '',
      description: '',
      bgVideoUrl: '',
      bgVideoMobileUrl: '',
      order: '',
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.bgVideoUrl) {
      setAlert({ type: 'error', message: 'Los campos Título, Descripción y Video son obligatorios.' });
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...form,
        order: form.order ? parseInt(form.order, 10) : undefined,
      };

      const url = editingId
        ? `http://localhost:3000/api/admin/services/service/${editingId}`
        : 'http://localhost:3000/api/admin/services/service';
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
        throw new Error(errorData.error || 'Error al guardar el servicio');
      }

      const data = await response.json();
      setAlert({
        type: 'success',
        message: data.message || (editingId ? '¡Servicio actualizado exitosamente!' : '¡Servicio añadido exitosamente!')
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
    if (!window.confirm('¿Estás seguro de que deseas eliminar este servicio?')) return;

    try {
      const response = await fetch(`http://localhost:3000/api/admin/services/service/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar el servicio');
      }

      const data = await response.json();
      setAlert({
        type: 'success',
        message: data.message || '¡Servicio eliminado exitosamente!'
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
            {editingId ? 'Editar Servicio' : 'Añadir Nuevo Servicio'}
          </h2>
          <p className="text-xs text-white/50 mt-1">
            {editingId ? 'Modifica los datos del servicio seleccionado.' : 'Crea una nueva tarjeta de servicio interactiva en el scroll infinito.'}
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
              value={form.title}
              onChange={handleChange}
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
              value={form.order}
              onChange={handleChange}
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
            value={form.description}
            onChange={handleChange}
            placeholder="Describe la solución brindada en el servicio..."
            rows="3"
            required
            className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all resize-none placeholder:text-neutral-600"
          />
        </div>

        <HashedUploadInput
          label="Video de Fondo (Desktop Video Url)"
          id="bgVideoUrl"
          value={form.bgVideoUrl}
          onChange={handleChange}
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
          value={form.bgVideoMobileUrl}
          onChange={handleChange}
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
            {isSaving ? 'Guardando...' : (editingId ? 'Guardar Cambios' : 'Añadir Servicio a la Sección')}
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
                    onClick={() => startEdit(service)}
                    className="px-3 py-1.5 bg-neutral-900 border border-neutral-850 hover:bg-neutral-850 text-white/80 hover:text-white rounded-lg text-xs font-semibold transition-all font-mono"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(service.id)}
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

export default ServiceForm;
