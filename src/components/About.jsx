import { useContext } from 'react';
import TimelineCV from '@components/TimelineCV';
import '@styles/About.css';
import { ContactBox } from '@/components/ContactBox';
import { ScrollObserverContext } from '@/App';
import { useInView } from 'react-intersection-observer';
import experiencesData from '@/assets/experiencesData.json';

const About = () => {
  const { defaultInViewOptions } = useContext(ScrollObserverContext);
  const [ref, inView] = useInView(defaultInViewOptions);

  return (
    <section id="about" className="about">
      <h2 className="section-title">À propos de moi</h2>
      <div className={`about-content ${inView ? 'animate' : ''}`} ref={ref}>
        <div className="about-image">
          <div className="image-container">
            <img src="/Benjamin.png" alt="Benjamin" />
          </div>

          <div className="about-contact-box about-contact-desktop">
            <ContactBox />
          </div>
        </div>

        <div className="about-context">
          <div className="about-text">
            <h3>Qui suis-je ?</h3>
            <p>
              Je suis un développeur web passionné par la création d'expériences numériques exceptionnelles. Avec une
              solide formation en informatique et plusieurs années d'expérience, j'ai développé une expertise dans la
              conception et le développement de sites web et d'applications dynamiques.
            </p>
            <p>
              Mon approche combine créativité et rigueur technique pour livrer des produits qui non seulement
              fonctionnent parfaitement, mais offrent également une expérience utilisateur optimale.
            </p>
            <h3>Mon parcours</h3>
            <p>
              Après avoir obtenu mon diplôme en développement web, j'ai travaillé sur divers projets qui m'ont permis
              d'affiner mes compétences et d'élargir mon expertise. J'ai collaboré avec des startups, des agences et des
              entreprises établies, m'adaptant à différents environnements et méthodologies de travail.
            </p>
          </div>
          <TimelineCV experiences={experiencesData} />
        </div>
      </div>

      <div className="about-contact-box about-contact-mobile">
        <ContactBox />
      </div>
    </section>
  );
};

export default About;
