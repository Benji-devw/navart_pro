import { useState, createContext } from 'react';
import './App.css';
import Hero from '@components/Hero';
import About from '@components/About';
import Skills from '@components/Skills';
import Projects from '@components/Projects';
import Layout from '@/components/ui/Layout';

// Restore the context that was used elsewhere in the application
export const ScrollObserverContext = createContext(null);

function App() {
  const [activeView, setActiveView] = useState(localStorage.getItem('activeIcon') || '');

  const defaultInViewOptions = {
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '0px 0px -100px 0px',
  };

  // Function to change the active view
  const handleFilterChange = (sectionName) => {
    localStorage.setItem('activeIcon', sectionName);
    setActiveView(sectionName);
  };

  // Function to return only the selected component
  const renderActiveComponent = () => {
    switch (activeView) {
      case 'hero':
        return { type: 'hero', component: <Hero /> };
      case 'about':
        return { type: 'about', component: <About /> };
      case 'skills':
        return { type: 'skills', component: <Skills /> };
      case 'projects':
        return { type: 'projects', component: <Projects /> };
      default:
        return { type: 'hero', component: <Hero /> };
    }
  };

  return (
    <ScrollObserverContext.Provider value={{ defaultInViewOptions }}>
      <div className="app">
        <Layout onFilterChange={handleFilterChange} activeComponent={renderActiveComponent().type}>
          <main className="main-content">{renderActiveComponent().component}</main>
        </Layout>
      </div>
    </ScrollObserverContext.Provider>
  );
}

export default App;
