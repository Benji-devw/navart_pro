import { useEffect, useRef } from 'react';
import '../styles/About.css';

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">À propos de moi</h2>
        <div className="about-content" ref={sectionRef}>
          <div className="about-image">
            <div className="image-container">
              <img src="/profile-placeholder.jpg" alt="Votre Nom" />
            </div>
          </div>
          <div className="about-text">
            <h3>Qui suis-je ?</h3>
            <p>
              Je suis un développeur web passionné par la création d'expériences numériques 
              exceptionnelles. Avec une solide formation en informatique et plusieurs années 
              d'expérience, j'ai développé une expertise dans la conception et le développement 
              de sites web et d'applications dynamiques.
            </p>
            <p>
              Mon approche combine créativité et rigueur technique pour livrer des produits 
              qui non seulement fonctionnent parfaitement, mais offrent également une expérience 
              utilisateur optimale.
            </p>
            <h3>Mon parcours</h3>
            <p>
              Après avoir obtenu mon diplôme en développement web, j'ai travaillé sur divers 
              projets qui m'ont permis d'affiner mes compétences et d'élargir mon expertise.
              J'ai collaboré avec des startups, des agences et des entreprises établies, 
              m'adaptant à différents environnements et méthodologies de travail.
            </p>
            <div className="about-details">
              <div className="detail">
                <i className="fas fa-map-marker-alt"></i>
                <span>Paris, France</span>
              </div>
              <div className="detail">
                <i className="fas fa-envelope"></i>
                <span>votre.email@example.com</span>
              </div>
              <div className="detail">
                <i className="fas fa-graduation-cap"></i>
                <span>Master en Développement Web</span>
              </div>
            </div>
            <a href="/cv.pdf" className="btn" target="_blank" rel="noopener noreferrer">
              Télécharger mon CV <i className="fas fa-download"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 