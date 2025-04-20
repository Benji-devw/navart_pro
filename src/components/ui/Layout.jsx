import React, { useState } from 'react';
import './Layout.css';
// import BackgroundAnimation from '@components/ui/BackgroundAnimation';
import BackgroundParallax from '@/components/ui/backgroundParallax';
import Header from '@/components/ui/Header';
import { ContactForm } from '@components/ContactForm';
// import video from '@assets/earth.mp4';
import onePlan from '@assets/images/one-plan-color.png';
import twoPlan from '@assets/images/two-plan-color.png';
import threePlan from '@assets/images/three-plan-light.png';
import fourPlan from '@assets/images/four-plan-dark.png';

const Layout = ({ children, onFilterChange, activeComponent }) => {
  const [medias, setMedias] = useState([
    { media: onePlan, intensity: 80, blur: 0, opacity: .04, zIndex: -1 },
    { media: twoPlan, intensity: 30, blur: 2, opacity: .2, zIndex: -2 },
    { media: threePlan, intensity: 0, blur: 1, opacity: 1, zIndex: -3 },
    { media: fourPlan, intensity: 10, blur: 0, opacity: .05, zIndex: -4 },
  ]);

  return (
    <div className="layout">
      <Header onFilterChange={onFilterChange} />

      {/* {activeComponent === 'hero' && (
        <video src={video} autoPlay muted loop className="hero-video" />
      )} */}

      <BackgroundParallax medias={medias} forceTranslate={100} />

      {/* <BackgroundAnimation
          gridSize={60}
          pointColor={activeComponent === 'hero' ? 'rgb(0, 0, 0)' : 'rgb(158, 158, 158)'}
          lineColor={activeComponent === 'hero' ? 'rgb(0, 0, 0)' : 'rgb(95, 95, 95)'}
          connectionDistance={80}
          interactionRadius={210}
          interactionForce={-22}
        /> */}

      <div className="layout-container">{children}</div>

      <ContactForm />

    </div>
  );
};

export default Layout;
