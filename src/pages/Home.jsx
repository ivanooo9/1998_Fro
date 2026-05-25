import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroLanding } from '../components/sections/HeroLanding';
import { FeatureGrid } from '../components/sections/FeatureGrid';
import { MarketingSection } from '../components/sections/MarketingSection';
import { CinematicShowcase } from '../components/sections/CinematicShowcase';
import PortfolioCarousel from '../components/PortfolioCarousel';
import { CTASection } from '../components/sections/CTASection';
import { StickySocial } from '../components/StickySocial';
import InfiniteServicesMarquee from '../components/sections/InfiniteServicesMarquee';

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <StickySocial />
      
      <main>
        <HeroLanding />
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
