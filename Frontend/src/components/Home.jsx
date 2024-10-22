import React from "react";
import Navbar from "./shareable/Navbar";
import HeroSection from "./HeroSection";
import CategorySection from "./CategorySection";
import LatestJobs from "./LatestJobs";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection/>
      {/* <CategorySection/> */}
      <LatestJobs/>
    </div>
  );
};

export default Home;
