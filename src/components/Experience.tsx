import { Building2 } from "lucide-react";
import React from "react";

const experiences = [
  {
    year: "Jun 2024 – Present",
    role: "Full Stack Developer",
    company: "Precise (Hybrid, Lagos, Nigeria)",
    desc: "Spearheaded the design, development, and maintenance of high-performance web apps using the MERN stack. Built APIs, optimized interfaces with Laravel + Next.js, and improved database performance with MongoDB.",
  },
  {
    year: "Oct 2024 – Feb 2025",
    role: "LLM Trainer",
    company: "Turing (Remote, Palo Alto, USA)",
    desc: "Designed and developed mathematical datasets to train language models on high school and college-level math concepts. Conducted evaluations, tuned hyperparameters, and improved model accuracy and reasoning.",
  },

  {
    year: "Jan 2022 – 2024",
    role: "Front-End Developer",
    company: "Obounce (Lagos, Nigeria)",
    desc: "Translated app designs into responsive front-end code using ReactJs and TailwindCSS. Collaborated with back-end teams, ensuring cohesive integration and enhanced user experience.",
  },
  {
    year: "May 2021 – Feb 2025",
    role: "Subject Matter Expert (Mathematics)",
    company: "Prepclass (Remote, Lagos, Nigeria)",
    desc: "Provides detailed answers to challenging mathematics questions (K1–K12) from learners across the world, ensuring clarity, accuracy, and accessibility. Strengthened expertise in English communication and time management while supporting diverse learners.",
  },
  {
    year: "Jul 2020 – Apr 2021",
    role: "Mathematics Tutor",
    company: "PrepClassNG (Full-time, Lagos, Nigeria)",
    desc: "Guided learners in mastering core subjects by evaluating, assisting, and encouraging them throughout the learning process. Designed teaching materials including PPT slides, quizzes, and instructional videos to improve engagement.",
  },
  {
    year: "Jul 2020 – Apr 2021",
    role: "Mathematics Teacher",
    company: "JIBA College (Full-time, Lagos, Nigeria)",
    desc: " Employed a variety of methodologies in teaching and instructing pupils, including demonstrations, discussions, and lectures. Took full responsibility for student’s failure and constantly working to respond to student’s learning needs",
  },
];

const Experience = () => {
  return (
    <div className="mt-10 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="border rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 text-amber-500 font-medium">
              <Building2 className="w-4 h-4" />
              <span>{exp.year}</span>
            </div>
            <h3 className="mt-2 text-lg md:text-xl font-bold">{exp.role}</h3>
            <p className="text-gray-600 font-medium">{exp.company}</p>
            <p className="mt-3 text-gray-500 text-sm">{exp.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
