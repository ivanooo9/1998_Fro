import React from 'react';
import * as BiIcons from 'react-icons/bi';

const iconList = [
  { iconName: 'BiAward', className: 'bi bi-award-fill', name: 'Premio' },
  { iconName: 'BiBriefcase', className: 'bi bi-briefcase-fill', name: 'Maletín' },
  { iconName: 'BiCodeAlt', className: 'bi bi-code-slash', name: 'Código' },
  { iconName: 'BiChat', className: 'bi bi-chat-left-text-fill', name: 'Chat' },
  { iconName: 'BiChip', className: 'bi bi-cpu-fill', name: 'Procesador' },
  { iconName: 'BiCreditCard', className: 'bi bi-credit-card-2-front-fill', name: 'Tarjeta' },
  { iconName: 'BiDesktop', className: 'bi bi-display', name: 'Pantalla' },
  { iconName: 'BiEnvelope', className: 'bi bi-envelope-fill', name: 'Email' },
  { iconName: 'BiFolder', className: 'bi bi-folder-fill', name: 'Carpeta' },
  { iconName: 'BiCog', className: 'bi bi-gear-fill', name: 'Configuración' },
  { iconName: 'BiGlobe', className: 'bi bi-globe', name: 'Mundo' },
  { iconName: 'BiTrendingUp', className: 'bi bi-graph-up', name: 'Gráfico' },
  { iconName: 'BiHeart', className: 'bi bi-heart-fill', name: 'Corazón' },
  { iconName: 'BiImage', className: 'bi bi-image-fill', name: 'Imagen' },
  { iconName: 'BiLaptop', className: 'bi bi-laptop', name: 'Laptop' },
  { iconName: 'BiLink', className: 'bi bi-link-45deg', name: 'Enlace' },
  { iconName: 'BiLock', className: 'bi bi-lock-fill', name: 'Candado' },
  { iconName: 'BiMap', className: 'bi bi-map-fill', name: 'Mapa' },
  { iconName: 'BiMobile', className: 'bi bi-phone-fill', name: 'Móvil' },
  { iconName: 'BiPalette', className: 'bi bi-palette-fill', name: 'Paleta' },
  { iconName: 'BiRocket', className: 'bi bi-rocket', name: 'Cohete' },
  { iconName: 'BiSearch', className: 'bi bi-search', name: 'Búsqueda' },
  { iconName: 'BiShield', className: 'bi bi-shield-fill', name: 'Escudo' },
  { iconName: 'BiStar', className: 'bi bi-star-fill', name: 'Estrella' },
  { iconName: 'BiTrophy', className: 'bi bi-trophy-fill', name: 'Trofeo' },
  { iconName: 'BiWindow', className: 'bi bi-window', name: 'Ventana' }
];

export const IconPicker = ({ value, onChange }) => {
  // Encontrar el componente del icono seleccionado actualmente para el preview
  const selectedIcon = iconList.find(i => i.className === value);
  const SelectedIconComponent = selectedIcon ? BiIcons[selectedIcon.iconName] : null;

  return (
    <div className="flex flex-col gap-3 p-4 bg-neutral-950/40 border border-neutral-800/80 rounded-xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
        <span className="text-xs font-semibold text-white/50 uppercase tracking-widest font-mono">
          Seleccionar Icono
        </span>

        {/* Preview del icono seleccionado */}
        <div className="flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
          <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Vista Previa:</span>
          {SelectedIconComponent ? (
            <div className="flex items-center gap-1.5 text-white">
              <SelectedIconComponent className="w-4 h-4 text-primary" />
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
          const IconComp = BiIcons[icon.iconName];
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
              {IconComp ? <IconComp className="w-5 h-5" /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};
