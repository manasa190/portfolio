import { useEffect } from "react";
import { Linkedin, Github } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const socialLinks = [
  {
    name: "LinkedIn",
    displayName: "Let's Connect",
    subText: "on LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/manasasanjay/",
    gradient: "from-[#0A66C2] to-[#0077B5]",
  },
  {
    name: "GitHub",
    displayName: "GitHub",
    subText: "@manasasanjay",
    icon: Github,
    url: "https://github.com/manasasanjay",
    gradient: "from-[#333] to-[#24292e]",
  },
  {
    name: "Gmail",
    displayName: "Email Me",
    subText: "manasasanjay@gmail.com",
    icon: ({ className }) => (
      <svg
        className={className}
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zM4 6h16v.511l-8 5.333-8-5.333V6zm0 12V9.489l7.385 4.923a1 1 0 001.23 0L20 9.489V18H4z" />
      </svg>
    ),
    url: "mailto:manasasanjay@gmail.com",
    gradient: "from-[#D44638] to-[#C53827]",
  },
];

const SocialLinks = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full max-w-md mx-auto">
      {socialLinks.map(({ name, icon: Icon, url, displayName, subText, gradient }, i) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded-xl px-6 py-4 text-white bg-gradient-to-r ${gradient} hover:scale-105 transition transform duration-300 w-full`}
          data-aos="fade-up"
          data-aos-delay={i * 100}
        >
          <div className="flex items-center gap-4">
            <Icon className="w-6 h-6 min-w-6" />
            <div>
              <div className="text-sm font-bold">{displayName}</div>
              <div className="text-xs opacity-90 whitespace-nowrap overflow-hidden text-ellipsis">
                {subText}
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
