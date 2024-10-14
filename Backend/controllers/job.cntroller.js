import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const postJob = AsyncHandler(async (req, res) => {
  const {
    title,
    description,
    requirements,
    salary,
    location,
    jobType,
    position,
    experiance,
    companyId,
  } = req.body;
  const userId = req.id;

  if (
    !title ||
    !description ||
    !requirements ||
    !salary ||
    !location ||
    !jobType ||
    !position ||
    !experiance ||
    !companyId
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const company = await Company.findById(companyId);
  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  const numericSalary = Number(salary);
  if (isNaN(numericSalary) || numericSalary <= 0) {
    throw new ApiError(400, "Salary must be a positive number");
  }

  const job = await Job.create({
    title,
    description,
    requirements: requirements.split(","),
    salary: numericSalary,
    location,
    jobType,
    position,
    experianceLevel: experiance,
    company: companyId,
    createdBy: userId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, job, "Job created successfully"));
});

const getAllJobs = AsyncHandler(async (req, res) => {
  const keyword = req.query.keyword || "";
  let query = {};

  if (keyword) {
    query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
  }

  const jobs = await Job.find(query).populate({
    path: "company",
  }).sort({createdAt: -1});
  if (!jobs) {
    throw new ApiError(404, "No jobs found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
});

const getJobsById = AsyncHandler(async (req, res) => {
  const jobid = req.params.id;
  const job = await Job.findById(jobid);

  if (!job) {
    throw new ApiError(404, "Jobs not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, job, "Job fetched successfully"));
});

const getAdminPostedJobs = AsyncHandler(async (req, res) => {
  const adminId = req.id;
  const jobs = await Job.find({ createdBy: adminId }).populate({
    path: "company",
    select: "name",
  }).populate({
    path: "createdBy",
    select: "fullname",
  });

  if (!jobs) {
    throw new ApiError(404, "No jobs found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        jobs,
        "Jobs that created by admin fetched successfully"
      )
    );
});

export { postJob, getAllJobs, getJobsById, getAdminPostedJobs };
