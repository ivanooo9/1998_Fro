import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// =====================================================
// SERVICE CARD COMPONENT (Correct React Hook Usage)
// =====================================================
const ServiceCard = ({ service, index, N, scrollYProgress }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detección reactiva de mobile para actualizar el video en JS
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Detecta si al menos el 10% de la tarjeta está visible en el viewport
  const isInView = useInView(containerRef, { amount: 0.1 });
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    if (isInView && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [isInView, hasBeenVisible]);

  // Control de reproducción según visibilidad para mitigar consumo de GPU
  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.muted = true; // Asegurar silencio absoluto para permitir autoplay en móviles
        videoRef.current.play().catch(error => console.log("Autoplay prevenido:", error));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView, isMobile]);

  // =================================================
  // STACKING LOGIC
  // =================================================
  const { range, scaleOutput, opacityOutput } = React.useMemo(() => {
    const r = [0];
    const s = [1];
    const o = [0];

    // Initial state
    if (index > 0) {
      r.push(index * (1 / N));
      s.push(1);
      o.push(0);
    }

    // Progressive stacking
    for (let j = index + 1; j < N; j++) {
      const stepProgress = j * (1 / N);
      r.push(stepProgress);

      const depth = j - index;

      // Scale reduction
      const targetScale = 1 - (depth * 0.05);
      s.push(targetScale);

      // Darkening effect
      const targetOpacity = Math.min(
        0.35 + (depth - 1) * 0.15,
        0.75
      );
      o.push(targetOpacity);
    }

    // Ensure animation reaches end
    if (r[r.length - 1] < 1) {
      r.push(1);
      s.push(s[s.length - 1]);
      o.push(o[o.length - 1]);
    }
    return { range: r, scaleOutput: s, opacityOutput: o };
  }, [index, N]);

  // =================================================
  // MOTION VALUES
  // =================================================
  const scale = useTransform(scrollYProgress, range, scaleOutput, { clamp: true });
  const darken = useTransform(scrollYProgress, range, opacityOutput, { clamp: true });

  return (
    <div
      ref={containerRef}
      className="
        sticky
        top-20
        w-full
        flex
        items-start
        justify-center
        relative
      "
      style={{
        zIndex: index,
        height: isMobile ? "calc(var(--stable-vh, 1vh) * 88)" : "calc(var(--stable-vh, 1vh) * 100)",
        paddingTop: "12px",
      }}
    >
      {/* ============================================= */}
      {/* MAIN CARD */}
      {/* ============================================= */}
      <div
        className="
          w-full
          max-w-[95%]
          mx-auto
          flex
          flex-col
          md:grid
          md:grid-cols-2
          rounded-3xl
          overflow-hidden
          border
          border-border/20
          shadow-2xl
          bg-background
        "
        style={{
          height: isMobile ? "calc(var(--stable-vh, 1vh) * 78)" : "calc(var(--stable-vh, 1vh) * 90)",
        }}
      >
        {/* ========================================= */}
        {/* LEFT COLUMN (TEXT) */}
        {/* ========================================= */}
        <div
          className="
            bg-background
            w-full
            h-auto
            md:h-full
            p-6
            pt-8
            md:p-16
            flex
            flex-col
            justify-start
            md:justify-center
            items-start
            text-left
            z-10
            relative
            shrink-0
          "
        >
          <h3
            className="
              text-3xl
              sm:text-4xl
              md:text-6xl
              lg:text-7xl
              font-display
              font-black
              uppercase
              text-foreground
              mb-3
              md:mb-6
            "
          >
            {service.title}
          </h3>

          <p
            className="
              text-foreground/75
              text-base
              sm:text-lg
              md:text-xl
              leading-relaxed
              max-w-md
              font-medium
            "
          >
            {service.description}
          </p>
        </div>

        {/* ========================================= */}
        {/* RIGHT COLUMN (VIDEO) */}
        {/* ========================================= */}
        <div
          className="
            bg-transparent
            w-full
            flex-grow
            flex
            flex-col
            relative
            overflow-hidden
            z-0
          "
        >
          <motion.div
            className="
              w-full
              flex-1
              origin-center
              relative
            "
            style={{
              scale,
              boxShadow: "0 -20px 60px -15px rgba(0,0,0,0.65)"
            }}
          >
            {/* ===================================== */}
            {/* VIDEO WITH RESPONSIVE SOURCES */}
            {/* ===================================== */}
            <video
              ref={videoRef}
              src={hasBeenVisible ? (isMobile ? (service.bgVideoMobileUrl || service.bgVideoMobile || service.bgVideoUrl || service.bgVideo) : (service.bgVideoUrl || service.bgVideo)) : ''}
              loop
              muted
              playsInline
              disablePictureInPicture
              preload="metadata"
              className="
                      absolute
                      inset-0
                      w-full
                      h-full
                      object-cover  /* CAMBIO: De object-contain a object-cover */
                      transition-transform
                      duration-700
                    "
            />

            {/* ===================================== */}
            {/* LIGHT OVERLAY */}
            {/* ===================================== */}
            <div
              className="
                absolute
                inset-0
                bg-white/5
                dark:bg-black/20
                pointer-events-none
              "
            />

            {/* ===================================== */}
            {/* DARK OVERLAY */}
            {/* ===================================== */}
            <motion.div
              className="
                absolute
                inset-0
                bg-black
                z-0
                pointer-events-none
              "
              style={{
                opacity: darken
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// MAIN INFINITE SERVICES MARQUEE COMPONENT
// =====================================================
const InfiniteServicesMarquee = ({ data }) => {
  const cardsContainerRef = useRef(null);

  const services = data?.services || [];
  const title = data?.title || "Servicios";
  const N = services.length;

  // =====================================================
  // SCROLL PROGRESS
  // =====================================================
  const { scrollYProgress } = useScroll({
    target: cardsContainerRef,
    offset: ["start start", "end end"]
  });

  // Calculate stable viewport height custom property to prevent mobile flickering
  useEffect(() => {
    const updateStableVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--stable-vh", `${vh}px`);
    };

    updateStableVh();

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        updateStableVh();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data) return null;

  return (
    <section
      id="servicios"
      className="
        relative
        w-full
        bg-background
        mt-0
        mb-12
        md:mb-16
        py-[4vh]
        md:py-[6vh]
      "
    >
      <div
        className="
          w-full
          max-w-7xl
          mx-auto
          px-0
          sm:px-4
          md:px-8
          relative
        "
      >
        {/* ================================================= */}
        {/* TITLE */}
        {/* ================================================= */}
        <h2
          className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-heading
            font-extrabold
            tracking-tight
            text-center
            text-foreground
            pb-4
            md:pb-10
          "
        >
          {title}
        </h2>

        {/* ================================================= */}
        {/* CARDS CONTAINER (Scroll Target) */}
        {/* ================================================= */}
        <div
          ref={cardsContainerRef}
          className="relative w-full"
          style={{
            height: `calc(var(--stable-vh, 1vh) * ${(N + 1) * 100})`
          }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              N={N}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfiniteServicesMarquee;