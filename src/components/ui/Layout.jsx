import React from 'react';
import './Layout.css';
import BackgroundParallax from '@/components/ui/backgroundParallax';
import { Header } from '@/components/ui/Header';
import { ContactForm } from '@components/ContactForm';
// import video from '@assets/earth.mp4';
import onePlan from '@assets/images/one-plan-color.png';
import twoPlan from '@assets/images/two-plan-color.png';
import threePlan from '@assets/images/three-plan-dark.png';
import fourPlan from '@assets/images/four-plan-dark.png';

const Layout = ({ children, onFilterChange, activeComponent }) => {
  const medias = [
    { media: onePlan, intensity: 100, blur: 1, opacity: .07, zIndex: -1 },
    { media: twoPlan, intensity: 30, blur: 0, opacity: .5, zIndex: -2 },
    { media: threePlan, intensity: 0, blur: 1, opacity: .3, zIndex: -3 },
    { media: fourPlan, intensity: 10, blur: 2, opacity: .05, zIndex: -4 },
  ];

  return (
    <div className="layout">
      <Header onFilterChange={onFilterChange} />

      {/* {activeComponent === 'hero' && (
        <video src={video} autoPlay muted loop className="hero-video" />
      )} */}

      <BackgroundParallax medias={medias} forceTranslate={50} />

      <div className="layout-container">{children}</div>

      <ContactForm />

    </div>
  );
};

export default Layout;
