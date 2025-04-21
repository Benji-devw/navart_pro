import { useState, useEffect, createContext } from 'react';
import './App.css';
import Hero from '@components/Hero';
import About from '@components/About';
import Skills from '@components/Skills';
import Projects from '@components/Projects';
import Layout from '@/components/ui/Layout';
import CookieConsent from '@/components/ui/CookieConsent';

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

  return (
    <CookieConsentContext.Provider value={{ cookieConsent, setConsent: handleConsentChange }}>
      <ScrollObserverContext.Provider value={{ defaultInViewOptions }}>
        <div className="app">
          <Layout onFilterChange={handleFilterChange} activeComponent={renderActiveComponent().type}>
            <main className="main-content">{renderActiveComponent().component}</main>
          </Layout>

          {/* Bannière de consentement des cookies au niveau de l'application */}
          <CookieConsent onConsentChange={handleConsentChange} />
        </div>
      </ScrollObserverContext.Provider>
    </CookieConsentContext.Provider>
  );
}

export default App;
