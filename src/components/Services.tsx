import {
  Bot,
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
    desc: "Developing high-performance web applications using modern frameworks — from responsive, intuitive UIs to secure, scalable backends.",
  },
  {
    title: "Frontend & UI/UX Design",
    icon: <Layout className="w-6 h-6 text-pink-500" />,
    desc: "Designing visually stunning and user-centered interfaces with React, Next.js, and Tailwind CSS — blending aesthetics with seamless usability.",
  },
  {
    title: "Backend Engineering",
    icon: <Database className="w-6 h-6 text-green-500" />,
    desc: "Architecting robust APIs, managing data workflows, and enhancing performance with Node.js, Express, and Laravel.",
  },
  {
    title: "AI & LLM Development",
    icon: <Brain className="w-6 h-6 text-blue-500" />,
    desc: "Building and fine-tuning large language models with custom mathematical datasets to improve accuracy, reasoning, and performance.",
  },
  {
    title: "AI Automation",
    icon: <Bot className="w-6 h-6 text-cyan-500" />,
    desc: "Automating workflows and content creation using AI tools and APIs — integrating GPT, Zapier, and custom scripts to boost productivity and innovation.",
  },
  {
    title: "EdTech Innovation",
    icon: <GraduationCap className="w-6 h-6 text-orange-500" />,
    desc: "Currently building PiPoint — an EdTech startup revolutionizing how learners engage with technology-driven education.",
  },
  {
    title: "Mentorship & Tutoring",
    icon: <Users className="w-6 h-6 text-purple-500" />,
    desc: "Over 6 years of experience teaching Mathematics and Programming — mentoring learners and helping them master complex concepts with clarity.",
  },
];

const Services = () => {
  return (
    <section id="services" className=" w-full sm:px-0 py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className=" w-full text-center">
          <span className="text-lg border border-amber-200 px-4 py-2 rounded-full">
            Services
          </span>
          <h4 className="mt-4 text-3xl font-bold">My Expertise</h4>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </section>
  );
};

export default Services;
