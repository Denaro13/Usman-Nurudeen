import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, GraduationCap, Info, Sparkles } from "lucide-react";
import AboutMe from "./AboutMe";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";

const About = () => {
  return (
    <section id="about" className="min-h-screen w-full py-16 bg-gray-100">
      <div className="container mx-auto max-w-6xl px-4">
        <div className=" w-full text-center">
          <span className="text-lg border border-amber-200 px-4 py-2 rounded-full">
            Resume
          </span>
          <h4 className="mt-4 text-3xl font-bold">My Resume</h4>
        </div>
        <Tabs defaultValue="about-me" className="mt-6">
          <div className="w-full flex justify-center overflow-x-auto">
            <TabsList className="py-6 px-0 bg-amber-300 mx-auto rounded-full justify-between items-center ">
              <TabsTrigger
                value="about-me"
                className="text-lg font-medium flex items-center gap-2 px-6 rounded-full data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:h-full data-[state=active]:py-6 transition-all duration-300"
              >
                <Info size={20} />
                About Me
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="text-lg font-medium flex items-center gap-2 px-6 rounded-full data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:h-full data-[state=active]:py-6 transition-all duration-300"
              >
                <Briefcase size={20} /> Experience
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="text-lg font-medium flex items-center gap-2 px-6 rounded-full data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:h-full data-[state=active]:py-6 transition-all duration-300"
              >
                <GraduationCap size={20} />
                Education
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="text-lg font-medium flex items-center gap-2 px-6 rounded-full data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:h-full data-[state=active]:py-6 transition-all duration-300"
              >
                <Sparkles size={20} />
                Skills
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="about-me">
            <AboutMe />
          </TabsContent>
          <TabsContent value="experience">
            <Experience />
          </TabsContent>
          <TabsContent value="education">
            <Education />
          </TabsContent>
          <TabsContent value="skills">
            <Skills />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default About;
