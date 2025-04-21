import { useState, useEffect, useRef } from 'react';
import './BackgroundParallax.css';

const BackgroundParallax = ({ medias, forceTranslate }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const parallaxRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if the device is mobile at loading and during resizing
  useEffect(() => {
    const checkIfMobile = () => {
      // Check if the device is mobile with the screen width and user agent
      const isMobileScreen = window.innerWidth <= 768;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileScreen || isMobileDevice);
    };

    // Check immediately
    checkIfMobile();

    // Check again when the window is resized
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  useEffect(() => {
    // Do not add the event listener on mobile
    if (isMobile) return;

    const handleMouseMove = (e) => {
      if (!parallaxRef.current) return;

      // Calculate the center of the screen
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate the distance between the mouse and the center (in percentage)
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Define the intensity of the movement
      // If forceTranslate is 0, use the default value (-20)
      const intensity = forceTranslate || -20;
      
      // Convert the position to a percentage and apply the intensity
      const moveX = ((mouseX - centerX) / centerX) * intensity;
      const moveY = ((mouseY - centerY) / centerY) * intensity;
      
      // Update the position with a slight delay for a smoother effect
      setPosition({ x: moveX, y: moveY });
    };

    // Add the event listener for the mouse movement only on desktop
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [forceTranslate, isMobile]); // Ajouter isMobile comme dépendance

  // Calculate a different style for each image based on its intensity
  // Do not apply transformation if mobile
  const getParallaxStyle = (intensity, blur, opacity, zIndex) => {
    // Base style
    const baseStyle = {
      filter: `blur(${blur}px)`,
      opacity: opacity,
      zIndex: zIndex,
    };

    // If mobile, return only the base style without transformation
    if (isMobile) {
      return baseStyle;
    }

    // If desktop, add parallax transformation
    const intensityFactor = intensity ? intensity / 100 : 1;
    return {
      ...baseStyle,
      transform: `translate(${position.x * intensityFactor}px, ${position.y * intensityFactor}px)`,
    };
  };

  // useEffect(() => {
  //   console.log('Mode mobile détecté:', isMobile);
  // }, [isMobile]);

  return (
    <>
      <div className={`background-aura ${isMobile ? 'mobile' : ''}`} />
      <div className={`background-parallax ${isMobile ? 'mobile' : ''}`} ref={parallaxRef}>
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


