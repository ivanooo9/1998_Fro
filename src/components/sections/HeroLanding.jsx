import { useState, useEffect, useRef } from 'react';
import { cn } from '@/design-system';

export const HeroLanding = ({ data, isLoading }) => {
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (!data) return;

    const selectVideoSource = () => {
      const width = window.innerWidth;
      let selectedUrl = '';

      if (width >= 1024 && data.videoDesktopUrl) {
        selectedUrl = data.videoDesktopUrl;
      } else if (width >= 768 && data.videoTabletUrl) {
        selectedUrl = data.videoTabletUrl;
      } else {
        selectedUrl = data.videoMobileUrl || data.videoDesktopUrl || '';
      }

      setVideoUrl((prevUrl) => {
        if (prevUrl !== selectedUrl) {
          return selectedUrl;
        }
        return prevUrl;
      });
    };

    selectVideoSource();
    window.addEventListener('resize', selectVideoSource);
    window.addEventListener('orientationchange', selectVideoSource);

    return () => {
      window.removeEventListener('resize', selectVideoSource);
      window.removeEventListener('orientationchange', selectVideoSource);
    };
  }, [data]);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.load();
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay blocked or failed on HeroLanding:", err);
        });
      }
    }
  }, [videoUrl]);

  if (!data) return null;

  return (
    <section 
      id="inicio" 
      className={cn("relative min-h-[95vh] min-h-[95dvh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-background")}
    >
      <h1 className="sr-only">{data.seoTitle}</h1>
      
      {/* Background Cinematic Video */}
      {videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={data.videoFallbackImageUrl || data.imageUrl}
          className={cn("absolute inset-0 w-full h-full object-cover z-0 pointer-events-none")}
        />
      ) : (
        (data.videoFallbackImageUrl || data.imageUrl) && (
          <img 
            src={data.videoFallbackImageUrl || data.imageUrl} 
            alt={data.seoTitle} 
            className="absolute inset-0 w-full h-full object-cover z-0" 
          />
        )
      )}

      {/* Video Overlay Layer */}
      <div className={cn("absolute inset-0 bg-white/75 dark:bg-black/60 z-0 pointer-events-none")} />

      {/* Background Cinematic Glow */}
      <div className={cn("absolute inset-0 z-0 flex items-center justify-center pointer-events-none")}>
        <div className={cn("w-[800px] h-[500px] bg-glow-primary/10 dark:bg-glow-primary/20 rounded-[100%] blur-[120px] opacity-40 dark:opacity-50 mix-blend-multiply dark:mix-blend-screen translate-y-[-20%]")} />
      </div>

      {/* Subtle bottom gradient to blend with next section */}
      <div className={cn("absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none")} />
    </section>
  );
};
