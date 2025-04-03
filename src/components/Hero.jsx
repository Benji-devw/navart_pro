import { useContext } from 'react';
import Button from './ui/Button';
import '@styles/Hero.css';
import { ScrollObserverContext } from '@/App';
import video from '@assets/earth.mp4';

const Hero = () => {
  const { defaultInViewOptions } = useContext(ScrollObserverContext);

  return (
    <section id="hero" className="hero">
      <video src={video} autoPlay muted loop className="hero-video" />

    </section>
  );
};

export default Hero;
 