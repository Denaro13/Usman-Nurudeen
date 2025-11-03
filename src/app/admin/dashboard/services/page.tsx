import { AddService } from "@/components/AddService";
import {
  Brain,
  Code2,
  Database,
  GraduationCap,
  Layout,
  Users,
} from "lucide-react";
import React from "react";

const services = [
  {
    title: "Full-Stack Development",
    icon: <Code2 className="w-6 h-6 text-yellow-500" />,
    desc: "Building high-performance web apps with modern frameworks — from responsive UIs to scalable backends.",
  },
  {
    title: "Frontend & UI/UX",
    icon: <Layout className="w-6 h-6 text-pink-500" />,
    desc: "Crafting sleek, user-focused interfaces using React, Next.js, TailwindCSS, and design best practices.",
  },
  {
    title: "Backend Engineering",
    icon: <Database className="w-6 h-6 text-green-500" />,
    desc: "Designing APIs, managing databases, and optimizing system performance with Node.js, Express, and Laravel.",
  },
  {
    title: "AI & LLM Training",
    icon: <Brain className="w-6 h-6 text-blue-500" />,
    desc: "Creating mathematical datasets, fine-tuning models, and improving AI reasoning through structured training.",
  },
  {
    title: "EdTech Solutions",
    icon: <GraduationCap className="w-6 h-6 text-orange-500" />,
    desc: "Founder of PiPoint Edtech — bridging education and technology to make learning smarter and more accessible.",
  },
  {
    title: "Mentorship & Tutoring",
    icon: <Users className="w-6 h-6 text-purple-500" />,
    desc: "Over 6 years of experience teaching coding and mathematics, mentoring learners at all levels.",
  },
];

const page = () => {
  return (
    <div className="py-6 px-6">
      <div className="flex justify-end">
        <AddService />
      </div>
      <h2 className="text-2xl font-bold text-center mb-4">Your Services</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, i) => (
          <div
            key={i}
            className="p-6 bg-gray-200 hover:bg-gray-800/60 backdrop-blur rounded-xl shadow-md hover:shadow-xl transition group"
          >
            <div className="flex items-center gap-3 mb-4">
              {service.icon}
              <h3 className="text-xl font-semibold">{service.title}</h3>
            </div>
            <p className="text-black text-sm  group-hover:text-white transition">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
