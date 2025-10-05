import { Building2 } from "lucide-react";
import React from "react";

const experiences = [
  {
    year: "2013 – 2017",
    role: "B.Sc(Ed) Mathematics & Education",
    company: "University of Lagos",
    desc: "Studied Mathematics and Education, developing strong analytical and problem-solving skills that support my software engineering expertise.",
  },
];
const Education = () => {
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

export default Education;
