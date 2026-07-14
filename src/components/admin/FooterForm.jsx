import React, { useState, useEffect } from 'react';
import HashedUploadInput from './HashedUploadInput';
import { API_BASE_URL } from '../../config/api';

export const FooterForm = ({ 
  footerData, 
  token, 
  setAlert, 
  uploadingField, 
  setUploadingField 
}) => {
  const [form, setForm] = useState({
    logoUrl: '',
    description: '',
    facebookUrl: '',
    twitterUrl: '',
    linkedinUrl: '',
    instagramUrl: '',
    copyrightText: '',
  });

  const [servicesTitle, setServicesTitle] = useState('Servicios');
  const [servicesLinks, setServicesLinks] = useState([]);
  const [companyTitle, setCompanyTitle] = useState('Empresa');
  const [companyLinks, setCompanyLinks] = useState([]);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (footerData) {
      setForm({
        logoUrl: footerData.logoUrl || '',
        description: footerData.description || '',
        facebookUrl: footerData.facebookUrl || '',
        twitterUrl: footerData.twitterUrl || '',
        linkedinUrl: footerData.linkedinUrl || '',
        instagramUrl: footerData.instagramUrl || '',
        copyrightText: footerData.copyrightText || '',
      });
      setServicesTitle(footerData.servicesTitle || 'Servicios');
      setCompanyTitle(footerData.companyTitle || 'Empresa');
      
      try {
        setServicesLinks(footerData.servicesLinks ? JSON.parse(footerData.servicesLinks) : [
          { "label": "¿Cómo trabajamos?", "href": "#como-trabajamos" },
          { "label": "Servicios", "href": "#servicios" },
          { "label": "Planes", "href": "#planes" },
          { "label": "Portafolio", "href": "#portafolio" }
        ]);
      } catch (err) {
        setServicesLinks([]);
      }
      
      try {
        setCompanyLinks(footerData.companyLinks ? JSON.parse(footerData.companyLinks) : [
          { "label": "Sobre Nosotros", "href": "#inicio" },
          { "label": "Metodología", "href": "#como-trabajamos" },
          { "label": "Contacto", "href": "#planes" }
        ]);
      } catch (err) {
        setCompanyLinks([]);
      }
    }
  }, [footerData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleLinkChange = (type, index, field, value) => {
    if (type === 'services') {
      const updated = [...servicesLinks];
      updated[index] = { ...updated[index], [field]: value };
      setServicesLinks(updated);
    } else {
      const updated = [...companyLinks];
      updated[index] = { ...updated[index], [field]: value };
      setCompanyLinks(updated);
    }
  };

  const addLink = (type) => {
    if (type === 'services') {
      setServicesLinks([...servicesLinks, { label: '', href: '' }]);
    } else {
      setCompanyLinks([...companyLinks, { label: '', href: '' }]);
    }
  };

  const removeLink = (type, index) => {
    if (type === 'services') {
      setServicesLinks(servicesLinks.filter((_, idx) => idx !== index));
    } else {
      setCompanyLinks(companyLinks.filter((_, idx) => idx !== index));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        servicesTitle,
        servicesLinks: JSON.stringify(servicesLinks),
        companyTitle,
        companyLinks: JSON.stringify(companyLinks),
      };
      
      Object.keys(form).forEach((key) => {
        if (form[key].trim() !== '') {
          payload[key] = form[key];
        } else {
          payload[key] = ''; // Permitir vaciar URLs de redes si es necesario
        }
      });

      const response = await fetch(`${API_BASE_URL}/api/admin/footer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar el Footer');
      }

      const data = await response.json();
      setAlert({ type: 'success', message: data.message || '¡Footer actualizado exitosamente!' });
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="border-b border-neutral-800 pb-4">
        <h2 className="text-xl font-heading font-extrabold text-white">Editar Configuración del Footer</h2>
        <p className="text-xs text-white/50 mt-1">Los campos vacíos conservarán sus valores originales o se guardarán vacíos.</p>
      </div>

      <HashedUploadInput
        label="Logotipo del Footer"
        id="logoUrl"
        value={form.logoUrl}
        onChange={handleChange}
        placeholder="Ruta del logotipo o URL externa"
        fileAccept="image/*"
        uploadingField={uploadingField}
        setUploadingField={setUploadingField}
        setAlert={setAlert}
        token={token}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
          Descripción de la Empresa
        </label>
        <textarea
          id="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Ej: Creamos marcas que venden. Estrategia y desarrollo web."
          className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600 resize-y"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="copyrightText" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
          Texto de Copyright
        </label>
        <input
          type="text"
          id="copyrightText"
          value={form.copyrightText}
          onChange={handleChange}
          placeholder="Ej: © 2026 1998 Digital Development and Marketing. All rights reserved."
          className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
        />
      </div>

      {/* Sección Columnas de Enlaces del Footer */}
      <div className="border-t border-neutral-800 pt-4 mt-2">
        <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4 font-mono">Columnas de Enlaces</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columna 1 (Servicios) */}
          <div className="flex flex-col gap-4 p-4 bg-neutral-950/20 border border-neutral-800/80 rounded-xl">
            <div className="flex flex-col gap-2">
              <label htmlFor="servicesTitle" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                Título Columna 1
              </label>
              <input
                type="text"
                id="servicesTitle"
                value={servicesTitle}
                onChange={(e) => setServicesTitle(e.target.value)}
                placeholder="Servicios"
                className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2 text-sm outline-none transition-all"
              />
            </div>
            
            <div className="flex flex-col gap-3 mt-2">
              <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider font-mono">Enlaces Columna 1</span>
              {servicesLinks.map((link, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => handleLinkChange('services', idx, 'label', e.target.value)}
                    placeholder="Texto"
                    className="flex-1 bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-3 py-1.5 text-xs outline-none transition-all"
                  />
                  <input
                    type="text"
                    value={link.href}
                    onChange={(e) => handleLinkChange('services', idx, 'href', e.target.value)}
                    placeholder="Enlace (#id o URL)"
                    className="flex-1 bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-3 py-1.5 text-xs outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => removeLink('services', idx)}
                    className="p-2 border border-red-950/40 text-red-500 hover:bg-red-950/20 rounded-lg transition-all"
                    title="Eliminar Enlace"
                  >
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addLink('services')}
                className="mt-1 w-full py-2 border border-neutral-800 border-dashed hover:border-neutral-600 rounded-lg text-xs font-semibold text-white/50 hover:text-white transition-all uppercase tracking-wider"
              >
                + Agregar Enlace
              </button>
            </div>
          </div>

          {/* Columna 2 (Empresa) */}
          <div className="flex flex-col gap-4 p-4 bg-neutral-950/20 border border-neutral-800/80 rounded-xl">
            <div className="flex flex-col gap-2">
              <label htmlFor="companyTitle" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                Título Columna 2
              </label>
              <input
                type="text"
                id="companyTitle"
                value={companyTitle}
                onChange={(e) => setCompanyTitle(e.target.value)}
                placeholder="Empresa"
                className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2 text-sm outline-none transition-all"
              />
            </div>
            
            <div className="flex flex-col gap-3 mt-2">
              <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider font-mono">Enlaces Columna 2</span>
              {companyLinks.map((link, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => handleLinkChange('company', idx, 'label', e.target.value)}
                    placeholder="Texto"
                    className="flex-1 bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-3 py-1.5 text-xs outline-none transition-all"
                  />
                  <input
                    type="text"
                    value={link.href}
                    onChange={(e) => handleLinkChange('company', idx, 'href', e.target.value)}
                    placeholder="Enlace (#id o URL)"
                    className="flex-1 bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-3 py-1.5 text-xs outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => removeLink('company', idx)}
                    className="p-2 border border-red-950/40 text-red-500 hover:bg-red-950/20 rounded-lg transition-all"
                    title="Eliminar Enlace"
                  >
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addLink('company')}
                className="mt-1 w-full py-2 border border-neutral-800 border-dashed hover:border-neutral-600 rounded-lg text-xs font-semibold text-white/50 hover:text-white transition-all uppercase tracking-wider"
              >
                + Agregar Enlace
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800 pt-4 mt-2">
        <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4 font-mono">Enlaces de Redes Sociales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="facebookUrl" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Facebook URL
            </label>
            <input
              type="url"
              id="facebookUrl"
              value={form.facebookUrl}
              onChange={handleChange}
              placeholder="https://facebook.com/pagina"
              className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="twitterUrl" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Twitter/X URL
            </label>
            <input
              type="url"
              id="twitterUrl"
              value={form.twitterUrl}
              onChange={handleChange}
              placeholder="https://twitter.com/usuario"
              className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="linkedinUrl" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              LinkedIn URL
            </label>
            <input
              type="url"
              id="linkedinUrl"
              value={form.linkedinUrl}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/nombre"
              className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="instagramUrl" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Instagram URL
            </label>
            <input
              type="url"
              id="instagramUrl"
              value={form.instagramUrl}
              onChange={handleChange}
              placeholder="https://instagram.com/usuario"
              className="bg-neutral-900 border border-neutral-800 focus:border-primary/50 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-600"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 text-sm font-bold uppercase rounded-lg transition-all"
      >
        {isSaving ? 'Guardando cambios...' : 'Actualizar Sección Footer'}
      </button>
    </form>
  );
};

export default FooterForm;
