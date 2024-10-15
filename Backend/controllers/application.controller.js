import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

const applicationForJob = AsyncHandler(async (req, res) => {
  const userId = req.id;
  const jobId = req.params.id;

  if (!jobId) {
    throw new ApiError(400, "Job ID is required");
  }

  const existingApplication = await Application.findOne({
    job: jobId,
    applicant: userId,
  });

  if (existingApplication) {
    throw new ApiError(400, "You have already applied for this job");
  }

  // Check if job is available or not
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // create new appliction
  const application = await Application.create({
    job: jobId,
    applicant: userId,
  });

  job.applications.push(application._id);
  await job.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Application submitted successfully"
      )
    );
});

const getAllApplicationsForJob = AsyncHandler(async (req, res) => {
  const userId = req.id;
  const applications = await Application.find({ applicant: userId }).populate({
    path: "job",
    options: { sort: { createdAt: -1 } },
    populate: {
      path: "company",
      options: { sort: { createdAt: -1 } },
    },
  });

  if (!applications || applications.length === 0) {
    throw new ApiError(404, "No applications found for this user");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, applications, "Applications fetched successfully")
    );
});

// Admin check how many users applied for this job
const getApplicants = AsyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const job = await Job.findById(jobId).populate({
    path: "applications",
    options: { sort: { createdAt: -1 } },
    populate: {
      path: "applicant",
      select: "fullname email",
    },
  });

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  if (job.applications.length === 0) {
    throw new ApiError(404, "No applications found for this job");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, job, "Applications fetched successfully"));
});

const updateSatatus = AsyncHandler(async (req, res) => {
  const { status } = req.body;
  const applicationId = req.params.id;

  if (!status) {
    throw new ApiError(400, "Invalid status");
  }

  const application = await Application.findOne({ _id: applicationId });

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  application.status = status.toLowerCase();
  await application.save();

  return res
    .status(200)
    .json(new ApiResponse(200, application, "Status updated successfully"));
});

export {
  applicationForJob,
  getAllApplicationsForJob,
  getApplicants,
  updateSatatus,
};
