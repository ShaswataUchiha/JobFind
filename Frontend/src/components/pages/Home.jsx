import React, { useEffect } from "react";
import Navbar from "../shareable/Navbar";
import HeroSection from "../HeroSection";
import CategorySection from "../CategorySection";
import LatestJobs from "../LatestJobs";
import { Footer } from "../shareable/Footer";
import GetAllJobs from "@/hooks/getAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // getAllJobs();
  const {user} = useSelector(store => store.auth)
  const naigate = useNavigate();

  useEffect(() => {
    if(user?.role === 'recruiter'){
      naigate("/admin/companies")
    }
  }, [])
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
