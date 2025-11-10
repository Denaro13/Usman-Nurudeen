"use client";
import React from "react";
import {
  Code2,
  Layout,
  Database,
  //   Boxes,
  GitBranch,
  TerminalSquare,
} from "lucide-react";
import { IconCloud } from "@/components/ui/icon-cloud";

const slugs = [
  "typescript",
  "javascript",
  "python",
  "php",
  "react",
  "html5",
  "css3",
  "styledcomponents",
  "nodedotjs",
  "express",
  "laravel",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "mongodb",
  "mysql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "figma",
  "threedotjs",
  "framermotion",
];

const skills = [
  {
    category: "Frontend & UI",
    icon: <Layout className="w-6 h-6 text-pink-500" />,
    items: [
      "React",
      "Next.js",
      "Styled Components",
      "TailwindCSS",
      "CSS3",
      "HTML5",
      "Three.js",
      "Framer Motion",
    ],
  },
  {
    category: "Backend & APIs",
    icon: <TerminalSquare className="w-6 h-6 text-blue-500" />,
    items: ["Node.js", "Express.js", "Laravel (PHP)", "Python"],
  },
  {
    category: "Databases",
    icon: <Database className="w-6 h-6 text-green-500" />,
    items: ["MongoDB", "MySQL"],
  },
  {
    category: "Programming Languages",
    icon: <Code2 className="w-6 h-6 text-yellow-500" />,
    items: ["JavaScript", "TypeScript", "Python", "PHP"],
  },
  {
    category: "Tools & Others",
    icon: <GitBranch className="w-6 h-6 text-purple-500" />,
    items: ["Git", "Jest", "Prompt Engineering"],
  },
];

const Skills = () => {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );
  return (
    <div className="mt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="p-6 bg-white backdrop-blur rounded-xl shadow-md hover:shadow-xl transition group"
            >
              <div className="flex items-center gap-3 mb-4">
                {skill.icon}
                <h3 className="text-xl font-semibold">{skill.category}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {skill.items.map((item, j) => (
                  <li
                    key={j}
                    className="px-3 py-1 text-sm bg-gray-300 rounded-full group-hover:bg-yellow-500 group-hover:text-black transition"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="relative flex size-full items-center justify-center overflow-hidden">
          <IconCloud images={images} />
        </div>
      </div>
    </div>
  );
};

export default Skills;
