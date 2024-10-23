import React from "react";
import Navbar from "../shareable/Navbar";
import Job from "../Job";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="font-bold text-2xl my-8 text-gray-800">
          Search Results ({randomJobs.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {randomJobs.map((item, index) => (
            <Job key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
