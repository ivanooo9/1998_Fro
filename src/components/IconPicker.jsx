import React from 'react';

const iconList = [
  { className: 'bi bi-award-fill', name: 'Premio' },
  { className: 'bi bi-briefcase-fill', name: 'Maletín' },
  { className: 'bi bi-code-slash', name: 'Código' },
  { className: 'bi bi-chat-left-text-fill', name: 'Chat' },
  { className: 'bi bi-cpu-fill', name: 'Procesador' },
  { className: 'bi bi-credit-card-2-front-fill', name: 'Tarjeta' },
  { className: 'bi bi-display', name: 'Pantalla' },
  { className: 'bi bi-envelope-fill', name: 'Email' },
  { className: 'bi bi-folder-fill', name: 'Carpeta' },
  { className: 'bi bi-gear-fill', name: 'Configuración' },
  { className: 'bi bi-globe', name: 'Mundo' },
  { className: 'bi bi-graph-up', name: 'Gráfico' },
  { className: 'bi bi-heart-fill', name: 'Corazón' },
  { className: 'bi bi-image-fill', name: 'Imagen' },
  { className: 'bi bi-laptop', name: 'Laptop' },
  { className: 'bi bi-link-45deg', name: 'Enlace' },
  { className: 'bi bi-lock-fill', name: 'Candado' },
  { className: 'bi bi-map-fill', name: 'Mapa' },
  { className: 'bi bi-phone-fill', name: 'Móvil' },
  { className: 'bi bi-palette-fill', name: 'Paleta' },
  { className: 'bi bi-rocket', name: 'Cohete' },
  { className: 'bi bi-search', name: 'Búsqueda' },
  { className: 'bi bi-shield-fill', name: 'Escudo' },
  { className: 'bi bi-star-fill', name: 'Estrella' },
  { className: 'bi bi-trophy-fill', name: 'Trofeo' },
  { className: 'bi bi-window', name: 'Ventana' }
];

export const IconPicker = ({ value, onChange }) => {
  const selectedIcon = iconList.find(i => i.className === value);

  return (
    <div className="flex flex-col gap-3 p-4 bg-neutral-950/40 border border-neutral-800/80 rounded-xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
        <span className="text-xs font-semibold text-white/50 uppercase tracking-widest font-mono">
          Seleccionar Icono
        </span>

        {/* Preview del icono seleccionado */}
        <div className="flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
          <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Vista Previa:</span>
          {selectedIcon ? (
            <div className="flex items-center gap-1.5 text-white">
              <i className={`${selectedIcon.className} text-primary text-base`} />
              <span className="text-xs font-medium text-white/70">{selectedIcon.name}</span>
            </div>
          ) : (
            <span className="text-xs text-white/30 font-medium">Ninguno</span>
          )}
        </div>
      </div>

      {/* Grid scrollable de iconos */}
      <div className="max-h-[180px] overflow-y-auto pr-1 grid grid-cols-6 sm:grid-cols-8 gap-2 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
        {iconList.map((icon) => {
          const isSelected = value === icon.className;

          return (
            <button
              key={icon.className}
              type="button"
              onClick={() => onChange(icon.className)}
              title={icon.name}
              className={`flex items-center justify-center p-3 rounded-lg border transition-all cursor-pointer ${isSelected
                ? 'bg-white text-black border-white shadow-[0_0_15px_-3px_rgba(255,255,255,0.4)]'
                : 'bg-neutral-900/50 border-neutral-800/80 text-white/60 hover:bg-neutral-900 hover:border-neutral-700 hover:text-white'
                }`}
            >
              <i className={`${icon.className} text-lg`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
