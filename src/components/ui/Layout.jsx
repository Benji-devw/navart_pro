import React from 'react';
import './Layout.css';
import BackgroundParallax from '@/components/ui/backgroundParallax';
import { Header } from '@/components/ui/Header';
import { ContactForm } from '@components/ContactForm';
// import video from '@assets/earth.mp4';
import onePlan from '@assets/images/one-plan-color.png';
import twoPlan from '@assets/images/two-plan-color.png';
import threePlan from '@assets/images/three-plan-dark.png';
// import fourPlan from '@assets/images/four-plan-dark.png';
import logoPlan1 from '@assets/images/logo-plan-1.png';
import logoPlan2 from '@assets/images/logo-plan-2.png';

const Layout = ({ children, onFilterChange, activeComponent }) => {
  const medias = [
    { media: logoPlan1, intensity: 20, blur: 0, opacity: .3, zIndex: -1 },
    { media: logoPlan2, intensity: 10, blur: 0, opacity: .3, zIndex: -2 },
    { media: onePlan, intensity: 100, blur: 1, opacity: .1, zIndex: -2 },
    { media: twoPlan, intensity: 50, blur: 0, opacity: 0.3, zIndex: -4 },
    { media: threePlan, intensity: 5, blur: 2, opacity: 0.3, zIndex: -5 },
    // { media: fourPlan, intensity: 10, blur: 2, opacity: 0.3, zIndex: -4 },
  ];


  return (
    <div className="layout" page={activeComponent}>
      <Header onFilterChange={onFilterChange} />

      {/* {activeComponent === 'hero' && (
        <video src={video} autoPlay muted loop className="hero-video" />
      )} */}

      <BackgroundParallax medias={medias} forceTranslate={50} />

      <div className="layout-container">
        {children}
      </div>

      <ContactForm />

    </div>
  );
};

export default Layout;
