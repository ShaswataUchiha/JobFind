import React from "react";
import Navbar from "../shareable/Navbar";
import HeroSection from "../HeroSection";
import CategorySection from "../CategorySection";
import LatestJobs from "../LatestJobs";
import { Footer } from "../shareable/Footer";
import GetAllJobs from "@/hooks/getAllJobs";

const Home = () => {
  // getAllJobs();
  return (
    <div>
      <GetAllJobs />
      <Navbar />
      <HeroSection />
      {/* <CategorySection/> */}
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
