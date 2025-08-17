import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// A more subtle and elegant background effect
const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden z-0">
    <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-transparent blur-3xl animate-[spin_20s_linear_infinite]" />
    <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-tl from-purple-900/50 via-indigo-900/30 to-transparent blur-3xl animate-[spin_25s_linear_infinite_reverse]" />
  </div>
);

// Component for the initial loading animation
const Preloader = () => (
  <motion.div
    exit={{ opacity: 0, scale: 0.5 }}
    transition={{ duration: 0.5, ease: "easeIn" }}
    className="flex flex-col items-center justify-center gap-4"
  >
    <motion.div
      className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
    <p className="text-lg text-gray-300 tracking-widest">LOADING...</p>
  </motion.div>
);

// Component for the main content reveal
const ContentReveal = ({ onComplete }) => {
  const title = "Welcome to My Portfolio";
  const words = title.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="text-center"
    >
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8">
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            className="inline-block mr-4 bg-gradient-to-r from-white via-blue-200 to-purple-300 text-transparent bg-clip-text"
          >
            {word}
          </motion.span>
        ))}
      </h1>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: words.length * 0.2 + 0.5, duration: 0.5 }}
        onClick={onComplete}
        className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-purple-400 rounded-full text-lg font-semibold text-purple-300 overflow-hidden transition-all duration-300 hover:text-white hover:shadow-2xl hover:shadow-purple-500/30"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
        <span className="relative z-10 flex items-center gap-3">
          Enter
          <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </motion.button>
    </motion.div>
  );
};

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [stage, setStage] = useState('loading'); // 'loading', 'content', 'exiting'

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('content');
    }, 2000); // Duration of the preloader

    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setStage('exiting');
    setTimeout(() => {
      onLoadingComplete?.();
    }, 800); // Duration of the exit animation
  };

  return (
    <div className="fixed inset-0 bg-[#030014] flex items-center justify-center z-50">
      <BackgroundEffect />
      <AnimatePresence mode="wait">
        {stage === 'loading' && (
          <motion.div key="loader">
            <Preloader />
          </motion.div>
        )}
        {stage === 'content' && (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <ContentReveal onComplete={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* This is the main exit animation overlay */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: stage === 'exiting' ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
        className="absolute inset-0 bg-gradient-to-t from-indigo-800 to-purple-800 origin-bottom"
      />
    </div>
  );
};

export default WelcomeScreen;