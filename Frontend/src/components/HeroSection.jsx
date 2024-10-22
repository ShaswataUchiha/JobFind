import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
      {/* Floating icons */}
      <motion.div
        className="absolute top-10 left-10 h-16 w-16 bg-purple-200 rounded-full opacity-70"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
      <motion.div
        className="absolute bottom-20 right-20 h-24 w-24 bg-blue-200 rounded-full opacity-70"
        animate={{ x: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-6 my-10 max-w-3xl w-full z-10"
      >
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mx-auto px-4 py-2 rounded-full bg-[#F83002]/10 text-[#F83002] font-semibold"
        >
          Leading Platform for Your Career Success
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
        >
          Unlock New Opportunities &amp; <br />
          Land Your <span className="text-[#6A38C2]">Dream Job</span>{" "}
          Effortlessly
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-gray-700 text-base sm:text-lg"
        >
          Join thousands of job seekers and top companies. Explore career paths,
          apply to the best jobs, and take the next step in your journey.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row w-full sm:w-[70%] lg:w-[50%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2 sm:gap-4 mx-auto bg-white"
        >
          <input
            type="text"
            placeholder="Search for your dream job"
            className="outline-none border-none w-full px-4 py-2 rounded-full sm:rounded-none"
          />
          <Button className="rounded-full sm:rounded-r-full bg-[#6A38C2] px-6 py-3 hover:bg-[#8544D8] transition-all duration-300">
            <Search className="h-5 w-5 text-white" />
          </Button>
        </motion.div>

        {/* Secondary CTA */}
        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          href="/explore"
          className="text-[#6A38C2] hover:underline mt-4 text-sm sm:text-base"
        >
          Or explore top companies hiring now
        </motion.a>
      </motion.div>

      {/* Background animations */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      />
    </div>
  );
};

export default HeroSection;
