import { cn, FadeIn } from '@/design-system';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border/40 bg-background pt-16 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <span className="font-serif font-bold text-2xl text-foreground mb-4 block">1998</span>
              <p className="text-foreground/60 text-sm max-w-xs">
                Creamos marcas que venden. Estrategia y desarrollo web.
              </p>
            </div>

            <div>
              <h4 className="font-heading font-extrabold text-foreground mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#como-trabajamos" className="hover:text-foreground transition-colors">¿Cómo trabajamos?</a></li>
                <li><a href="#servicios" className="hover:text-foreground transition-colors">Servicios</a></li>
                <li><a href="#planes" className="hover:text-foreground transition-colors">Planes</a></li>
                <li><a href="#portafolio" className="hover:text-foreground transition-colors">Portafolio</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-extrabold text-foreground mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#inicio" className="hover:text-foreground transition-colors">Sobre Nosotros</a></li>
                <li><a href="#como-trabajamos" className="hover:text-foreground transition-colors">Metodología</a></li>
                <li><a href="#planes" className="hover:text-foreground transition-colors">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-extrabold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground/60 mb-6">
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-foreground transition-colors">Política de Privacidad</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-foreground transition-colors">Términos de Servicio</a></li>
              </ul>
              <div className="flex gap-4 text-foreground/50">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="Facebook">
                  <FaFacebookF size={18} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="Twitter">
                  <FaTwitter size={18} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="LinkedIn">
                  <FaLinkedinIn size={18} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="Instagram">
                  <FaInstagram size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/40 text-sm text-foreground/40">
            <p>© {new Date().getFullYear()} 1998 Digital Development and Marketing. All rights reserved.</p>

          </div>
        </FadeIn>
      </div>
    </footer>
  );
};
