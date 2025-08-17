import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const dotVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  };

  return (
    <div className="min-h-screen bg-[#030014] flex flex-col items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="start"
        animate="end"
        className="flex gap-2"
      >
        <motion.span
          variants={dotVariants}
          transition={dotTransition}
          className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
        />
        <motion.span
          variants={dotVariants}
          transition={dotTransition}
          className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
        />
        <motion.span
          variants={dotVariants}
          transition={dotTransition}
          className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
        />
      </motion.div>
      <p className="text-gray-400 text-lg mt-6 tracking-widest">LOADING</p>
    </div>
  );
};

export default LoadingScreen;