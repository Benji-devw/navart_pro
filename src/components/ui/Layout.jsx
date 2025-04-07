import React from 'react';
import './Layout.css';
import BackgroundAnimation from '@components/BackgroundAnimation';
// import Header from '@/components/ui/Header';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* <Header /> */}

      <BackgroundAnimation
        gridSize={60}
        pointColor={'rgb(44, 44, 44)'}
        lineColor={'rgb(48, 48, 48)'}
        connectionDistance={80}
        interactionRadius={210}
        interactionForce={-22}
      />
      <div className="layout-container">{children}</div>
    </div>
  );
};

export default Layout;
