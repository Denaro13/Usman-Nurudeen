import Image from "next/image";
import React from "react";
import { FlipWords } from "./ui/flip-words";

const AboutMe = () => {
  const words = ["Software", "Frontend", "Backend", "FullStack", "MERN Stack"];
  return (
    <div className="mt-10">
      <div className="relative container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between overflow-hidden rounded-lg">
        {/* Foreground Content */}
        <div className="relative z-30 max-w-xl space-y-4">
          <h4 className="text-4xl font-bold">
            <FlipWords words={words} /> Developer
          </h4>
          <p className="text-lg whitespace-pre-wrap">
            Hello 👋, I’m Usman Nurudeen, a creative developer, educator, and
            founder of <strong>PiPoint Edtech</strong> - a platform empowering
            learners through innovation. I love turning bold ideas into seamless
            digital experiences, blending code, design, and creativity to craft
            products that don’t just work, they wow. Let’s collaborate and bring
            your vision to life!
          </p>
          <div className="mt-8 grid grid-cols-[120px_1fr] gap-y-3">
            <p className="font-medium">Name</p>
            <p className="font-bold">Usman Nurudeen</p>

            <p className="font-medium">Nationality</p>
            <p className="font-bold">Nigerian</p>

            <p className="font-medium">Phone</p>
            <p className="font-bold">08155835284</p>

            <p className="font-medium">Experience</p>
            <p className="font-bold">4 years</p>

            <p className="font-medium">Freelance</p>
            <p className="font-bold">Available</p>

            <p className="font-medium">Language</p>
            <p className="font-bold">English</p>
          </div>
        </div>

        {/* Image with decoration */}
        <div className="relative z-30 mt-10 md:mt-0 h-[35rem] w-[30rem] rounded-full overflow-hidden shadow-lg">
          <Image
            src="/IMG_9818.jpg"
            alt="Usman's Image"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
