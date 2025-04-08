import { useState, useContext } from 'react';
import TimelineCV from '@components/TimelineCV';
import '@styles/About.css';
import { ContactBox } from '@/components/ContactBox';
import { ScrollObserverContext } from '@/App';
import { useInView } from 'react-intersection-observer';
import { experiences, formations } from '@/assets/experiencesData.json';

const About = () => {
  const { defaultInViewOptions } = useContext(ScrollObserverContext);
  const [ref, inView] = useInView(defaultInViewOptions);
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' ou 'list'

  const changeViewMode = (mode) => {
    setViewMode(mode);
  };

  const mixExperiences = [...experiences, ...formations];

  return (
    <section id="about" className="about-section">
      <h2 className="section-title">À propos de moi</h2>
      <div className={`about-content ${inView ? 'animate' : ''}`} ref={ref}>
        <div className="about-image">
          <div className="image-container">
            <img src="/profile.png" alt="Benjamin" />
          </div>

          <div className="about-contact-box about-contact-desktop">
            <ContactBox />
          </div>
        </div>

        <div className="about-context">
          <div className="about-text">
            <h3>Qui suis-je ?</h3>
            <p>
              Je suis Benjamin, un développeur passionné par l’informatique, sa conception et son évolution, je suis
              très ambitieux et constamment en recherche de connaissances dans ce que j'entreprends avec le métier de
              <b> développeur web</b>. Je suis à la <b>recherche de nouvelles opportunités</b> pour continuer à évoluer
              et contribuer.
            </p>
            <h3>Mon parcours</h3>
            <p>
              Avec 5 ans de background en programmation web, dont <b>2 ans d'expériences</b> en alternance en tant que Testeur
              QA et <b>2 mois de stage</b> comme Intégrateur web, je suis toujours aussi passionnée par ce domaine.
            </p>
          </div>

          <div className="about-timeline">
            <div className="timeline-header">
              {/* <h3>Mon parcours professionnel</h3> */}
              <div className="timeline-controls">
                <div className="view-mode-toggle">
                  <button
                    className={`view-mode-btn ${viewMode === 'timeline' ? 'active' : ''}`}
                    onClick={() => changeViewMode('timeline')}
                    aria-label="Afficher en mode timeline"
                  >
                    <i className="fas fa-timeline fa-rotate-90"></i>
                  </button>
                  <button
                    className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => changeViewMode('list')}
                    aria-label="Afficher en mode liste"
                  >
                    <i className="fa-solid fa-th-list"></i>
                  </button>
                </div>
              </div>
            </div>
            <TimelineCV experiences={mixExperiences} viewMode={viewMode} />
          </div>
        </div>
      </div>

      <div className="about-contact-box about-contact-mobile">
        <ContactBox />
      </div>
    </section>
  );
};

export default About;
