import { useState, useEffect, createContext } from 'react';
import './App.css';
import Hero from '@components/Hero';
import About from '@components/About';
import Skills from '@components/Skills';
import Projects from '@components/Projects';
import Layout from '@/components/ui/Layout';
import CookieConsent from '@/components/ui/CookieConsent';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import SchemaData from '@/components/ui/SchemaData';

// Context for managing scroll and cookie consent
export const ScrollObserverContext = createContext(null);
export const CookieConsentContext = createContext(null);

function App() {
  const [activeView, setActiveView] = useState(localStorage.getItem('activeIcon') || '');
  const [cookieConsent, setCookieConsent] = useState(false);

  // Default options for scroll observation
  const defaultInViewOptions = {
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '0px 0px -100px 0px',
  };

  // Effect to check the stored consent at initial load
  useEffect(() => {
    // Check if the consent already exists in the localStorage
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent === 'accepted') {
      setCookieConsent(true);
    }
  }, []);

  // Function to handle the consent change
  const handleConsentChange = (hasConsented) => {
    setCookieConsent(hasConsented);
  };

  // Function to change the active view
  const handleFilterChange = (sectionName) => {
    if (cookieConsent) {
      localStorage.setItem('activeIcon', sectionName);
    }
    setActiveView(sectionName);
  };

  // Function to return only the selected component
  const renderActiveComponent = () => {
    switch (activeView) {
      case 'hero':
        return { type: 'hero', component: <Hero /> };
      case 'about':
        return { type: 'about', component: <About /> };
      case 'skills':
        return { type: 'skills', component: <Skills /> };
      case 'projects':
        return { type: 'projects', component: <Projects /> };
      default:
        return { type: 'hero', component: <Hero /> };
    }
  };

  // Générer le titre et la description basés sur la vue active
  const getMetaTitle = () => {
    switch (renderActiveComponent().type) {
      case 'hero':
        return 'Navart | Accueil - Portfolio de développement web';
      case 'about':
        return 'Navart | À propos - Portfolio de développement web';
      case 'skills':
        return 'Navart | Compétences - Portfolio de développement web';
      case 'projects':
        return 'Navart | Projets - Portfolio de développement web';
      default:
        return 'Navart | Portfolio de développement web';
    }
  };

  const getMetaDescription = () => {
    switch (renderActiveComponent().type) {
      case 'hero':
        return 'Portfolio de Navarro Benjamin - Développeur web créatif spécialisé en React et technologies modernes';
      case 'about':
        return 'Découvrez le parcours et l\'expérience de Navarro Benjamin, développeur web passionné par les technologies web modernes';
      case 'skills':
        return 'Explorez les compétences techniques et domaines d\'expertise de Navarro Benjamin en développement frontend et backend';
      case 'projects':
        return 'Découvrez les projets réalisés par Navarro Benjamin, présentant ses compétences en développement web et design';
      default:
        return 'Portfolio de développement web de Navarro Benjamin - Spécialiste en React, Node.js et design responsive';
    }
  };

  return (
    <HelmetProvider>
      <CookieConsentContext.Provider value={{ cookieConsent, setConsent: handleConsentChange }}>
        <ScrollObserverContext.Provider value={{ defaultInViewOptions }}>
          <div className="app">
            <Helmet>
              <title>{getMetaTitle()}</title>
              <meta name="description" content={getMetaDescription()} />
              <meta name="keywords" content="développeur web, portfolio, React, frontend, backend, Navarro Benjamin" />
              <meta name="author" content="Navarro Benjamin" />
              <meta property="og:title" content={getMetaTitle()} />
              <meta property="og:description" content={getMetaDescription()} />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://navart.dev" />
              <meta property="og:image" content="/logo.png" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content={getMetaTitle()} />
              <meta name="twitter:description" content={getMetaDescription()} />
              <meta name="twitter:image" content="/logo.png" />
              <link rel="canonical" href="https://navart.dev" />
            </Helmet>
            
            <SchemaData />
            
            <Layout onFilterChange={handleFilterChange} activeComponent={renderActiveComponent().type}>
              <main className="main-content">{renderActiveComponent().component}</main>
            </Layout>

            {/* Bannière de consentement des cookies au niveau de l'application */}
            <CookieConsent onConsentChange={handleConsentChange} />
          </div>
        </ScrollObserverContext.Provider>
      </CookieConsentContext.Provider>
    </HelmetProvider>
  );
}

export default App;
