import React from "react";
import { Badge } from "../ui/badge";

const LatestJobCards = ({job}) => {
  return (
    <div className="hover:animate-background transform hover:scale-105 rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-lg transition duration-300 ease-in-out hover:bg-[length:400%_400%] hover:shadow-xl hover:[animation-duration:_4s]">
      <div className="w-full rounded-[10px] bg-white p-4 sm:p-6 relative">
        {/* Company and Job Info */}
        <div className="mt-8 text-center">
          <h1 className="font-semibold text-xl sm:text-2xl text-gray-800">{job?.company?.name}</h1>
          <p className="text-sm sm:text-base text-gray-500">Location: India</p>
        </div>

        {/* Job Title and Description */}
        <div className="mt-4 text-center">
          <h1 className="font-bold text-lg sm:text-xl text-[#6A38C2]">{job?.title}</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            {job?.description}
          </p>
        </div>

        {/* Job Details (Badges) */}
        <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
          <Badge className={"bg-blue-100 text-blue-700 font-bold"} variant="ghost">
            {job?.positions} Positions
          </Badge>
          <Badge className={"bg-red-100 text-[#F83002] font-bold"} variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className={"bg-purple-100 text-[#7209b7] font-bold"} variant="ghost">
            {job?.salary} LPA
          </Badge>
        </div>

        {/* Apply Button */}
        <div className="mt-6 flex justify-center">
          <button className="w-full md:w-auto bg-[#6A38C2] text-white py-2 px-6 rounded-lg hover:bg-[#8544D8] transition-colors duration-300">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;
