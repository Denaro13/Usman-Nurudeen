"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, Globe, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AddProject } from "@/components/AddProject";
import { getProjects } from "@/lib/api/project";
import { toast } from "sonner";
import { Project } from "@/lib/types";

// interface ProjectSample {
//   title: string;
//   desc: string;
//   details: string;
//   img: string;
//   tech: string[];
//   category: string;
//   link?: string;
//   github?: string;
// }

const sampleProjects = [
  {
    _id: "1",
    title: "PiPoint Edtech Platform",
    description:
      "An innovative Edtech platform I founded, helping learners connect with engaging math and tech resources.",
    details:
      "PiPoint enables personalized learning experiences through curated STEM content and tutor-driven learning modules. I built the platform using Next.js and Node.js, with a focus on speed and user engagement.",
    image: {
      url: "/image.png",
      publicId: "sample-public-id",
    },
    techStack: ["Next.js", "Node.js", "MongoDB", "TailwindCSS"],
    category: "Edtech",
    url: "https://pipoint.com",
    github: "https://github.com/Denaro13",
  },
  {
    _id: "2",
    title: "Precise Web App",
    description:
      "High-performance full-stack web app with advanced user dashboards and optimized APIs.",
    details:
      "Developed a scalable, data-driven dashboard system with Laravel and React. The backend APIs were optimized for performance, reducing response times by 40%.",
    image: {
      url: "/image.png",
      publicId: "sample-public-id",
    },
    techStack: ["React", "Laravel", "MySQL"],
    category: "Fullstack",
    url: "#",
    github: "#",
  },
  {
    _id: "3",
    title: "AI LLM Trainer",
    description:
      "Designed and developed mathematical datasets to train large language models, improving reasoning ability.",
    details:
      "Created structured math reasoning datasets and fine-tuned LLM prompts to enhance problem-solving consistency. Integrated Python pipelines for dataset generation and validation.",
    image: {
      url: "/image.png",
      publicId: "sample-public-id",
    },
    techStack: ["Python", "Prompt Engineering"],
    category: "AI",
    url: "#",
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

const Page = () => {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [projects, setProjects] = useState<Project[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  console.log("Projects", projects);

  useEffect(() => {
    async function loadExperience() {
      setIsLoading(true);
      try {
        const projects = await getProjects();
        setProjects(projects);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
        toast.error(error.message || "Error fetching data");
      } finally {
        setIsLoading(false);
      }
    }
    loadExperience();
  }, []);

  const filteredProjects =
    filter === "All"
      ? projects
      : projects?.filter((p) => p.category === filter);
  return (
    <div className="py-6 px-6">
      <div className="flex justify-end">
        <AddProject setProjects={setProjects} />
      </div>
      {isLoading && !projects && (
        <div className="flex items-center justify-center">
          <div className="ml-3 mt-4 animate-spin rounded-full h-[2.5rem] w-[2.5rem] border-t-2 border-b-2 border-amber-400"></div>
        </div>
      )}
      {projects && (
        <div>
          <h2 className="text-2xl font-bold text-center mb-4">Your Projects</h2>
          {projects.length > 0 ? (
            <section
              className="relative text-white"
              // className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white"
            >
              <div className="container max-w-6xl relative z-10 mx-auto px-4">
                {/* Filter Buttons */}
                {/* <div className="flex justify-center gap-4 mb-12 flex-wrap">
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
                </div> */}

                {/* Projects Grid */}
                <motion.div
                  key={filter} // Important: re-trigger animations when filter changes
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-10"
                >
                  {filteredProjects &&
                    filteredProjects.map((project, i) => (
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
                            src={project.image.url as string}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>

                        {/* Project Content */}
                        <div className="p-6 flex bg-gray-700 flex-col flex-grow justify-between">
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-400">
                            {project.title}
                          </h3>
                          <p className="text-white text-sm mb-4">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.map((t, j) => (
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
                            {project.url && (
                              <a
                                href={project.url}
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
                          src={selectedProject.image.url as string}
                          alt={selectedProject.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Modal Content */}
                      <h3 className="text-2xl font-bold mb-2 text-amber-400">
                        {selectedProject.title}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {selectedProject.details}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedProject.techStack.map((t, i) => (
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
                        {selectedProject.url && (
                          <a
                            href={selectedProject.url}
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
          ) : (
            <div className="flex items-center justify-center mt-4">
              <p className="text-foreground ">
                You currently do not have any project saved
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
