import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const isApplied = true;

const JobDescription = () => {
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1>Title</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              Positions
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
              Jobtype
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              Salary LPA
            </Badge>
          </div>
        </div>
        <Button
          className={`rounded-full ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>
      <div>
        <h1 className="font-bold my-1">Role</h1>
        <h1 className="font-bold my-1">Location</h1>
        <h1 className="font-bold my-1">Description</h1>
        <h1 className="font-bold my-1">Experiance</h1>
        <h1 className="font-bold my-1">Salary</h1>
        <h1 className="font-bold my-1">Total Application</h1>
        <h1 className="font-bold my-1">Posted Date</h1>

      </div>
    </div>
  );
};

export default JobDescription;
