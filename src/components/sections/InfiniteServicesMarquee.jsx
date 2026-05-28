"use client";

import React, {
  useRef,
  useEffect,
  useState
} from 'react';

import {
  motion,
  useScroll,
  useTransform
} from 'framer-motion';

const InfiniteServicesMarquee = () => {

  // =====================================================
  // REFS
  // =====================================================

  const containerRef = useRef(null);

  // =====================================================
  // RESPONSIVE VIDEO DETECTION
  // =====================================================

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {

    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener('resize', checkScreen);

    return () => {
      window.removeEventListener('resize', checkScreen);
    };

  }, []);

  // =====================================================
  // SERVICES
  // =====================================================

  const services = [
    {
      id: 1,
      title: "1. Web & App",
      description:
        "Creamos tu página web o app, una sucursal de tu negocio 24/7",
      bgVideo: "/videos/web_app.mp4",
      bgVideoMobile: "/videos/web_app_phone.mp4"
    },

    {
      id: 2,
      title: "2. Publicidad Digital",
      description:
        "Anuncios en redes y Google que traen más clientes",
      bgVideo: "/videos/publicidad_digital.mp4",
      bgVideoMobile: "/videos/publicidad_digital_phone.mp4"
    },

    {
      id: 3,
      title: "3. Branding",
      description:
        "Diseñamos tu logo y todo lo que hace única a tu marca",
      bgVideo: "/videos/Branding.mp4",
      bgVideoMobile: "/videos/Branding_phone.mp4"
    },

    {
      id: 4,
      title: "4. Redes Sociales",
      description:
        "Manejamos tus redes con contenido que llama la atención",
      bgVideo: "/videos/redes_sociales.mp4",
      bgVideoMobile: "/videos/redes_sociales_phone.mp4"
    },

    {
      id: 5,
      title: "5. Ventas",
      description:
        "Te ayudamos a vender más y mejor, sin enredos",
      bgVideo: "/videos/ventas.mp4",
      bgVideoMobile: "/videos/ventas_phone.mp4"
    }
  ];

  // =====================================================
  // SCROLL PROGRESS
  // =====================================================

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // =====================================================
  // COMPONENT
  // =====================================================

  return (

    <section
      ref={containerRef}
      className="
        relative
        w-full
        bg-background
        h-[620vh]
        mt-[15vh]
        mb-[35vh]
        py-[10vh]
      "
    >

      <div
        className="
          w-full
          max-w-7xl
          mx-auto
          px-4
          md:px-8
          h-full
          relative
        "
      >

        {/* ================================================= */}
        {/* TITLE */}
        {/* ================================================= */}

        <h2
          className="
            text-3xl
            md:text-5xl
            font-bold
            text-center
            text-foreground
            pb-16
          "
        >
          Servicios
        </h2>

        {/* ================================================= */}
        {/* SERVICES */}
        {/* ================================================= */}

        {services.map((service, index) => {

          // =================================================
          // STACKING LOGIC
          // =================================================

          const N = services.length;

          const range = [0];
          const scaleOutput = [1];
          const opacityOutput = [0];

          // Initial state
          if (index > 0) {

            range.push(index * (1 / N));

            scaleOutput.push(1);

            opacityOutput.push(0);
          }

          // Progressive stacking
          for (let j = index + 1; j < N; j++) {

            const stepProgress = j * (1 / N);

            range.push(stepProgress);

            const depth = j - index;

            // Scale reduction
            const targetScale = 1 - (depth * 0.05);

            scaleOutput.push(targetScale);

            // Darkening effect
            const targetOpacity = Math.min(
              0.35 + (depth - 1) * 0.15,
              0.75
            );

            opacityOutput.push(targetOpacity);
          }

          // Ensure animation reaches end
          if (range[range.length - 1] < 1) {

            range.push(1);

            scaleOutput.push(
              scaleOutput[scaleOutput.length - 1]
            );

            opacityOutput.push(
              opacityOutput[opacityOutput.length - 1]
            );
          }

          // =================================================
          // MOTION VALUES
          // =================================================

          const scale = useTransform(
            scrollYProgress,
            range,
            scaleOutput
          );

          const darken = useTransform(
            scrollYProgress,
            range,
            opacityOutput
          );

          // =================================================
          // CARD
          // =================================================

          return (

            <div
              key={service.id}
              className="
                sticky
                top-0
                h-screen
                w-full
                flex
                items-center
                justify-center
                relative
              "
            >

              {/* ============================================= */}
              {/* MAIN CARD */}
              {/* ============================================= */}

              <div
                className="
                  w-full
                  h-[92vh]
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  rounded-[32px]
                  overflow-hidden
                  border
                  border-border/20
                  shadow-2xl
                  bg-transparent
                "
              >

                {/* ========================================= */}
                {/* LEFT COLUMN */}
                {/* ========================================= */}

                <div
                  className="
                    bg-background
                    w-full
                    h-full
                    p-8
                    md:p-16
                    flex
                    flex-col
                    justify-center
                    items-start
                    text-left
                    z-10
                    relative
                  "
                >

                  <h3
                    className="
                      text-4xl
                      md:text-6xl
                      lg:text-7xl
                      font-serif
                      font-bold
                      text-foreground
                      mb-6
                      tracking-tight
                    "
                  >
                    {service.title}
                  </h3>

                  <p
                    className="
                      text-foreground/75
                      text-lg
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
                {/* RIGHT COLUMN */}
                {/* ========================================= */}

                <div
                  className="
                    bg-transparent
                    w-full
                    h-full
                    relative
                    overflow-hidden
                    z-0
                  "
                >

                  <motion.div
                    className="
                      w-full
                      h-full
                      origin-center
                      relative
                    "
                    style={{
                      scale,
                      boxShadow:
                        '0 -20px 60px -15px rgba(0,0,0,0.65)'
                    }}
                  >

                    {/* ===================================== */}
                    {/* VIDEO */}
                    {/* ===================================== */}

                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      src={
                        isMobile
                          ? service.bgVideoMobile
                          : service.bgVideo
                      }
                      className="
                        absolute
                        inset-0
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-700
                        hover:scale-105
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
        })}

      </div>

    </section>
  );
};

export default InfiniteServicesMarquee;