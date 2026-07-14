import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Preloader } from '../components/layout/Preloader';
import { HeroLanding } from '../components/sections/HeroLanding';
import { FeatureGrid } from '../components/sections/FeatureGrid';
import { MarketingSection } from '../components/sections/MarketingSection';
import { CinematicShowcase } from '../components/sections/CinematicShowcase';
import PortfolioCarousel from '../components/PortfolioCarousel';
import { CTASection } from '../components/sections/CTASection';
import InfiniteServicesMarquee from '../components/sections/InfiniteServicesMarquee';
import { API_BASE_URL } from '../config/api';

export const Home = () => {
  const [content, setContent] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/landing-content`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setContent(data);
        setHasError(false);
      } catch (err) {
        console.error("Error al obtener el contenido de la landing page:", err);
        setHasError(true);
      } finally {
        setIsFetching(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground relative">
      {/* 1. Preloader Overlay */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader 
            key="preloader" 
            isFetching={isFetching}
            onComplete={() => setIsLoading(false)} 
          />
        )}
      </AnimatePresence>

      {/* 2. Main Site Structure */}
      <Navbar isLoading={isLoading} />

      {/* Banner de Modo Sin Conexión */}
      {hasError && (
        <div className="bg-red-500/10 border-b border-red-500/20 text-red-400 text-xs font-mono text-center py-2.5 px-4 sticky top-[72px] z-40 backdrop-blur-md flex items-center justify-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span>MODO SIN CONEXIÓN: Servidor en mantenimiento. Mostrando contenido de respaldo estático.</span>
        </div>
      )}
      
      <main>
        <HeroLanding data={content?.hero} isLoading={isLoading} />
        <FeatureGrid workStepsHeader={content?.workStepsHeader} workSteps={content?.workSteps} />
        
        <InfiniteServicesMarquee data={content?.servicesMarquee} />
        <MarketingSection reversed infoBlocks={content?.infoBlocks || []} />
        
        <CinematicShowcase infoBlocks={content?.infoBlocks || []} />
        <PortfolioCarousel data={content?.portfolio} />
        <CTASection data={content?.cta} />
      </main>

      <Footer data={content?.footer} />
    </div>
  );
};
