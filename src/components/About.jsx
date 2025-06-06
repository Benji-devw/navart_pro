import { useState, useContext } from 'react';
import TimelineCV from '@components/TimelineCV';
import '@styles/About.css';
import { ContactBox } from '@/components/ContactBox';
import { ScrollObserverContext } from '@/App';
import { useInView } from 'react-intersection-observer';
import { experiences, formations } from '@/assets/experiencesData.json';
import AvatarSlider from '@/components/AvatarSlider';

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
      <div className={`about-content ${inView ? 'animate' : 'not-active'}`} ref={ref}>
        <div className="about-avatar">
          <div className="avatar-container">
            <AvatarSlider
              startPosition={90}
              size="medium"
              image1="/avatar.png"
              image2="/avatar_anim.png"
              alt="avatar"
            />
          </div>

          <div className="about-contact-box about-contact-desktop">
            <ContactBox />
          </div>
        </div>

        <div className="about-context">
          <div className="about-text">
            <h3>Qui suis-je ?</h3>
            <p>
              Je suis Benjamin, développeur web spécialisé dans la création de <b>solutions digitales</b> et  <b>testeur QA</b> en
              environnements VR et WEB.
              <br />
              Suite à une reconversion professionnelle réussie, je combine un regard neuf avec une solide maîtrise
              technique en tant que <b>développeur web</b>.
              <br />
              Je suis à la <b>recherche d'opportunités stimulantes</b> pour déployer mes compétences et contribuer à des projets ambitieux et stimulants.
            </p>
            <h3>Mon parcours</h3>
            <p>
              Avec 5 ans d'immersion dans la programmation web, en <b>Assurance Qualité</b> et <b>intégration web</b>, je viens de finaliser ma reconversion professionnelle et
              suis prêt à relever de nouveaux défis dans ce secteur en constante évolution.
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
                    tabIndex="0"
                  >
                    <i className="fas fa-timeline fa-rotate-90"></i>
                  </button>
                  <button
                    className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => changeViewMode('list')}
                    aria-label="Afficher en mode liste"
                    tabIndex="0"
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
