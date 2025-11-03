import { AddEducation } from "@/components/AddEducation";
import { Building2 } from "lucide-react";
import React from "react";

const education = [
  {
    year: "2013 – 2017",
    role: "B.Sc(Ed) Mathematics & Education",
    company: "University of Lagos",
    desc: "Studied Mathematics and Education, developing strong analytical and problem-solving skills that support my software engineering expertise.",
  },
];

const page = () => {
  return (
    <div className="py-6 px-6">
      <div className="flex justify-end">
        <AddEducation />
      </div>
      <h2 className="text-2xl font-bold text-center mb-4">Your Education</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu, i) => (
          <div
            key={i}
            className="border rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 text-amber-500 font-medium">
              <Building2 className="w-4 h-4" />
              <span>{edu.year}</span>
            </div>
            <h3 className="mt-2 text-lg md:text-xl font-bold">{edu.role}</h3>
            <p className="text-gray-600 font-medium">{edu.company}</p>
            <p className="mt-3 text-gray-500 text-sm">{edu.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
