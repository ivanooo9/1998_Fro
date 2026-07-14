import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config/api';

export const CTAForm = ({ 
  ctaData, 
  token, 
  setAlert 
}) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    buttonText: '',
    buttonLink: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (ctaData) {
      setForm({
        title: ctaData.title || '',
        description: ctaData.description || '',
        buttonText: ctaData.buttonText || '',
        buttonLink: ctaData.buttonLink || '',
      });
    }
  }, [ctaData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {};
      Object.keys(form).forEach((key) => {
        if (form[key].trim() !== '') {
          payload[key] = form[key];
        } else {
          payload[key] = ''; // Permitir valores vacíos
        }
      });

      const response = await fetch(`${API_BASE_URL}/api/admin/cta`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar la sección CTA');
      }

      const data = await response.json();
      setAlert({ type: 'success', message: data.message || '¡Sección CTA actualizada exitosamente!' });
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="border-b border-neutral-800 pb-4">
        <h2 className="text-xl font-heading font-extrabold text-white">Editar Configuración de CTA (Call to Action)</h2>
        <p className="text-xs text-white/50 mt-1">Los campos vacíos conservarán sus valores originales o se guardarán vacíos.</p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
          Título de la Sección
        </label>
        <input
          type="text"
          id="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Ej: ¿Cuál plan se ajusta mejor a tu negocio?"
          className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
          Descripción de la Sección
        </label>
        <textarea
          id="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder="Ej: Desde desarrollo web hasta cierres de ventas. En 1998 nos encargamos de que tu empresa destaque..."
          className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600 resize-y"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="buttonText" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
            Texto del Botón
          </label>
          <input
            type="text"
            id="buttonText"
            value={form.buttonText}
            onChange={handleChange}
            placeholder="Ej: Escríbenos"
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
            value={form.buttonLink}
            onChange={handleChange}
            placeholder="Ej: #contacto, https://wa.me/... o mailto:..."
            className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 text-sm font-bold uppercase rounded-lg transition-all"
      >
        {isSaving ? 'Guardando cambios...' : 'Actualizar Sección CTA'}
      </button>
    </form>
  );
};

export default CTAForm;
