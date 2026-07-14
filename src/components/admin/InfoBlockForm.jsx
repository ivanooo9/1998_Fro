import React, { useState } from 'react';
import HashedUploadInput from './HashedUploadInput';
import { API_BASE_URL } from '../../config/api';

export const InfoBlockForm = ({ 
  infoBlocks, 
  token, 
  setAlert, 
  loadLandingContent, 
  uploadingField, 
  setUploadingField 
}) => {
  const [form, setForm] = useState({
    identifier: '',
    title: '',
    description: '',
    imageUrl: '',
    buttonText: '',
    buttonLink: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectSection = (e) => {
    const selectedValue = e.target.value;
    if (!selectedValue) {
      setForm({
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
      setForm({
        identifier: found.identifier || '',
        title: found.title || '',
        description: found.description || '',
        imageUrl: found.imageUrl || '',
        buttonText: found.buttonText || '',
        buttonLink: found.buttonLink || '',
      });
      setAlert({ type: 'success', message: `Sección "${selectedValue}" cargada correctamente.` });
    } else {
      setForm({
        identifier: selectedValue,
        title: '',
        description: '',
        imageUrl: '',
        buttonText: '',
        buttonLink: '',
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.identifier || !form.title || !form.description) {
      setAlert({ type: 'error', message: 'Los campos Identificador, Título y Descripción son obligatorios.' });
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/infoblock/${form.identifier}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          imageUrl: form.imageUrl || null,
          buttonText: form.buttonText || null,
          buttonLink: form.buttonLink || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar el bloque de información');
      }

      const data = await response.json();
      setAlert({ type: 'success', message: data.message || '¡Bloque de información guardado exitosamente!' });

      setForm({
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

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
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
            value={form.identifier}
            onChange={handleSelectSection}
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
        <input type="text" id="title" value={form.title} onChange={handleChange} required className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-xs font-semibold text-white/60 uppercase tracking-wider">Texto / Descripción</label>
        <textarea id="description" value={form.description} onChange={handleChange} rows="4" required className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all resize-none" />
      </div>

      <HashedUploadInput label="Imagen o Video (Reemplaza el fondo)" id="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Sube el archivo a Cloudinary..." fileAccept="image/*,video/mp4" uploadingField={uploadingField} setUploadingField={setUploadingField} setAlert={setAlert} token={token} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="buttonText" className="text-xs font-semibold text-white/60 uppercase tracking-wider">Texto del Botón (Opcional)</label>
          <input type="text" id="buttonText" value={form.buttonText} onChange={handleChange} className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="buttonLink" className="text-xs font-semibold text-white/60 uppercase tracking-wider">Enlace del Botón (Opcional)</label>
          <input type="text" id="buttonLink" value={form.buttonLink} onChange={handleChange} className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all" />
        </div>
      </div>

      <button type="submit" disabled={isSaving || !form.identifier} className="w-full flex items-center justify-center py-3 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 text-sm font-bold uppercase rounded-lg transition-all mt-4">
        {isSaving ? 'Guardando Cambios...' : 'Guardar Sección'}
      </button>
    </form>
  );
};

export default InfoBlockForm;
