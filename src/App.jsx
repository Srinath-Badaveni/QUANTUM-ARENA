import { useEffect } from 'react';
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

export default function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/main.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      try {
        document.body.removeChild(script);
      } catch(e){}
    }
  }, []);

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
