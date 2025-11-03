"use client";
// import { Experience as ExperienceSchema } from "@/app/admin/page";
import { getExperiences } from "@/lib/api/experience";
import { formatDate } from "@/lib/formatDate";
import { Experience as ExperienceData } from "@/lib/types";
import { Building2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// const experiences = [
//   {
//     year: "Jun 2024 – Present",
//     role: "Full Stack Developer",
//     company: "Precise (Hybrid, Lagos, Nigeria)",
//     desc: "Spearheaded the design, development, and maintenance of high-performance web apps using the MERN stack. Built APIs, optimized interfaces with Laravel + Next.js, and improved database performance with MongoDB.",
//   },
//   {
//     year: "Oct 2024 – Feb 2025",
//     role: "LLM Trainer",
//     company: "Turing (Remote, Palo Alto, USA)",
//     desc: "Designed and developed mathematical datasets to train language models on high school and college-level math concepts. Conducted evaluations, tuned hyperparameters, and improved model accuracy and reasoning.",
//   },

//   {
//     year: "Jan 2022 – 2024",
//     role: "Front-End Developer",
//     company: "Obounce (Lagos, Nigeria)",
//     desc: "Translated app designs into responsive front-end code using ReactJs and TailwindCSS. Collaborated with back-end teams, ensuring cohesive integration and enhanced user experience.",
//   },
//   {
//     year: "May 2021 – Feb 2025",
//     role: "Subject Matter Expert (Mathematics)",
//     company: "Prepclass (Remote, Lagos, Nigeria)",
//     desc: "Provides detailed answers to challenging mathematics questions (K1–K12) from learners across the world, ensuring clarity, accuracy, and accessibility. Strengthened expertise in English communication and time management while supporting diverse learners.",
//   },
//   {
//     year: "Jul 2020 – Apr 2021",
//     role: "Mathematics Tutor",
//     company: "PrepClassNG (Full-time, Lagos, Nigeria)",
//     desc: "Guided learners in mastering core subjects by evaluating, assisting, and encouraging them throughout the learning process. Designed teaching materials including PPT slides, quizzes, and instructional videos to improve engagement.",
//   },
//   {
//     year: "Jul 2020 – Apr 2021",
//     role: "Mathematics Teacher",
//     company: "JIBA College (Full-time, Lagos, Nigeria)",
//     desc: " Employed a variety of methodologies in teaching and instructing pupils, including demonstrations, discussions, and lectures. Took full responsibility for student’s failure and constantly working to respond to student’s learning needs",
//   },
// ];

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadExperience() {
      setIsLoading(true);
      try {
        const experience = await getExperiences();
        setExperiences(experience);
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
  return (
    <div className="mt-10 ">
      {isLoading && !experiences && (
        <div className="flex items-center justify-center">
          <div className="ml-3 mt-4 animate-spin rounded-full h-[2.5rem] w-[2.5rem] border-t-2 border-b-2 border-amber-400"></div>
        </div>
      )}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="border rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 text-amber-500 font-medium">
              <Building2 className="w-4 h-4" />
              <span>
                {formatDate(new Date(exp.startDate))} -{" "}
                {(exp.endDate &&
                  exp.endDate !== "Present" &&
                  formatDate(new Date(exp.endDate))) ||
                  "Present"}
              </span>
            </div>
            <h3 className="mt-2 text-lg md:text-xl font-bold">{exp.title}</h3>
            <p className="text-gray-600 font-medium">
              {exp.company} ({exp.location})
            </p>
            <div className="mt-3">
              <ul className="pl-4 list-disc">
                {exp.achievements.map((ach, idx) => {
                  return (
                    <li key={idx} className=" text-gray-700 text-sm">
                      {ach}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
