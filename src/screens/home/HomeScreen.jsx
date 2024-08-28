import React, { useState, useEffect, useRef, Suspense, lazy, useMemo } from 'react';
import { Helmet } from "react-helmet";
import { useMediaQuery } from 'react-responsive';
import { GlobalStateProvider } from "../../components/changeLang/ChangeLang";
import CookieConsent from "../../components/cookieConsent/CookieConsent";
import MediaPopUp from "../../components/MediaPopUp/mediaPopUp";

// Lazy load components
const BackgroundEffect = lazy(() => import("../../components/background_effect/BackgroundEffect"));
const Education = lazy(() => import("../../components/education/Education"));
const Experience = lazy(() => import("../../components/experience/Experience"));
const Header = lazy(() => import("../../components/header/Header"));
const Skill = lazy(() => import("../../components/skill/Skill"));
const LangOptions = lazy(() => import("../../components/langOptions/LangOptions"));
const OtherSkills = lazy(() => import("../../components/otherSkills/OtherSkills"));
const Biopic = lazy(() => import("../../components/Biopic/Biopic"));
const Projects = lazy(() => import("../../components/projects/Projects"));
const LifeLine = lazy(() => import("../../components/lifeLine/LifeLine"));
const RandomFacts = lazy(() => import("../../components/randomFacts/RandomFacts"));

const HomeScreen = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const skillRef = useRef(null);
  const projectRef = useRef(null);

  useEffect(() => {
    setIsModalOpen(isMobile);
  }, [isMobile]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalStyle = useMemo(() => ({
    color: "#fff",
    background: "#6225E6",
    marginTop: "3%",
    padding: "3px",
    borderRadius: "5px"
  }), []);

  // Lade das 3D-Skript, nachdem alle anderen Inhalte gerendert wurden
  useEffect(() => {
    if (isScriptLoaded) {
      const script = document.createElement('script');
      script.src = "./js/three.js";
      script.type = "text/javascript";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        console.log("3D script loaded");
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isScriptLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => setIsScriptLoaded(true), 5000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-container">
      <MediaPopUp isOpen={isModalOpen} onClose={closeModal}>
        <h2>Bessere Experience auf dem Desktop</h2>
        <p>Für eine bessere Website-Experience bitte auf einem Desktop öffnen!</p>
        <button style={modalStyle} onClick={closeModal}>Close</button>
      </MediaPopUp>

      <CookieConsent />

      <GlobalStateProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <BackgroundEffect />
          <LangOptions />
          <Header />
          <Biopic
            refs={{
              experienceRef: experienceRef,
              educationRef: educationRef,
              skillRef: skillRef,
              projectRef: projectRef
            }}
          />
          <Experience ref={experienceRef} />
          {/*<RandomFacts /> */}
          <Education ref={educationRef} />
          <Skill ref={skillRef} />
          <OtherSkills />
          <Projects ref={projectRef} />
          <LifeLine />
        </Suspense>
      </GlobalStateProvider>

      {!isScriptLoaded && (
        <div className="script-placeholder" style={{ width: "100%", height: "100%" }}>
          Loading 3D experience...
        </div>
      )}

      {isScriptLoaded && (
        <Helmet>
          <script src="./js/three.js" type="text/javascript" async defer />
        </Helmet>
      )}
    </div>
  );
}

export default React.memo(HomeScreen);
