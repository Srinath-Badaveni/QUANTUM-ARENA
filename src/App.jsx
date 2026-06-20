import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Tracks from "./components/Tracks";
import Timeline from "./components/Timeline";
import Prizes from "./components/Prizes";
import Rules from "./components/Rules";
import Faq from "./components/Faq";
import Register from "./components/Register";
import Team from "./components/Team";
import Footer from "./components/Footer";
import Treasurer from "./components/Treasurer";
import Verification from "./components/Verification";
import ApprovedList from "./components/ApprovedList";

export default function App() {
  const [currentView, setCurrentView] = useState("main");

  useEffect(() => {
    const handleHashChange = () => {
      const vaultHash = import.meta.env.VITE_VAULT_HASH || "#vault";
      const verifyHash = import.meta.env.VITE_VERIFY_HASH || "#verify";
      const approvedHash = import.meta.env.VITE_APPROVED_HASH || "#approved";

      if (window.location.hash === vaultHash) {
        setCurrentView("treasurer");
      } else if (window.location.hash === verifyHash) {
        setCurrentView("verification");
      } else if (window.location.hash === approvedHash) {
        setCurrentView("approved");
      } else {
        setCurrentView("main");
      }
    };

    // Check initial hash
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (currentView === "main") {
      const script = document.createElement("script");
      script.src = "/main.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        try {
          document.body.removeChild(script);
        } catch (e) {}
      };
    }
  }, [currentView]);

  if (currentView === "treasurer") {
    return <Treasurer />;
  }
  if (currentView === "verification") {
    return <Verification />;
  }
  if (currentView === "approved") {
    return <ApprovedList />;
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
