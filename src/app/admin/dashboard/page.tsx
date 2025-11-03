"use client";
import { AddExperience } from "@/components/AddExperience";
import { UpdateExperience } from "@/components/UpdateExperience";
import { getExperiences } from "@/lib/api/experience";
import { formatDate } from "@/lib/formatDate";
import { Experience } from "@/lib/types";
import { Building2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [experiences, setExperiences] = useState<Experience[] | undefined>(
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
    <div className="py-6 px-6">
      <div className="flex justify-end">
        <AddExperience setExperiences={setExperiences} />
      </div>
      {isLoading && !experiences && (
        <div className="flex items-center justify-center">
          <div className="ml-3 mt-4 animate-spin rounded-full h-[2.5rem] w-[2.5rem] border-t-2 border-b-2 border-amber-400"></div>
        </div>
      )}
      {experiences && (
        <div>
          <h2 className="text-2xl font-bold text-center mb-4">
            Your Experiences
          </h2>
          {experiences.length > 0 ? (
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className="relative border rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition group"
                >
                  <div className="hidden absolute w-full h-full group-hover:flex items-center justify-center">
                    <UpdateExperience
                      setExperiences={setExperiences}
                      experience={exp}
                    />
                  </div>
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
                  <h3 className="mt-2 text-lg md:text-xl font-bold">
                    {exp.title}
                  </h3>
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
          ) : (
            <div className="flex items-center justify-center mt-4">
              <p className="text-foreground ">
                You currently do not have any experience
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
