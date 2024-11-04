import React from "react";
import LatestJobCards from "./shareable/LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto sm:px-7 lg:px-8 my-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
        <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
        {allJobs.length <= 0 ? (
          <span>No jobs available</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
