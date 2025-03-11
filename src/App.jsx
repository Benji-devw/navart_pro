import { useState, useEffect } from 'react';
import Header from '@components/Header';
import Hero from '@components/Hero';
import About from '@components/About';
import Skills from '@components/Skills';
import Layout from '@components/Layout';
import Contact from '@components/Contact';
import BackgroundAnimation from '@components/BackgroundAnimation';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un temps de chargement pour l'animation d'entrée
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`app ${isLoading ? 'loading' : 'loaded'}`}>
      {isLoading ? (
        <div className="loader">
          <div className="loader-spinner"></div>
        </div>
      ) : (
        <Layout>
          <BackgroundAnimation
            gridSize={60}
            pointColor = {'rgb(44, 44, 44)'}
            lineColor = {'rgb(48, 48, 48)'}
            connectionDistance={80}
            interactionRadius={210}
            interactionForce={-22}
          />

          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
          </main>
          <footer className="footer">
            <Contact />
            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} - Navarro Benjamin. Tous droits réservés.</p>
            </div>
          </footer>
        </Layout>
      )}
    </div>
  );
}

export default App;
