// "use client";
// import React from "react";
// import { cn } from "@/lib/utils";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { Github, Globe } from "lucide-react";

// // Example projects data
// const projects = [
//   {
//     title: "PiPoint Edtech Platform",
//     desc: "An innovative Edtech platform I founded, helping learners connect with engaging math and tech resources.",
//     img: "/image.png",
//     tech: ["Next.js", "Node.js", "MongoDB", "TailwindCSS"],
//     link: "https://pipoint.com", // replace
//     github: "https://github.com/Denaro13", // replace
//   },
//   {
//     title: "Precise Web App",
//     desc: "High-performance full-stack web app with advanced user dashboards and optimized APIs.",
//     img: "/image.png",
//     tech: ["React", "Laravel", "MySQL"],
//     link: "#", // replace
//     github: "#", // replace
//   },
//   {
//     title: "AI LLM Trainer",
//     desc: "Designed and developed mathematical datasets to train large language models, improving reasoning ability.",
//     img: "/image.png",
//     tech: ["Python", "Prompt Engineering"],
//     link: "#",
//     github: "#",
//   },
// ];

// const Projects = () => {
//   return (
//     <section
//       id="projects"
//       className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white"
//     >
//       {/* Background Magic Effect */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent)]" />
//       </div>

//       <div className="container relative z-10 mx-auto px-6">
//         <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
//           Featured Projects
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {projects.map((project, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: i * 0.2 }}
//               viewport={{ once: true }}
//               className="group relative rounded-xl overflow-hidden shadow-lg bg-gray-800/60 hover:shadow-2xl hover:scale-[1.02] transition-transform"
//             >
//               {/* Project Image */}
//               <div className="relative h-56 w-full overflow-hidden">
//                 <Image
//                   src={project.img}
//                   alt={project.title}
//                   fill
//                   className="object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//               </div>

//               {/* Project Content */}
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2">{project.title}</h3>
//                 <p className="text-gray-300 text-sm mb-4">{project.desc}</p>

//                 {/* Tech tags */}
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {project.tech.map((t, j) => (
//                     <span
//                       key={j}
//                       className="px-3 py-1 text-xs bg-gray-700 rounded-full"
//                     >
//                       {t}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Links */}
//                 <div className="flex items-center gap-4">
//                   {project.github && (
//                     <a
//                       href={project.github}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-1 text-sm hover:text-yellow-400 transition"
//                     >
//                       <Github className="w-4 h-4" /> Code
//                     </a>
//                   )}
//                   {project.link && (
//                     <a
//                       href={project.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-1 text-sm hover:text-yellow-400 transition"
//                     >
//                       <Globe className="w-4 h-4" /> Live
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Projects;

"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, Globe, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Example projects data

interface Project {
  title: string;
  desc: string;
  details: string;
  img: string;
  tech: string[];
  category: string;
  link?: string;
  github?: string;
}

// ("use client");
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { Github, Globe, X } from "lucide-react";
// import { cn } from "@/lib/utils";

// Example projects data
const projects = [
  {
    title: "PiPoint Edtech Platform",
    desc: "An innovative Edtech platform I founded, helping learners connect with engaging math and tech resources.",
    details:
      "PiPoint enables personalized learning experiences through curated STEM content and tutor-driven learning modules. I built the platform using Next.js and Node.js, with a focus on speed and user engagement.",
    img: "/image.png",
    tech: ["Next.js", "Node.js", "MongoDB", "TailwindCSS"],
    category: "Edtech",
    link: "https://pipoint.com",
    github: "https://github.com/Denaro13",
  },
  {
    title: "Precise Web App",
    desc: "High-performance full-stack web app with advanced user dashboards and optimized APIs.",
    details:
      "Developed a scalable, data-driven dashboard system with Laravel and React. The backend APIs were optimized for performance, reducing response times by 40%.",
    img: "/image.png",
    tech: ["React", "Laravel", "MySQL"],
    category: "Fullstack",
    link: "#",
    github: "#",
  },
  {
    title: "AI LLM Trainer",
    desc: "Designed and developed mathematical datasets to train large language models, improving reasoning ability.",
    details:
      "Created structured math reasoning datasets and fine-tuned LLM prompts to enhance problem-solving consistency. Integrated Python pipelines for dataset generation and validation.",
    img: "/image.png",
    tech: ["Python", "Prompt Engineering"],
    category: "AI",
    link: "#",
    github: "#",
  },
];

// Framer Motion animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent)]" />
      </div>

      <div className="container max-w-6xl relative z-10 mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="text-amber-400">Featured</span> Projects
        </h2>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {["All", "Fullstack", "AI", "Edtech"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-4 py-1 rounded-full text-sm transition-colors",
                filter === cat
                  ? "bg-amber-400 text-black"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          key={filter} // Important: re-trigger animations when filter changes
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {filteredProjects.map((project, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="group relative flex flex-col justify-between rounded-2xl overflow-hidden bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-amber-400/40 transition-all shadow-lg cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Project Content */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-400">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{project.desc}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 text-xs bg-gray-700/60 text-gray-300 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between text-sm mt-auto">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-amber-400 transition"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" /> Code
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-amber-400 transition"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Globe className="w-4 h-4" /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal for Project Details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative bg-gray-900 text-white rounded-2xl p-8 max-w-2xl w-full shadow-xl border border-gray-700 overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-amber-400"
                onClick={() => setSelectedProject(null)}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="relative h-60 w-full mb-6 overflow-hidden rounded-xl">
                <Image
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Modal Content */}
              <h3 className="text-2xl font-bold mb-2 text-amber-400">
                {selectedProject.title}
              </h3>
              <p className="text-gray-300 mb-4">{selectedProject.details}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs bg-gray-800 text-gray-200 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-6">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-amber-400 transition"
                  >
                    <Github className="w-5 h-5" /> View Code
                  </a>
                )}
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-amber-400 transition"
                  >
                    <Globe className="w-5 h-5" /> Visit Site
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
