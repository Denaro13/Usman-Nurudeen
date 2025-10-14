// import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Boxes } from "./ui/background-boxes";
import { File, Search, Settings } from "lucide-react";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen w-full bg-black pt-16 flex justify-center"
    >
      <div className="relative container max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden rounded-lg py-4 md:py-0">
        {/* Masked overlay (same style as Aceternity) */}
        <div className="absolute inset-0 w-full h-full bg-black z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        {/* Background effect (replace with your own, e.g., Boxes, Grid, or animated canvas) */}
        <Boxes />

        {/* Foreground Content */}
        <div className="relative z-30 max-w-xl space-y-4 mt-8 md:mt-0 ">
          <p className="text-xl font-medium">Hi 🖐 I’m Usman Nurudeen</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            A Creative Software Developer
          </h1>
          <p className="text-md md:text-xl text-gray-300">
            Building sleek digital experiences that blend performance, design,
            and innovation.
          </p>
          <button className="mt-6 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition">
            View My Works
          </button>
        </div>
        {/* Image with decoration */}
        <div className="relative z-30 mt-10 md:mt-0 h-[40rem] w-[30rem] rounded-full overflow-hidden shadow-lg">
          <Image
            src="/IMG_9818.jpg"
            alt="Usman's Image"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
