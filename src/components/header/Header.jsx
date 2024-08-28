import React, { Suspense, useCallback, useMemo } from 'react';
import { Link } from "react-router-dom";
import { Linkedin, Github } from "../../assets/image";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import { useGlobalState } from "../../components/changeLang/ChangeLang";

const GLBViewer = React.lazy(() => import("../../components/model/Model"));

const Header = () => {
  const { data } = useGlobalState();
  const phoneNumber = '+49 1577 3633756';

  // Optimierte Funktion zum Kopieren in die Zwischenablage mit visuellem Feedback
  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Phone number copied to clipboard!');
      })
      .catch((error) => {
        console.error('Unable to copy text to clipboard:', error);
      });
  }, []);

  // Verwenden von useMemo, um das Header-Textarray vorab zu verarbeiten
  const processedHeaderText = useMemo(() => {
    return data.headerText?.map((item) => item.header_text);
  }, [data.headerText]);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content grid items-center">
          <div className="header-intro">
            <div className="flex items-end header-intro-wrapper">
              <h1 className="header-name">
                Mario von Bassen <br />Who says IT rules out creativity?
              </h1>
            </div>
            <p className="header-text text-white">
              {processedHeaderText}
            </p>
            <br />
            <ul className="contact-info-list grid text-white">
              <li className="grid items-start info-item">
                <span className="info-item-icon">
                  <FaEnvelope size={13} />
                </span>
                <p className="info-item-text">
                  <span className="text">
                    <a href="mailto:mariovonbassen@gmail.com">mariovonbassen@gmail.com</a>
                  </span>
                </p>
              </li>
              <li className="grid items-start info-item">
                <span className="info-item-icon">
                  <FaPhone size={13} />
                </span>
                <p className="info-item-text">
                  <span className="text" onClick={() => copyToClipboard(phoneNumber)} aria-label="Copy phone number to clipboard">
                    +49 1577 3633756
                  </span>
                </p>
              </li>
            </ul>
            <ul className="contact-social-list flex items-center">
              <li className="social-item">
                <a href="https://www.linkedin.com/in/mario-von-bassen-3797831ba/" target="_blank" rel="noopener noreferrer">
                  <img src={Linkedin} alt="LinkedIn Icon" loading="lazy" />
                  <span className="tooltip text">Linkedin</span>
                </a>
              </li>
              <li className="social-item">
                <a href="https://github.com/Mvb-DL" target="_blank" rel="noopener noreferrer">
                  <img src={Github} alt="GitHub Icon" loading="lazy" />
                  <span className="tooltip text">Github</span>
                </a>
              </li>
              <li className="social-item">
                <a className="website-code" target="_blank" rel="noopener noreferrer" href="https://github.com/Mvb-DL/ApplicationWebsite/tree/main">
                  Website-Code
                </a>
              </li>
            </ul>
          </div>
          <div className="header-contact">
            {/* Lazy loading des GLBViewers mit einem Suspense fallback */}
            <Suspense fallback={<div className="loading-spinner">Loading 3D Model...</div>}>
              <GLBViewer />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
};

// Verwenden von React.memo, um unnötige Neurenderings zu vermeiden
export default React.memo(Header);
