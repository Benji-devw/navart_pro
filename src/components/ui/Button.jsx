import { forwardRef } from 'react';
import './Button.css';
/**
 * Composant Button réutilisable
 * @param {Object} props - Les propriétés du bouton
 * @param {string} [props.variant='primary'] - La variante du bouton (primary, secondary, outline, text)
 * @param {string} [props.size='medium'] - La taille du bouton (small, medium, large)
 * @param {boolean} [props.fullWidth=false] - Si le bouton doit prendre toute la largeur disponible
 * @param {string} [props.className=''] - Classes CSS additionnelles
 * @param {React.ReactNode} props.children - Le contenu du bouton
 * @param {React.Ref} ref - Référence React
 */
const Button = forwardRef(
  ({ variant = 'primary', size = 'medium', fullWidth = false, className = '', children, ...props }, ref) => {
    const buttonClasses = ['btn', `btn-${variant}`, `btn-${size}`, fullWidth ? 'btn-full-width' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <button className={buttonClasses} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
