import { useContext } from 'react';
// import Button from './ui/Button';
import '@styles/Hero.css';
import { ScrollObserverContext } from '@/App';
import { useInView } from 'react-intersection-observer';
import RenderIcon from '@hooks/RenderIcon';
import { frontendSkills, backendSkills, toolsSkills } from '@assets/skillsData.json';
import DraggableScroll from '@components/ui/DraggableScroll';


const Hero = () => {
  const { defaultInViewOptions } = useContext(ScrollObserverContext);
  const [ref, inView] = useInView(defaultInViewOptions);
  
  // Limiter le nombre de compétences affichées pour optimiser les performances
  const limitedFrontend = frontendSkills.slice(0, 8);
  const limitedBackend = backendSkills.slice(0, 6);
  const limitedTools = toolsSkills.slice(0, 6);
  const techStack = [...limitedFrontend, ...limitedBackend, ...limitedTools];

  return (
    <section id="hero" className="hero">
      <div className={`hero-container ${inView ? 'animate' : 'not-active'}`} ref={ref}>
        <div className="hero-content">
          <span className="hero-title-sub">Bonjour, je suis</span>
          <h1 className="hero-title">Benjamin Navarro</h1>
          <p className="hero-subtitle">Développeur Web & Testeur QA</p>
          
          {/* <div className="bnt-tabs">
            <Button variant="transparent" size="small" className={`bnt-tab`}>
              Contactez-moi
            </Button>
          </div> */}
        </div>

        <DraggableScroll
          className="hero-stack-container"
          dragSpeed={1.5} // Réduire la vitesse pour plus de stabilité
          maskGradient="linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
        >
          {techStack.map((tech, index) => (
            <div
              className="stack-icon"
              key={index}
              data-tooltip={tech.name}
            >
              {RenderIcon(tech.icon, '50px')}
            </div>
          ))}
        </DraggableScroll>
      </div>
    </section>
  );
};

export default Hero;
