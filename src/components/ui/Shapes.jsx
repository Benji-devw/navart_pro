import React from 'react';
import './Shapes.css';

/**
 * Composant Shapes réutilisable pour créer des formes décoratives
 * @param {Object} props - Les propriétés du composant
 * @param {string} [props.className] - Classes CSS additionnelles
 * @param {string} [props.variant='default'] - Variante des formes ('default', 'minimal', 'colorful')
 * @param {number} [props.count=4] - Nombre de formes à afficher (1-6)
 * @param {boolean} [props.animate=true] - Activer/désactiver les animations
 * @param {string} [props.position='default'] - Position des formes ('default', 'top', 'bottom', 'left', 'right')
 * @param {Object} [props.style] - Styles CSS inline additionnels
 * @returns {JSX.Element} Composant Shapes
 */
const Shapes = ({
  className = '',
  variant = 'default',
  count = count ,
  animate = true,
  position = 'default',
  style = {},
  ...restProps
}) => {
  // Limiter le nombre de formes entre 1 et 6
  const shapeCount = Math.min(Math.max(count, 1), 6);
  
  // Générer les classes CSS en fonction des props
  const containerClassName = `
    shapes-container 
    ${className} 
    variant-${variant} 
    position-${position}
    ${animate ? 'animated' : 'static'}
  `;

  // Générer les formes en fonction du nombre demandé
  const renderShapes = () => {
    const shapes = [];
    for (let i = 1; i <= shapeCount; i++) {
      shapes.push(
        <div 
          key={i} 
          className={`shape shape-${i}`}
          style={variant === 'custom' && restProps[`shapeStyle${i}`] ? restProps[`shapeStyle${i}`] : {}}
        />
      );
    }
    return shapes;
  };

  return (
    <div className={containerClassName} style={style} {...restProps}>
      {renderShapes()}
    </div>
  );
};

export default Shapes;