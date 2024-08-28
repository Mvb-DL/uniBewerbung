import { lazy, Suspense, useEffect, useMemo, useState, useCallback } from "react";
import { loadSlim } from "@tsparticles/slim";

// Lazy load Particles component
const Particles = lazy(() => import("@tsparticles/react"));

const BackgroundEffect = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initParticles = async () => {
      const { initParticlesEngine } = await import("@tsparticles/react");
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });

      if (isMounted) {
        setInit(true);
      }
    };

    if (!init) {
      initParticles();
    }

    return () => {
      isMounted = false; // Cleanup function to avoid state updates on unmounted component
    };
  }, [init]);

  // Memoized options for particles to prevent unnecessary re-renders
  const options = useMemo(() => ({
    background: {
      color: {
        value: "#202226",
      },
    },
    fpsLimit: 60, // Lower FPS to reduce CPU usage
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse", // Adding a repulse effect for better UX
        },
      },
      modes: {
        push: {
          quantity: 2, // Lowering the number of particles added on click
        },
        repulse: {
          distance: 100, // Smaller repulse distance for less intensive interaction
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#6225e6",
      },
      links: {
        color: "#6225e6",
        distance: 300, // Reduced distance for links
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "out",
        },
        random: false,
        speed: 0.6, // Slower speed to reduce resource usage
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800, // Increase the area to reduce the number of particles per area unit
        },
        value: 80, // Reduced total number of particles
      },
      opacity: {
        value: 0.4,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 }, // Reduced size variation
      },
    },
    detectRetina: true,
  }), []);

  // Empty callback function, can be expanded to handle loaded particles state
  const particlesLoaded = useCallback((container) => {}, []);

  return (
    <div className="background-effect">
      {init && (
        <Suspense fallback={<div>Loading...</div>}>
          <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
        </Suspense>
      )}
    </div>
  );
};

export default BackgroundEffect;
