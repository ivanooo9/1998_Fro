import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  // Inicialización segura para el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Efecto sincronizador del DOM (siempre modo oscuro)
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    root.classList.remove('light');
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, [mounted]);

  const toggleTheme = () => {
    // Ya no se permite cambiar de tema, siempre oscuro
  };

  // Previene discrepancias de SSR/CSR retornando null o un estado base hasta montar
  if (!mounted) {
    return null; 
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser utilizado dentro de un ThemeProvider');
  }
  return context;
};
