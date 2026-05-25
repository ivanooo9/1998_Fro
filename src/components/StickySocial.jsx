import React, { useState, useEffect } from 'react';
import './StickySocial.css';

export const StickySocial = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Ocultar en la sección Hero (primeros window.innerHeight - 100 píxeles)
      const threshold = window.innerHeight - 100;
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Ejecutar inmediatamente para validar la posición al cargar
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="sticky-social" className={isVisible ? 'is-visible' : ''}>
      <ul>
        <li>
          <a href="https://facebook.com" className="entypo-facebook" target="_blank" rel="noopener noreferrer">
            <span>Facebook</span>
          </a>
        </li>
        <li>
          <a href="https://twitter.com" className="entypo-twitter" target="_blank" rel="noopener noreferrer">
            <span>Twitter</span>
          </a>
        </li>
        <li>
          <a href="https://linkedin.com" className="entypo-linkedin" target="_blank" rel="noopener noreferrer">
            <span>LinkedIn</span>
          </a>
        </li>
        <li>
          <a href="https://instagram.com" className="entypo-instagrem" target="_blank" rel="noopener noreferrer">
            <span>Instagram</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default StickySocial;
