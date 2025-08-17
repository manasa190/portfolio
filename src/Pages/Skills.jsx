import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Cpu, BrainCircuit, TerminalSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const skillsData = {
  "Full-Stack Development": {
    icon: <Cpu className="w-8 h-8 text-blue-400" />,
    skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "Tailwind CSS", "React", "Node.js", "Express", "MongoDB", "Next.js", "TypeScript"]
  },
  "AI/ML": {
    icon: <BrainCircuit className="w-8 h-8 text-purple-400" />,
    skills: ["Python", "NumPy", "Pandas", "Matplotlib", "Keras", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV"]
  },
  "Tools": {
    icon: <TerminalSquare className="w-8 h-8 text-green-400" />,
    skills: ["GitHub", "Git", "Docker", "Visual Studio Code", "Postman", "Vercel", "Firebase"]
  }
};

const SkillTag = ({ skill, index }) => (
  <motion.span
    className="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-full text-sm font-medium"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, duration: 0.3 }}
  >
    {skill}
  </motion.span>
);

const SkillCard = ({ category, data }) => (
  <motion.div 
    className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10"
    data-aos="fade-up"
    whileHover={{ y: -10, scale: 1.03 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex items-center gap-4 mb-6">
      {data.icon}
      <h3 className="text-2xl font-bold text-white">{category}</h3>
    </div>
    <div className="flex flex-wrap gap-3">
      {data.skills.map((skill, index) => (
        <SkillTag key={skill} skill={skill} index={index} />
      ))}
    </div>
  </motion.div>
);

const SkillsPage = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
    });
  }, []);

  return (
    <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-20 py-24 sm:py-32">
      <div className="text-center mb-12 lg:mb-16" data-aos="fade-up">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          My Technical Skills
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
          A showcase of the technologies and tools I use to build modern web applications and AI/ML solutions.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <SkillCard category="Full-Stack Development" data={skillsData["Full-Stack Development"]} />
        <SkillCard category="AI/ML" data={skillsData["AI/ML"]} />
        <SkillCard category="Tools" data={skillsData["Tools"]} />
      </div>
    </div>
  );
};

export default SkillsPage;