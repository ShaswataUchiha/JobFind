import React from "react";
import FilterSection from "../FilterSection";
import Navbar from "../shareable/Navbar";
import Job from "../Job";
import { useSelector } from "react-redux";
import store from "@/redux/store";

const jobsArray = [1, 2, 4, 5, 6, 7, 8];

const Jobs = () => {

  const {allJobs} = useSelector(store => store.job)

  return (
    <div>
      {/* Navbar at the top */}
      <Navbar />

      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Section Sidebar */}
          <div className="lg:w-[13%] w-full lg:max-w-xs">
            <FilterSection />
          </div>

          {/* Job Cards Display Area */}
          <div className="flex-1">
            {
              allJobs.length <= 0 ? (
                <span className="block text-center text-gray-600 text-lg mt-10">No Jobs Found</span>
              ) : (
                <div className="h-[80vh] overflow-y-auto pb-5 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allJobs.map((job) => (
                      <Job key={job?._id} job = {job}/>
                    ))}
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
