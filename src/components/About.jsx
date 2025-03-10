import { useEffect, useRef } from 'react';
import TimelineCV from '@components/TimelineCV';
import '@styles/About.css';
import { ContactBox } from '@/components/ContactBox';

const About = () => {
  const sectionRef = useRef(null);
  const experiences = [
    {
      id: 1,
      date: '2022 - Présent',
      title: 'Développeur Full Stack Senior',
      company: 'Entreprise Innovante',
      description:
        "Développement d'applications React et Node.js, gestion d'équipe, mise en place d'architectures microservices.",
    },
    {
      id: 2,
      date: '2020 - 2022',
      title: 'Développeur Front-End',
      company: 'Agence Web Créative',
      description:
        "Création d'interfaces utilisateur interactives avec React, intégration d'API RESTful, optimisation de performances.",
    },
    {
      id: 3,
      date: '2018 - 2020',
      title: 'Développeur JavaScript',
      company: 'Startup Tech',
      description: "Développement de fonctionnalités front-end avec Vue.js, collaboration avec l'équipe UX/UI.",
    },
    {
      id: 4,
      date: '2016 - 2018',
      title: 'Stage Développement Web',
      company: 'Agence Digitale',
      description:
        'Intégration de maquettes, développement de sites web responsifs, initiation aux frameworks JavaScript.',
    },
  ];

  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="about" className="about">
      <h2 className="section-title">À propos de moi</h2>
      <div className="about-content" ref={sectionRef}>
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
            <TimelineCV experiences={experiences} />
        </div>
      </div>

      <div className="about-contact-box about-contact-mobile">
        <ContactBox />
      </div>
    </section>
  );
};

export default About;
