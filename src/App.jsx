import { useState, useEffect } from 'react';
import './App.css';
import Header from '@/components/ui/Header';
import Hero from '@components/Hero';
import About from '@components/About';
import Skills from '@components/Skills';
import Layout from '@/components/ui/Layout';
import Footer from '@/components/ui/Footer';
import BackgroundAnimation from '@components/BackgroundAnimation';
import FloatingContact from '@components/FloatingContact';
import Shapes from '@/components/ui/Shapes';
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
          </main>
          <Footer />
          <FloatingContact />
        </Layout>
      )}
    </div>
  );
}

export default App;
