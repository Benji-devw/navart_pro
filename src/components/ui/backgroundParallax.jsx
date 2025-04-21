import { useState, useEffect, useRef } from 'react';
// import twoPlan from '@assets/images/two-plan.png';
// import threePlan from '@assets/images/three-plan.png';
import './BackgroundParallax.css';

const BackgroundParallax = ({ medias, forceTranslate }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!parallaxRef.current) return;

      // Calculer le centre de l'écran
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculer la distance entre la souris et le centre (en pourcentage)
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Utiliser forceTranslate pour définir l'intensité du mouvement
      // Si forceTranslate est 0, utiliser la valeur par défaut (-20)
      const intensity = forceTranslate || -20;

      // Convertir la position en pourcentage et appliquer l'intensité
      const moveX = ((mouseX - centerX) / centerX) * intensity;
      const moveY = ((mouseY - centerY) / centerY) * intensity;

      // Mettre à jour la position avec un léger délai pour un effet plus doux
      setPosition({ x: moveX, y: moveY });
    };

    // Ajouter l'écouteur d'événement pour le mouvement de la souris
    window.addEventListener('mousemove', handleMouseMove);

    // Nettoyer l'écouteur d'événement lors du démontage
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [forceTranslate]);

  // Calculer un style différent pour chaque image en fonction de son intensité
  const getParallaxStyle = (intensity, blur, opacity, zIndex) => {
    // Utiliser l'intensité fournie pour chaque média
    // Si l'intensité n'est pas définie, utiliser une valeur par défaut de 1 (100%)
    const intensityFactor = intensity ? intensity / 100 : 1;

    return {
      transform: `translate(${position.x * intensityFactor}px, ${position.y * intensityFactor}px)`,
      filter: `blur(${blur}px)`,
      opacity: opacity,
      zIndex: zIndex,
    };
  };

  return (
    <>
      <div className="background-aura" />
      <div className="background-parallax" ref={parallaxRef}>
        {medias.map(({ media, intensity, blur, opacity, zIndex }, index) => (
          <div
            key={index}
            className={`parallax-image layer-${index}`}
            style={getParallaxStyle(intensity, blur, opacity, zIndex)}
          >
            <img src={media} alt={`parallax-layer-${index}`} />
          </div>
        ))}
      </div>
    </>
  );
};

export default BackgroundParallax;


