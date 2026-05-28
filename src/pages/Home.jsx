import { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* 1. Preloader Overlay */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. Main Site Structure */}
      <Navbar isLoading={isLoading} />
      
      <main>
        <HeroLanding isLoading={isLoading} />
        <FeatureGrid />
        
        <InfiniteServicesMarquee />
        <MarketingSection reversed />
        
        <CinematicShowcase />
        <PortfolioCarousel />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};
