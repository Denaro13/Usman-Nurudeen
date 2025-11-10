"use client";
// import { Experience as ExperienceSchema } from "@/app/admin/page";
import { getExperiences } from "@/lib/api/experience";
import { formatDate } from "@/lib/formatDate";
import { Experience as ExperienceData } from "@/lib/types";
import { Building2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceData[] | undefined>(
    undefined
  );
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
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="flex items-center gap-2 text-amber-500 font-medium">
                <Skeleton className="h-4 w-36 rounded-full bg-amber-100" />
              </div>
              <h3 className="mt-2 text-lg md:text-xl font-bold">
                <Skeleton className="h-4 w-[250px] bg-amber-100" />
              </h3>
              <p className="text-gray-600 font-medium mt-2">
                <Skeleton className="h-4 w-[250px] bg-amber-100" />
              </p>
              <div className="mt-3">
                <ul className="pl-4 list-disc">
                  {Array.from({ length: 3 }).map((_, idx) => {
                    return (
                      <li key={idx} className=" text-gray-700 text-sm">
                        <Skeleton className="h-4 w-full bg-amber-100" />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
      {experiences && (
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
      )}
    </div>
  );
};

export default Experience;
