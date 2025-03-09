import { useEffect, useRef } from 'react';
import '../styles/BackgroundAnimation.css';

const BackgroundAnimation = ({ 
  gridSize = 50, 
  pointColor = 'rgba(58, 134, 255, 0.05)',
  lineColor = 'rgba(58, 134, 255, 0.15)',
  connectionDistance = 100,
  interactionRadius = 150,
  interactionForce = 3
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let points = [];
    let width, height;

    // Fonction pour redimensionner le canvas
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Recréer les points lors du redimensionnement
      initPoints();
    };

    // Initialiser les points de la grille
    const initPoints = () => {
      points = [];
      const cols = Math.floor(width / gridSize) + 2;
      const rows = Math.floor(height / gridSize) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          points.push({
            x: i * gridSize,
            y: j * gridSize,
            originX: i * gridSize,
            originY: j * gridSize,
            vx: 0,
            vy: 0
          });
        }
      }
    };

    // Fonction pour animer les points
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = pointColor;
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      // Dessiner les lignes entre les points
      for (let i = 0; i < points.length; i++) {
        // Déplacer les points en fonction de la position de la souris
        const point = points[i];
        const dx = mouseRef.current.x - point.x;
        const dy = mouseRef.current.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Appliquer une force d'interaction si la souris est suffisamment proche
        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius * interactionForce;
          point.vx += (dx / distance || 0) * force;
          point.vy += (dy / distance || 0) * force;
        }

        // Retour à la position d'origine (force de rappel)
        point.vx += (point.originX - point.x) * 0.05;
        point.vy += (point.originY - point.y) * 0.05;

        // Amortissement
        point.vx *= 0.9;
        point.vy *= 0.9;

        // Mise à jour de la position
        point.x += point.vx;
        point.y += point.vy;

        // Dessiner le point
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Connecter les points proches
        for (let j = i + 1; j < points.length; j++) {
          const nextPoint = points[j];
          const dx = point.x - nextPoint.x;
          const dy = point.y - nextPoint.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            // Plus la distance est grande, plus la ligne est transparente
            const opacity = 1 - (dist / connectionDistance);
            ctx.beginPath();
            ctx.strokeStyle = lineColor.replace(')', `, ${opacity})`).replace('rgba', 'rgba');
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(nextPoint.x, nextPoint.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Écouteur d'événement pour suivre la position de la souris
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    // Écouteur d'événement pour le touch sur mobile
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    // Animation subtile quand pas d'interaction
    const autoAnimate = () => {
      if (!mouseRef.current.isActive) {
        const time = Date.now() * 0.001;
        mouseRef.current.x = (width / 2) + Math.cos(time) * 100;
        mouseRef.current.y = (height / 2) + Math.sin(time) * 100;
      }
    };

    // Marquer l'interaction utilisateur
    const handleUserInteraction = () => {
      mouseRef.current.isActive = true;
      // Réinitialiser après un délai d'inactivité
      clearTimeout(mouseRef.current.timeout);
      mouseRef.current.timeout = setTimeout(() => {
        mouseRef.current.isActive = false;
      }, 3000);
    };

    // Initialiser le canvas et lancer l'animation
    resizeCanvas();
    animate();

    // Créer une animation automatique subtile
    setInterval(autoAnimate, 50);

    // Ajouter les écouteurs d'événements
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mousemove', handleUserInteraction);
    window.addEventListener('touchmove', handleUserInteraction);

    // Nettoyage
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousemove', handleUserInteraction);
      window.removeEventListener('touchmove', handleUserInteraction);
      clearTimeout(mouseRef.current.timeout);
    };
  }, [gridSize, pointColor, lineColor, connectionDistance, interactionRadius, interactionForce]);

  return (
    <canvas
      ref={canvasRef}
      className="background-animation"
      aria-hidden="true"
    />
  );
};

export default BackgroundAnimation; 