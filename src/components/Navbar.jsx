import React, { useState, useEffect } from 'react';
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Code, User, Briefcase, Mail, Sun, Moon, Award, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { to: "/", text: "Home", icon: <User className="w-5 h-5 mr-3" /> },
    { to: "/about", text: "About", icon: <User className="w-5 h-5 mr-3" /> },
    { to: "/projects", text: "Projects", icon: <Briefcase className="w-5 h-5 mr-3" /> },
    { to: "/portofolio", text: "Certificates", icon: <Award className="w-5 h-5 mr-3" /> },
    { to: "/skills", text: "Skills", icon: <Wrench className="w-5 h-5 mr-3" /> },
    { to: "/contact", text: "Contact", icon: <Mail className="w-5 h-5 mr-3" /> },
  ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -20 }
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <Code className="w-8 h-8 text-purple-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Manasa Sanjay</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.text}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `font-medium text-lg tracking-wide transition-all duration-300 relative ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.text}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500"
                          layoutId="underline"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
            <li>
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-800 transition-colors">
                {theme === 'light' ? <Moon className="text-gray-400" /> : <Sun className="text-yellow-400" />}
              </button>
            </li>
          </ul>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-800 transition-colors mr-2">
              {theme === 'light' ? <Moon className="text-gray-400" /> : <Sun className="text-yellow-400" />}
            </button>
            <button onClick={toggleMenu} className="text-gray-300 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-slate-900/95 backdrop-blur-xl absolute top-20 left-0 w-full"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <ul>
              {navLinks.map((link) => (
                <motion.li key={link.text} variants={mobileLinkVariants}>
                  <NavLink
                    to={link.to}
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `flex items-center p-4 text-lg font-medium transition-colors duration-300 ${
                        isActive ? 'bg-purple-600/20 text-white' : 'text-gray-300 hover:bg-slate-800/50'
                      }`
                    }
                  >
                    {link.icon}
                    {link.text}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;