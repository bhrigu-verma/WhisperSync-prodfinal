import React from "react";
import { Cover } from "@/components/ui/cover";
const HeroSection = () => {
    return (
      <div className="relative text-center h-[300px] sm:h-[200px] flex flex-col justify-center items-center">
        {/* <h1 className="text-3xl sm:text-5xl text-white mb-4 sm:mb-6 font-extrabold tracking-tight leading-tight">
          Turn Speech into Storytelling.{" "}
          <span className="text-yellow-400">with WhisperSync</span>
        </h1> */}

         <h1 className="text-4xl md:text-5xl pd-5 lg:text-7xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Turn Speech into Storytelling.<br /> at <Cover className="text-yellow-400">WhisperSync</Cover>
         </h1>
        <p className="text-base sm:text-lg text-gray-100 max-w-2xl mb-16 mx-auto  m-6 font-medium leading-loose p-5">
          Upload your short-form videos and receive precise transcriptions in
          minutes. Built for content creators, editors, and social media
          managers.
        </p>
      </div>
    );
  };
  
  export default HeroSection;
  