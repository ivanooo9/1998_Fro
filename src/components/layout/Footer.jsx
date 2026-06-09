import { cn, FadeIn } from '@/design-system';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border/40 bg-background pt-20 pb-10">
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
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-extrabold text-foreground mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-extrabold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground/60 mb-6">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
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
            <p>© {new Date().getFullYear()} 1998 - Desarrollo Digital y Marketing. Todos los derechos reservados.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Twitter</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Dribbble</a>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};
