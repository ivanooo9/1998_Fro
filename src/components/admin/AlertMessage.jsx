import React from 'react';

export const AlertMessage = ({ type, message, onClose }) => {
  if (!message) return null;
  const isError = type === 'error';
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-md transition-all duration-300 shadow-lg ${
      isError
        ? 'bg-red-500/10 border-red-500/20 text-red-400'
        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
    }`}>
      <div className={`w-2 h-2 rounded-full ${isError ? 'bg-red-500' : 'bg-emerald-500'} animate-pulse`} />
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 hover:text-white transition-colors focus:outline-none"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default AlertMessage;
