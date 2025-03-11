import { useEffect, useRef } from 'react';
import '@styles/Hero.css';

const Hero = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const currentRef = textRef.current;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content" ref={textRef}>
          <div className="hero-left">
            <div className="hero-text-container">
              <p className="hero-greeting">Bonjour, je m'appelle</p>
              <h1 className="hero-title">Benjare <span className="hero-title-highlight">Nom</span></h1>
              <div className="hero-roles">
                <div className="role-container">
                  <h2 className="hero-role">Développeur full stack</h2>
                  <h2 className="hero-role">Testeur QA</h2>
                </div>
              </div>
              <p className="hero-bio">
                Je conçois et développe des <span className="hero-highlight">expériences numériques</span> innovantes qui combinent créativité, 
                esthétique et fonctionnalité pour créer des sites web et des applications 
                performants qui <span className="hero-highlight">répondent aux besoins</span> des utilisateurs.
              </p>
              <div className="hero-buttons">
                <a href="#projects" className="btn btn-primary">
                  <span>Voir mes projets</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
                <a href="#contact" className="btn btn-secondary">
                  <span>Me contacter</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="hero-right">
            <div className="social-links">
              <a href="https://github.com/Benji-devw" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://gitlab.com/" target="_blank" rel="noopener noreferrer" aria-label="GitLab">
                <i className="fab fa-gitlab"></i>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
            
            <div className="tech-stack">
              <div className="tech-badge">React</div>
              <div className="tech-badge">Node.js</div>
              <div className="tech-badge">TypeScript</div>
              <div className="tech-badge">MongoDB</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-down">
        <a href="#about" aria-label="Scroll down">
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
      
      <div className="hero-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
    </section>
  );
};

export default Hero; 