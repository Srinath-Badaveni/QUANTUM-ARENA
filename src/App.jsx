import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Tracks from './components/Tracks';
import Timeline from './components/Timeline';
import Prizes from './components/Prizes';
import Rules from './components/Rules';
import Faq from './components/Faq';
import Register from './components/Register';
import Team from './components/Team';
import Footer from './components/Footer';
import Treasurer from './components/Treasurer';

export default function App() {
  const [currentView, setCurrentView] = useState('main');

  useEffect(() => {
    const handleHashChange = () => {
      const vaultHash = import.meta.env.VITE_VAULT_HASH || '#vault';
      if (window.location.hash === vaultHash) {
        setCurrentView('treasurer');
      } else {
        setCurrentView('main');
      }
    };
    
    // Check initial hash
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentView === 'main') {
      const script = document.createElement("script");
      script.src = "/main.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        try {
          document.body.removeChild(script);
        } catch(e){}
      }
    }
  }, [currentView]);

  if (currentView === 'treasurer') {
    return <Treasurer />;
  }

  return (
    <>
      <div className="scanlines"></div>
      <Navbar />
      <Hero />
      <About />
      <Tracks />
      <Timeline />
      <Prizes />
      <Rules />
      <Faq />
      <Register />
      <Team />
      <Footer />
    </>
  );
}
