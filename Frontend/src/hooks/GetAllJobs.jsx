import { setAllobs } from "@/redux/jobSlice";
import { JOB_APT_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const GetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_APT_ENDPOINT}/get`, {
          withCredentials: true,
        });
        if (res.status === 200 && res.data.statusCode === 200) {
          dispatch(setAllobs(res.data.data));
        }
      } catch (error) {
        console.log("Error fetching jobs", error);
      }
    };
    fetchAllJobs();
  }, [dispatch]);

  return null;
};

export default GetAllJobs;
