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

export const Home = () => {
  const [content, setContent] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const apiHost = window.location.hostname === 'localhost'
          ? 'http://localhost:3000'
          : `http://${window.location.hostname}:3000`;
        const response = await fetch(`${apiHost}/api/landing-content`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setContent(data);
      } catch (err) {
        console.error("Error al obtener el contenido de la landing page:", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
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
      
      <main>
        <HeroLanding data={content?.hero} isLoading={isLoading} />
        <FeatureGrid workSteps={content?.workSteps} />
        
        <InfiniteServicesMarquee data={content?.servicesMarquee} />
        <MarketingSection reversed infoBlocks={content?.infoBlocks || []} />
        
        <CinematicShowcase infoBlocks={content?.infoBlocks || []} />
        <PortfolioCarousel data={content?.portfolio} />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};
