import { useState, createContext } from 'react';
import './App.css';
import Header from '@components/ui/Header';
import Hero from '@components/Hero';
import About from '@components/About';
import Skills from '@components/Skills';
import Projects from '@components/Projects';
import Layout from '@/components/ui/Layout';
import Contact from '@components/ContactForm';

// Restaurer le contexte qui était utilisé ailleurs dans l'application
export const ScrollObserverContext = createContext(null);

function App() {
  const [activeView, setActiveView] = useState('hero');

  // Configuration par défaut pour InView (restaurée de l'ancien code)
  const defaultInViewOptions = {
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '0px 0px -100px 0px',
  };

  // Fonction pour changer la vue active
  const handleFilterChange = (sectionName) => {
    setActiveView(sectionName);
    // Optionnel: Si vous voulez toujours scrolle à la section, décommentez cette ligne
    // document.getElementById(sectionName)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fonction pour renvoyer uniquement le composant sélectionné
  const renderActiveComponent = () => {
    switch (activeView) {
      case 'hero':
        return <Hero />;
      case 'about':
        return <About />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects />;
      default:
        return <Hero />;
    }
  };

  return (
    <ScrollObserverContext.Provider value={{ defaultInViewOptions }}>
      <div className="app">
        <Layout>
          <Header onFilterChange={handleFilterChange} />
          <main className="main-content">
            {renderActiveComponent()}
          </main>
          <Contact />
        </Layout>
      </div>
    </ScrollObserverContext.Provider>
  );
}

export default App;
