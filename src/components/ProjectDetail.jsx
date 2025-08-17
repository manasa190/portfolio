import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Code2, Star, ChevronRight, Layers } from "lucide-react";
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';

const TechBadge = ({ tech }) => (
  <motion.div 
    className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-lg rounded-full px-4 py-2 border border-white/10"
    whileHover={{ scale: 1.05, y: -2 }}
  >
    <Code2 className="w-4 h-4 text-purple-400" />
    <span className="text-sm font-medium text-slate-300">{tech}</span>
  </motion.div>
);

const FeatureItem = ({ feature, index }) => (
  <motion.li 
    className="flex items-start space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors duration-300"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <Star className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
    <span className="text-base text-gray-300">{feature}</span>
  </motion.li>
);

const ProjectStats = ({ project }) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
      <Layers className="w-8 h-8 mx-auto text-blue-400 mb-2" />
      <div className="text-3xl font-bold text-white">{project?.TechStack?.length || 0}</div>
      <div className="text-sm text-gray-400">Technologies</div>
    </div>
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
      <Star className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
      <div className="text-3xl font-bold text-white">{project?.Features?.length || 0}</div>
      <div className="text-sm text-gray-400">Key Features</div>
    </div>
  </div>
);

const handleGithubClick = (githubLink) => {
  if (githubLink === 'Private') {
    Swal.fire({
      icon: 'info',
      title: 'Source Code is Private',
      text: 'Sorry, the source code for this project is not publicly available.',
      confirmButtonText: 'Got it',
      confirmButtonColor: '#6366f1',
      background: '#030014',
      color: '#ffffff'
    });
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const selectedProject = storedProjects.find((p) => String(p.id) === id);
    
    if (selectedProject) {
      setProject({
        ...selectedProject,
        Features: selectedProject.Features || [],
        TechStack: selectedProject.TechStack || [],
      });
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden">
      {/* Background animations */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-purple-600/20 rounded-full filter blur-3xl opacity-50 animate-[blob_15s_infinite]" />
        <div className="absolute top-0 -right-1/4 w-1/2 h-full bg-blue-600/20 rounded-full filter blur-3xl opacity-50 animate-[blob_15s_infinite_4s]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 mt-8">
          {/* Left Column */}
          <motion.div 
            className="lg:col-span-3 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
              {project.Title}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              {project.Description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a
                href={project.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold overflow-hidden"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Live Demo</span>
              </a>
              <a
                href={project.Github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 text-slate-300 rounded-lg font-semibold border border-white/10"
                onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
              >
                <Github className="w-5 h-5" />
                <span>Source Code</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={project.Img}
                alt={project.Title}
                className="w-full object-cover"
              />
            </div>
            <ProjectStats project={project} />
          </motion.div>
        </div>

        {/* Features and Tech Stack Section */}
        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          <motion.div 
            className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Key Features</h3>
            <ul className="list-none space-y-4">
              {project.Features.map((feature, index) => (
                <FeatureItem key={index} feature={feature} index={index} />
              ))}
            </ul>
          </motion.div>
          <motion.div 
            className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.TechStack.map((tech, index) => (
                <TechBadge key={index} tech={tech} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;