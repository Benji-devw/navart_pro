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
            pointColor="rgba(58, 134, 255, 0.05)"
            lineColor="rgba(58, 134, 255, 0.15)"
            connectionDistance={120}
            interactionRadius={200}
            interactionForce={4}
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
              <p>&copy; {new Date().getFullYear()} - Mon Portfolio. Tous droits réservés.</p>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}

export default App
