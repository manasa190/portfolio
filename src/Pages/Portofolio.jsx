import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
// This import is now corrected to properly receive the data
import Certificate, { certificatesData } from '../components/Certificate';

const Portofolio = () => {
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
          My Certifications
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
          A collection of the certifications I've earned through my studies and professional development.
        </p>
      </div>
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {certificatesData.map((cert) => (
          <Certificate
            key={cert.id}
            ImgSertif={cert.image}
            title={cert.title}
            issuer={cert.issuer}
            date={cert.date}
          />
        ))}
      </div>
    </div>
  );
};

export default Portofolio;