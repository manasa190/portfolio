import React from "react";
import { Github, ExternalLink } from "lucide-react";
 

const projects = [
  {
    id: 1,
    title: "First Aid Hub",
    date: "Jul 2025",
    description: "Designed a safety hub integrating AI medical support, first aid resources, and emergency alerts. Built for fast responses in critical situations, combining advanced medical AI with user-friendly emergency response tools.",
    github: "https://github.com/manasa190/first_aid_kit.git",
    image: "/images/firstaid.png",
    tech: ["AI", "Medical Support", "Emergency Response", "React"],
   
  },
  {
    id: 2,
    title: "Real-Time Collaboration Tool",
    date: "Apr 2025",
    description: "Developed a MERN stack tool enabling real-time multi-user interaction. Optimized for scalability and performance to handle concurrent usage, featuring instant updates and seamless collaboration.",
    github: "https://github.com/manasa190/real_time_collaboration.git",
    image: "/images/realtime.png",
    tech: ["MERN Stack", "WebSocket", "Real-time", "MongoDB"],
    
  },
  {
    id: 3,
    title: "Stemify",
    date: "May 2025 - Present",
    description: "Created an AI-powered system for detecting stem diseases using deep learning and computer vision. Improved detection accuracy and enabled proactive interventions for sustainable farming.",
    github: "https://github.com/manasa190/stemify.git",
    image: "/images/stemify.png",
    tech: ["Deep Learning", "Computer Vision", "Python", "TensorFlow"],
   
  },
  {
    id: 4,
    title: "Shell.ai Challenge",
    date: "Jul 2025",
    description: "Engineered an ML pipeline using LightGBM, XGBoost, CatBoost with Optuna tuning and stacking. Achieved a competitive leaderboard ranking through advanced feature engineering.",
    github: "https://github.com/manasa190/shell.ai.git",
    image: "/images/shellai.png",
    tech: ["Machine Learning", "LightGBM", "XGBoost", "Optuna"],
    
  },
  {
    id: 5,
    title: "Mind Pal",
    date: "Nov 2024 - Dec 2024",
    description: "A sanctuary for mental health and wellness, this platform unveils a treasure trove of tools and resources, all designed to nurture emotional well-being.",
    github: "https://github.com/manasa190/mental_health_support.git",
    image: "/images/mindpal.png",
    tech: ["Python", "HTML"],
    
  }
].map(project => ({
  ...project,
  image: project.image || "/images/placeholder.png"
}));


  

const Projects = () => (
  <div className="min-h-screen bg-[#030014] pt-20" id="Projects">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text">
        Featured Projects
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div 
            key={project.id || project.title}
            className="group relative bg-[#18182a] rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 transform hover:-translate-y-2"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {/* Image Section */}
            <div className="relative overflow-hidden rounded-lg mb-6">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600/80 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  View Project
                </a>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-semibold text-white">
                  {project.title}
                </h3>
                <span className="text-sm text-gray-400">{project.date}</span>
              </div>

              <p className="text-gray-300">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-indigo-600/20 text-indigo-300 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Projects;