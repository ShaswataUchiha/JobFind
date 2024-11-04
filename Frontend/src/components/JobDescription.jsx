import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Navbar from "./shareable/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_APT_ENDPOINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const {user} = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;
  // console.log(singleJob)
  const isApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_APT_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.status === 200 && res.data.statusCode === 200) {
          dispatch(setSingleJob(res.data.data));
        }
      } catch (error) {
        console.log("Error fetching jobs", error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 p-8 bg-white shadow-lg rounded-xl border border-gray-200 transition-transform duration-300 hover:shadow-2xl hover:scale-105">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#7209b7] transition-colors duration-300 hover:text-[#5f32ad]">
            {singleJob?.title}
          </h1>
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <Badge
              className="text-blue-700 font-bold px-4 py-1.5 rounded-full transition-transform duration-300 hover:scale-105"
              variant="ghost"
            >
              {singleJob?.position} Positions
            </Badge>
            <Badge
              className="text-[#F83002] font-bold px-4 py-1.5 rounded-full transition-transform duration-300 hover:scale-105"
              variant="ghost"
            >
              {singleJob?.jobType}
            </Badge>
            <Badge
              className="text-[#7209b7] font-bold px-4 py-1.5 rounded-full transition-transform duration-300 hover:scale-105"
              variant="ghost"
            >
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          className={`rounded-full px-6 py-3 text-white font-semibold transition-all duration-300 ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad] hover:scale-105 shadow-lg"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h2 className="border-b-2 border-b-gray-300 font-medium text-lg text-gray-800 mt-8 pb-4">
        {singleJob?.description}
      </h2>
      <div className="space-y-4 mt-4 text-gray-700 text-sm md:text-base">
        <p>
          <span className="font-bold text-[#7209b7]">Role:</span>{" "}
          {singleJob?.title}
        </p>
        <p>
          <span className="font-bold text-[#7209b7]">Location:</span>{" "}
          {singleJob?.location}
        </p>
        <p>
          <span className="font-bold text-[#7209b7]">Description:</span>{" "}
          {singleJob?.description}
        </p>
        <p>
          <span className="font-bold text-[#7209b7]">Experience:</span>{" "}
          {singleJob?.experianceLevel}
        </p>
        <p>
          <span className="font-bold text-[#7209b7]">Salary:</span>{" "}
          {singleJob?.salary} LPA
        </p>
        <p>
          <span className="font-bold text-[#7209b7]">Total Applications:</span>{" "}
          {singleJob?.applications?.length}
        </p>
        <p>
          <span className="font-bold text-[#7209b7]">Posted Date:</span>{" "}
          {singleJob?.createdAt.split("T")[0]}
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
