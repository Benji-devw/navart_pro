import { useContext, useState } from 'react';
import Button from './ui/Button';
import '@styles/Hero.css';
import { ScrollObserverContext } from '@/App';
import { useInView } from 'react-intersection-observer';
import TimelineCV from '@components/TimelineCV';
import { experiences, formations } from '@/assets/experiencesData.json';

const Hero = () => {
  const { defaultInViewOptions } = useContext(ScrollObserverContext);
  const [ref, inView] = useInView(defaultInViewOptions);
  const [showCV, setShowCV] = useState(false);
  const mixExperiences = [...experiences, ...formations];

  const toggleCV = () => {
    setShowCV(!showCV);
  };

  return (
    <section id="hero" className="hero">
      <div className={`hero-content ${inView ? 'animate' : 'not-active'} ${showCV ? 'cv-mode' : ''}`} ref={ref}>
        <span className="hero-title-sub">Bonjour, je suis</span>
        <h1 className="hero-title">Benjamin Navarro</h1>
        <p className="hero-subtitle">Développeur web full stack</p>
        <div className="bnt-tabs">
          <Button variant="transparent" size="small" className={`bnt-tab`}>
            Contactez-moi
          </Button>
          <Button variant="transparent" size="small" className={`bnt-tab ${showCV ? 'active' : 'not-active'}`} onClick={toggleCV}>
            CV
          </Button>
        </div>
      </div>

      {showCV && (
        <div className={`hero-cv ${inView ? 'animate' : ''}`}>
          <div className="hero-profile">
            <p>Benjamin Navarro</p>
          </div>
          <div className="hero-timeline">
            <div className="hero-timeline-container">
              <TimelineCV experiences={mixExperiences} viewMode={'list'} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
