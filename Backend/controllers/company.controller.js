import { Company } from "../models/company.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";

const registerCompany = AsyncHandler(async (req, res) => {
  const { companyName } = req.body;

  if (!companyName) {
    throw new ApiError(400, "Company name is required");
  }

  let company = await Company.findOne({ name: companyName });
  if (company) {
    throw new ApiError(409, "Company already exists");
  }

  company = await Company.create({
    name: companyName,
    userId: req.id,
  });

  return res
    .status(200)
    .json(new ApiResponse(201, "Company registered Successfully", {company}));
});

const getUserCompanies = AsyncHandler(async (req, res) => {
  const userId = req.id; // Loged in user id
  const companies = await Company.find({ userId });

  if (!companies) {
    throw new ApiError(404, "No companies found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Companies fetched successfully", { companies })
    );
});

const getCompanyById = AsyncHandler(async (req, res) => {
  const companyId = req.params.id; // Fixed typo here
  //   console.log(companyId);
//   if (!mongoose.Types.ObjectId.isValid(companyId)) {
//     throw new ApiError(400, "Invalid company ID format");
//   }
  const company = await Company.findById(companyId);
  //   console.log(company)

  if (!company) {
    throw new ApiError(404, "No company found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Company fetched by id successfully", company)
    );
});

const updateCompany = AsyncHandler(async (req, res) => {
  const { name, description, website, location } = req.body;

  const updateData = { name, description, website, location };

  const companyId = req.params.id;
  const company = await Company.findByIdAndUpdate(companyId, updateData, {
    new: true,
  });

  if (!company) {
    throw new ApiError(404, "No company found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { company }, "Company updated successfully"));
});

export { registerCompany, getUserCompanies, getCompanyById, updateCompany };
