import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = () => {

  const navigate = useNavigate()
  const jobId = "iqnqnihfqpqb"

  return (
    <div className="p-6 rounded-xl shadow-lg bg-white border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      {/* Header with Time & Bookmark */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs md:text-sm text-gray-500">Posted 2 Days Ago</p>
        <Button
          variant="outline"
          className="rounded-full hover:bg-gray-100"
          size="icon"
        >
          <Bookmark className="text-gray-500 hover:text-blue-500 transition-colors duration-200" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4 my-4">
        <Avatar className="p-3 rounded-md shadow-sm border">
          <AvatarImage
            src="https://www.thepixelfreak.co.uk/wp-content/uploads/2019/05/Entwined-M-Logo.png"
            alt="Company Logo"
          />
        </Avatar>
        <div>
          <h1 className="font-semibold text-lg md:text-xl text-gray-800">
            Company Name
          </h1>
          <p className="text-sm md:text-base text-gray-500">India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h1 className="font-bold text-xl md:text-2xl text-gray-800 my-2">
          Job Title
        </h1>
        <p className="text-sm md:text-base text-gray-600 line-clamp-3">
          A brief description of the job role goes here. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
          Sed cursus ante dapibus diam.
        </p>
      </div>

      {/* Job Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge
          className="text-blue-700 font-semibold px-3 py-1"
          variant="ghost"
        >
          12 Positions
        </Badge>
        <Badge
          className="text-[#F83002] font-semibold px-3 py-1"
          variant="ghost"
        >
          1+ Years
        </Badge>
        <Badge
          className="text-[#7209b7] font-semibold px-3 py-1"
          variant="ghost"
        >
          18 LPA
        </Badge>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button onClick={() => navigate(`/description/${jobId}`)}
          variant="outline"
          className="w-full sm:w-auto hover:bg-blue-50 text-blue-700 border-blue-700"
        >
          View Details
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-auto hover:bg-gray-100"
        >
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
