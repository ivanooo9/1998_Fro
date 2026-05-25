import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroLanding } from '../components/sections/HeroLanding';
import { FeatureGrid } from '../components/sections/FeatureGrid';
import { MarketingSection } from '../components/sections/MarketingSection';
import { CinematicShowcase } from '../components/sections/CinematicShowcase';
import { CTASection } from '../components/sections/CTASection';

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      
      <main>
        <HeroLanding />
        <FeatureGrid />
        
        <MarketingSection />
        <MarketingSection reversed />
        
        <CinematicShowcase />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};
