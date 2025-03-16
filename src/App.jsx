import { useState, useEffect, createContext } from 'react';
import './App.css';
import Header from '@/components/ui/Header';
import Hero from '@components/Hero';
import About from '@components/About';
import Skills from '@components/Skills';
import Projects from '@components/Projects';
import Layout from '@/components/ui/Layout';
import Footer from '@/components/ui/Footer';
import BackgroundAnimation from '@components/BackgroundAnimation';
import Contact from '@components/ContactForm';
import Shapes from '@/components/ui/Shapes';

// Créer un contexte pour l'observer
export const ScrollObserverContext = createContext(null);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Configuration par défaut pour InView
  const defaultInViewOptions = {
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '0px 0px -100px 0px',
  };

  useEffect(() => {
    // Simuler un temps de chargement pour l'animation d'entrée
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollObserverContext.Provider value={{ defaultInViewOptions }}>
      <div className={`app ${isLoading ? 'loading' : 'loaded'}`}>
        {isLoading ? (
          <div className="loader">
            <div className="loader-spinner"></div>
          </div>
        ) : (
          <Layout>
            <Shapes variant="colorful" count={4} />
            <BackgroundAnimation
              gridSize={60}
              pointColor={'rgb(44, 44, 44)'}
              lineColor={'rgb(48, 48, 48)'}
              connectionDistance={80}
              interactionRadius={210}
              interactionForce={-22}
            />
            <Header />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
            </main>
            <Footer />
            <Contact />
          </Layout>
        )}
      </div>
    </ScrollObserverContext.Provider>
  );
}

export default App;
