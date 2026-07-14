import React from 'react';
import { API_BASE_URL } from '../../config/api';

export const HashedUploadInput = ({ 
  label, 
  id, 
  value, 
  onChange, 
  placeholder, 
  fileAccept = "video/*,image/*", 
  uploadingField, 
  setUploadingField, 
  setAlert, 
  token 
}) => {
  const isUploading = uploadingField === id;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingField(id);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/upload`, {
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

export default HashedUploadInput;
