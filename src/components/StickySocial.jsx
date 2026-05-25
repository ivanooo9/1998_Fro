import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
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
          <a href="https://facebook.com" className="facebook" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="social-icon" />
            <span>Facebook</span>
          </a>
        </li>
        <li>
          <a href="https://twitter.com" className="twitter" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon" />
            <span>Twitter</span>
          </a>
        </li>
        <li>
          <a href="https://linkedin.com" className="linkedin" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="social-icon" />
            <span>LinkedIn</span>
          </a>
        </li>
        <li>
          <a href="https://instagram.com" className="instagrem" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
            <span>Instagram</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default StickySocial;
