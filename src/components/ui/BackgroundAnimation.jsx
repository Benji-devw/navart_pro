// Générer par l'IA

import { useEffect, useRef, useState } from 'react';
import '@styles/BackgroundAnimation.css';

const BackgroundAnimation = ({ 
  gridSize = 50, 
  pointColor = 'rgba(58, 134, 255, 0.2)',
  lineColor = 'rgba(58, 134, 255, 0.3)',
  connectionDistance = 100,
  interactionRadius = 150,
  interactionForce = 3
}) => {
  const canvasRef = useRef(null);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  
  // Utiliser une seule référence pour stocker toutes les données liées à l'animation
  const animationState = useRef({
    mouse: { x: 0, y: 0, isActive: false },
    animationId: null,
    autoAnimateId: null,
    timeoutId: null,
    points: [],
    width: 0,
    height: 0,
    isRunning: false,
    lastFrameTime: 0,
    frameCount: 0,
    fps: 0
  });

  // Détecter si l'appareil est en mode basse performance
  useEffect(() => {
    // Vérifier si l'appareil est un ordinateur portable ou un appareil mobile
    const isLaptop = window.matchMedia('(max-width: 1024px)').matches;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Vérifier les performances de l'appareil
    const checkPerformance = () => {
      const state = animationState.current;
      const now = performance.now();
      const elapsed = now - state.lastFrameTime;
      
      if (elapsed > 0) {
        state.fps = 1000 / elapsed;
        state.frameCount++;
        
        // Si le FPS est trop bas pendant plus de 30 frames, passer en mode basse performance
        if (state.fps < 30 && state.frameCount > 30) {
          setIsLowPerformance(true);
          // Réduire encore plus les ressources
          if (state.autoAnimateId) {
            clearInterval(state.autoAnimateId);
            state.autoAnimateId = setInterval(autoAnimate, 500); // Réduire la fréquence d'animation
          }
        }
      }
      
      state.lastFrameTime = now;
    };
    
    // Ajouter un écouteur pour vérifier les performances
    const performanceCheckInterval = setInterval(checkPerformance, 1000);
    
    // Si c'est un ordinateur portable ou un appareil mobile, commencer en mode basse performance
    if (isLaptop || isMobile) {
      setIsLowPerformance(true);
    }
    
    return () => {
      clearInterval(performanceCheckInterval);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const state = animationState.current;
    
    // S'assurer que nous ne démarrons pas plusieurs animations
    if (state.isRunning) {
      // Nettoyer toute animation précédente
      cancelAnimationFrame(state.animationId);
      clearInterval(state.autoAnimateId);
      clearTimeout(state.timeoutId);
    }
    
    // Marquer l'animation comme en cours d'exécution
    state.isRunning = true;
    
    // Fonction pour redimensionner le canvas
    const resizeCanvas = () => {
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      canvas.width = state.width;
      canvas.height = state.height;
      
      // Recréer les points lors du redimensionnement
      initPoints();
    };

    // Initialiser les points de la grille - avec une densité plus faible pour la performance
    const initPoints = () => {
      state.points = [];
      
      // Réduire la densité pour de meilleures performances
      // Augmenter la densité en mode basse performance
      const density = isLowPerformance ? 2.5 : 1.3;
      const cols = Math.floor(state.width / (gridSize * density)) + 2;
      const rows = Math.floor(state.height / (gridSize * density)) + 2;
      
      // Limiter le nombre total de points pour éviter les problèmes de performance
      // Réduire encore plus en mode basse performance
      const maxPoints = isLowPerformance ? 200 : 500;
      const totalPoints = cols * rows;
      const skipFactor = totalPoints > maxPoints ? Math.ceil(totalPoints / maxPoints) : 1;
      
      let pointCount = 0;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Sauter des points si nécessaire pour limiter le nombre total
          if (pointCount % skipFactor === 0) {
            state.points.push({
              x: i * gridSize * density,
              y: j * gridSize * density,
              originX: i * gridSize * density,
              originY: j * gridSize * density,
              vx: 0,
              vy: 0
            });
          }
          pointCount++;
        }
      }
    };

    // Fonction pour animer les points de manière optimisée
    const animate = () => {
      ctx.clearRect(0, 0, state.width, state.height);
      
      // Traitement par lots pour améliorer les performances
      // Augmenter la taille des lots en mode basse performance
      const batchSize = isLowPerformance ? 20 : 10;
      const totalPoints = state.points.length;
      
      // Traiter les points par lots
      for (let batchStart = 0; batchStart < totalPoints; batchStart += batchSize) {
        const batchEnd = Math.min(batchStart + batchSize, totalPoints);
        processBatch(batchStart, batchEnd);
      }
      
      // Planifier la prochaine frame uniquement si l'animation est toujours en cours
      if (state.isRunning) {
        state.animationId = requestAnimationFrame(animate);
      }
    };
    
    // Traiter un lot de points
    const processBatch = (start, end) => {
      ctx.fillStyle = pointColor;
      
      for (let i = start; i < end; i++) {
        const point = state.points[i];
        
        // Déplacer les points en fonction de la position de la souris
        const dx = state.mouse.x - point.x;
        const dy = state.mouse.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Appliquer une force d'interaction si la souris est suffisamment proche
        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius * interactionForce;
          point.vx += (dx / distance || 0) * force * 0.05;
          point.vy += (dy / distance || 0) * force * 0.05;
        }

        // Retour à la position d'origine (force de rappel)
        point.vx += (point.originX - point.x) * 0.03;
        point.vy += (point.originY - point.y) * 0.03;

        // Amortissement pour éviter les mouvements trop brusques
        point.vx *= 0.8;
        point.vy *= 0.8;

        // Mise à jour de la position
        point.x += point.vx;
        point.y += point.vy;

        // Dessiner le point
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Connecter les points proches, mais de manière optimisée
        // En mode basse performance, réduire le nombre de connexions
        if (!isLowPerformance || i % 2 === 0) {
          drawConnections(i, point);
        }
      }
    };
    
    // Dessiner les connexions de manière optimisée
    const drawConnections = (pointIndex, point) => {
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5; // Ligne plus fine pour de meilleures performances
      
      // Ne vérifier que les points les plus proches pour améliorer les performances
      // Réduire encore plus en mode basse performance
      const maxConnections = isLowPerformance ? 10 : 15;
      const startCheck = Math.max(0, pointIndex - maxConnections);
      const endCheck = Math.min(state.points.length, pointIndex + maxConnections);
      
      for (let j = startCheck; j < endCheck; j++) {
        if (j === pointIndex) continue;
        
        const nextPoint = state.points[j];
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
    };

    // Écouteur d'événement pour suivre la position de la souris
    const handleMouseMove = (e) => {
      state.mouse.x = e.clientX;
      state.mouse.y = e.clientY;
    };

    // Écouteur d'événement pour le touch sur mobile
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        state.mouse.x = e.touches[0].clientX;
        state.mouse.y = e.touches[0].clientY;
      }
    };

    // Animation subtile quand pas d'interaction, optimisée pour les performances
    const autoAnimate = () => {
      if (!state.mouse.isActive) {
        const time = Date.now() * 0.0003; // Plus lent pour moins de calculs
        state.mouse.x = (state.width / 2) + Math.cos(time) * (state.width / 6);
        state.mouse.y = (state.height / 2) + Math.sin(time * 1.3) * (state.height / 6);
      }
    };

    // Marquer l'interaction utilisateur
    const handleUserInteraction = () => {
      state.mouse.isActive = true;
      // Réinitialiser après un délai d'inactivité
      clearTimeout(state.timeoutId);
      state.timeoutId = setTimeout(() => {
        state.mouse.isActive = false;
      }, 3000);
    };

    // Initialiser le canvas et lancer l'animation
    resizeCanvas();
    
    // Définir la position initiale de la souris au centre pour l'animation auto
    state.mouse.x = window.innerWidth / 2;
    state.mouse.y = window.innerHeight / 2;
    
    // Démarrer l'animation
    animate();

    // Créer une animation automatique subtile, moins fréquente pour les performances
    // Réduire la fréquence en mode basse performance
    const autoAnimateInterval = isLowPerformance ? 500 : 100;
    state.autoAnimateId = setInterval(autoAnimate, autoAnimateInterval);

    // Ajouter les écouteurs d'événements
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mousemove', handleUserInteraction);
    window.addEventListener('touchmove', handleUserInteraction);

    // Nettoyage complet lors du démontage
    return () => {
      // Marquer l'animation comme terminée
      state.isRunning = false;
      
      // Nettoyer toutes les ressources
      cancelAnimationFrame(state.animationId);
      clearInterval(state.autoAnimateId);
      clearTimeout(state.timeoutId);
      
      // Supprimer tous les écouteurs d'événements
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousemove', handleUserInteraction);
      window.removeEventListener('touchmove', handleUserInteraction);
      
      // Libérer la mémoire
      state.points = [];
    };
  }, [gridSize, pointColor, lineColor, connectionDistance, interactionRadius, interactionForce, isLowPerformance]);

  return (
    <canvas
      ref={canvasRef}
      className="background-animation"
      aria-hidden="true"
    />
  );
};

export default BackgroundAnimation; 