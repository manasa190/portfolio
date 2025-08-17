import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import React, { useState, lazy, Suspense } from "react";
import "./index.css";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";

// Lazy load all page components
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const ContactPage = lazy(() => import("./Pages/Contact"));
const Projects = lazy(() => import("./Pages/Projects"));
const Portofolio = lazy(() => import("./Pages/Portofolio"));
const SkillsPage = lazy(() => import("./Pages/Skills")); // Now correctly included
const ProjectDetails = lazy(() => import("./components/ProjectDetail"));
const NotFoundPage = lazy(() => import("./Pages/404"));

// Define Layout and Footer components
const Layout = ({ children }) => (
  <>
    <Navbar />
    <AnimatedBackground />
    <main className="relative z-10">{children}</main>
    <Footer />
  </>
);

const Footer = () => (
    <footer className="relative z-10 px-4">
      <div className="container mx-auto">
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2025{" "}
          <Link to="/" className="hover:underline">
            Manasa Sanjay
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
);

// This component handles the welcome screen and routing logic
function AppContent() {
    const location = useLocation();
    const [showWelcome, setShowWelcome] = useState(() => !sessionStorage.getItem('hasVisited'));

    const handleWelcomeComplete = () => {
        setShowWelcome(false);
        sessionStorage.setItem('hasVisited', 'true');
    };
    
    return (
        <AnimatePresence mode="wait">
            {showWelcome && location.pathname === '/' ? (
                <WelcomeScreen key="welcome" onLoadingComplete={handleWelcomeComplete} />
            ) : (
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Layout><Home /></Layout>} />
                    <Route path="/about" element={<Layout><About /></Layout>} />
                    <Route path="/projects" element={<Layout><Projects /></Layout>} />
                    <Route path="/portofolio" element={<Layout><Portofolio /></Layout>} />
                    <Route path="/skills" element={<Layout><SkillsPage /></Layout>} /> 
                    <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
                    <Route path="/project/:id" element={<Layout><ProjectDetails /></Layout>} />
                    <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
                </Routes>
            )}
        </AnimatePresence>
    );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <AppContent />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;