import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { HeroSection, PremiumButton, GlassCard, StickyHeader } from '../index';

/**
 * DesignSystemPreview
 * Entorno aislado (Sandbox) para QA visual, performance testing y debugging de estado.
 * NUNCA debe importarse en código de producción de la app.
 */
export const DesignSystemPreview = () => {
  const [debugLayout, setDebugLayout] = useState(false);
  const [forceReducedMotion, setForceReducedMotion] = useState(false);

  return (
    <MotionConfig reducedMotion={forceReducedMotion ? "always" : "user"}>
      {/* Wrapper global con opciones de debug inyectadas */}
      <div className={`min-h-screen bg-background font-sans ${debugLayout ? 'debug-spacing-grid' : ''}`}>
        
        {/* Panel Flotante de Debugging */}
        <div className="fixed bottom-4 right-4 z-[9999] bg-card border border-border p-4 rounded-xl shadow-premium flex flex-col gap-3">
          <h3 className="text-xs font-bold text-foreground/50 uppercase tracking-widest">DS Inspector</h3>
          
          <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input 
              type="checkbox" 
              checked={debugLayout} 
              onChange={(e) => setDebugLayout(e.target.checked)} 
              className="accent-primary"
            />
            Show Spacing Grid
          </label>
          
          <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input 
              type="checkbox" 
              checked={forceReducedMotion} 
              onChange={(e) => setForceReducedMotion(e.target.checked)} 
              className="accent-primary"
            />
            Force Reduced Motion
          </label>
        </div>

        {/* --- PRUEBA: Sticky Header --- */}
        <StickyHeader 
          logo={<span className="font-serif font-bold text-xl text-foreground">Playground</span>}
          navItems={[{ label: 'UI', href: '#' }, { label: 'Motion', href: '#' }]}
          actionButton={<PremiumButton size="sm">Download</PremiumButton>}
        />

        {/* --- PRUEBA: Hero Section (Layout & Typography) --- */}
        <HeroSection 
          title={"Enterprise-Grade\nMotion Design"}
          subtitle="Entorno de QA aislado para probar performance, accesibilidad (WCAG 2.2) y comportamiento de físicas cinemáticas antes de producción."
          primaryCta={<PremiumButton variant="primary">Start Testing</PremiumButton>}
          secondaryCta={<PremiumButton variant="outline">View Docs</PremiumButton>}
          visualContent={
            <GlassCard className="w-full h-full max-h-[400px] flex items-center justify-center">
              <span className="text-foreground/30 font-serif">Visual Placeholder</span>
            </GlassCard>
          }
        />

        {/* --- PRUEBA: Componentes Individuales --- */}
        <section className="container mx-auto px-6 py-20 border-t border-border/50">
          <h2 className="text-3xl font-serif mb-12">Core Primitives</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GlassCard interactive intensity="base">
              <h3 className="text-xl font-bold mb-4">GlassCard Base</h3>
              <p className="text-foreground/70 mb-6">Prueba interactiva del hover sutil de escala (se desactiva con reduced motion).</p>
              <PremiumButton variant="ghost">Ghost Button</PremiumButton>
            </GlassCard>
            
            <GlassCard interactive intensity="intense">
              <h3 className="text-xl font-bold mb-4">GlassCard Intense</h3>
              <p className="text-foreground/70 mb-6">Mayor blur para superponer encima de contenidos visuales pesados.</p>
              <PremiumButton variant="outline">Outline Button</PremiumButton>
            </GlassCard>
          </div>
        </section>

      </div>
      
      {/* CSS inyectado para debug visual de spacing/layout thrashing */}
      <style dangerouslySetInnerHTML={{__html: `
        .debug-spacing-grid * {
          outline: 1px solid rgba(255, 0, 0, 0.2);
          background: rgba(255, 0, 0, 0.02);
        }
      `}} />
    </MotionConfig>
  );
};
