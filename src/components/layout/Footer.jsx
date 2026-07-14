import { useState, useEffect } from 'react';
import { cn, FadeIn } from '@/design-system';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export const Footer = ({ data }) => {
  const logoUrl = data?.logoUrl || "/images/image_98fcad.PNG";
  const description = data?.description || "Creamos marcas que venden. Estrategia y desarrollo web.";
  const facebookUrl = data?.facebookUrl || "https://facebook.com";
  const twitterUrl = data?.twitterUrl || "https://twitter.com";
  const linkedinUrl = data?.linkedinUrl || "https://linkedin.com";
  const instagramUrl = data?.instagramUrl || "https://instagram.com";
  const copyrightText = data?.copyrightText || `© ${new Date().getFullYear()} 1998 Digital Development and Marketing. All rights reserved.`;

  const servicesTitle = data?.servicesTitle || "Servicios";
  const companyTitle = data?.companyTitle || "Empresa";

  // Parse links safely
  let servicesLinks = [];
  try {
    servicesLinks = data?.servicesLinks ? JSON.parse(data.servicesLinks) : [
      { "label": "¿Cómo trabajamos?", "href": "#como-trabajamos" },
      { "label": "Servicios", "href": "#servicios" },
      { "label": "Planes", "href": "#planes" },
      { "label": "Portafolio", "href": "#portafolio" }
    ];
  } catch (err) {
    servicesLinks = [];
  }

  let companyLinks = [];
  try {
    companyLinks = data?.companyLinks ? JSON.parse(data.companyLinks) : [
      { "label": "Sobre Nosotros", "href": "#inicio" },
      { "label": "Metodología", "href": "#como-trabajamos" },
      { "label": "Contacto", "href": "#planes" }
    ];
  } catch (err) {
    companyLinks = [];
  }

  return (
    <footer className="w-full border-t border-border/40 bg-background pt-16 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <img
                src={logoUrl}
                alt="Logo 1998"
                className="h-[40px] w-[85px] object-contain"
              />
              <p className="text-foreground/60 text-sm max-w-xs mt-4">
                {description}
              </p>
            </div>

            <div>
              <h4 className="font-heading font-extrabold text-foreground mb-4">{servicesTitle}</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                {servicesLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-extrabold text-foreground mb-4">{companyTitle}</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                {companyLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-extrabold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground/60 mb-6">
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-foreground transition-colors">Política de Privacidad</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-foreground transition-colors">Términos de Servicio</a></li>
              </ul>
              <div className="flex gap-4 text-foreground/50">
                {facebookUrl && (
                  <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="Facebook">
                    <FaFacebookF size={18} />
                  </a>
                )}
                {twitterUrl && (
                  <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="Twitter">
                    <FaTwitter size={18} />
                  </a>
                )}
                {linkedinUrl && (
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="LinkedIn">
                    <FaLinkedinIn size={18} />
                  </a>
                )}
                {instagramUrl && (
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="Instagram">
                    <FaInstagram size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/40 text-sm text-foreground/40">
            <p>{copyrightText}</p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};
