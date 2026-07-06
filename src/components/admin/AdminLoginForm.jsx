import React, { useState } from 'react';
import AlertMessage from './AlertMessage';

export const AdminLoginForm = ({ handleLogin, isLoggingIn, alert, setAlert }) => {
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(password);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground font-sans flex flex-col items-center justify-center py-12 px-4 relative selection:bg-primary selection:text-primary-foreground">
      {/* Background radial soft light */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md z-10 bg-neutral-950/40 border border-neutral-800/80 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-display font-black text-white tracking-widest uppercase mb-2">
            1998
          </h1>
          <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase font-mono">
            Acceso Restringido / Admin
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="masterPassword" className="text-xs font-semibold text-white/50 uppercase tracking-widest font-mono">
              Contraseña Maestra
            </label>
            <input
              type="password"
              id="masterPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-neutral-900 border border-neutral-800/80 focus:border-white/20 text-white rounded-lg px-4 py-3 text-sm outline-none transition-all placeholder:text-neutral-700 text-center tracking-widest font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 text-xs font-bold uppercase tracking-widest rounded-lg transition-all font-mono"
          >
            {isLoggingIn ? (
              <>
                <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                VALIDANDO...
              </>
            ) : (
              'INGRESAR'
            )}
          </button>
        </form>
      </div>

      {/* Alerta de notificación flotante */}
      <AlertMessage
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: '', message: '' })}
      />
    </div>
  );
};

export default AdminLoginForm;
