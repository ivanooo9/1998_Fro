import React, { useState, useEffect } from 'react';
import HashedUploadInput from './HashedUploadInput';

export const HeroForm = ({ 
  heroData, 
  token, 
  setAlert, 
  uploadingField, 
  setUploadingField 
}) => {
  const [form, setForm] = useState({
    seoTitle: '',
    videoDesktopUrl: '',
    videoTabletUrl: '',
    videoMobileUrl: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (heroData) {
      setForm({
        seoTitle: heroData.seoTitle || '',
        videoDesktopUrl: heroData.videoDesktopUrl || '',
        videoTabletUrl: heroData.videoTabletUrl || '',
        videoMobileUrl: heroData.videoMobileUrl || '',
      });
    }
  }, [heroData]);

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

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
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
          value={form.seoTitle}
          onChange={handleChange}
          placeholder="Ej: 1998 - Agencia de Desarrollo Web..."
          className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
        />
      </div>

      <HashedUploadInput
        label="Video de Escritorio (Desktop)"
        id="videoDesktopUrl"
        value={form.videoDesktopUrl}
        onChange={handleChange}
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
        value={form.videoTabletUrl}
        onChange={handleChange}
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
        value={form.videoMobileUrl}
        onChange={handleChange}
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
  );
};

export default HeroForm;
