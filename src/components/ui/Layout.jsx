import React from 'react';
import './Layout.css';
import BackgroundAnimation from '@components/BackgroundAnimation';
import Header from '@/components/ui/Header';
import video from '@assets/earth.mp4';

const Layout = ({ children, onFilterChange, activeComponent }) => {
  return (
    <div className="layout">
      <Header onFilterChange={onFilterChange} />

      {activeComponent === 'hero' && (
        <video src={video} autoPlay muted loop className="hero-video" />
      )}

        {/* <BackgroundAnimation
          gridSize={60}
          pointColor={activeComponent === 'hero' ? 'rgb(0, 0, 0)' : 'rgb(158, 158, 158)'}
          lineColor={activeComponent === 'hero' ? 'rgb(0, 0, 0)' : 'rgb(95, 95, 95)'}
          connectionDistance={80}
          interactionRadius={210}
          interactionForce={-22}
        /> */}

      <div className="layout-container">{children}</div>
    </div>
  );
};

export default Layout;
