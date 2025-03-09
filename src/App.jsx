import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import BackgroundAnimation from './components/BackgroundAnimation'
import './styles/main.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simuler un temps de chargement pour l'animation d'entrée
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`app ${isLoading ? 'loading' : 'loaded'}`}>
      {isLoading ? (
        <div className="loader">
          <div className="loader-spinner"></div>
        </div>
      ) : (
        <>
          <BackgroundAnimation 
            gridSize={60}
            pointColor="rgba(58, 134, 255, 0.35)"
            lineColor="rgba(150, 58, 255, 0.3)"
            connectionDistance={60}
            interactionRadius={250}
            interactionForce={22}
          />
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            {/* Vous pourrez ajouter d'autres sections ici comme Projects et Contact */}
          </main>
          <footer className="footer">
            <div className="container">
              <p>&copy; {new Date().getFullYear()} - Navarro Benjamin. Tous droits réservés.</p>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}

export default App
