import { Router } from "express";
import isAuthenticated from "../middlewares/Auth.middlewares.js";
import {
  applicationForJob,
  getAllApplicationsForJob,
  getApplicants,
  updateSatatus,
} from "../controllers/application.controller.js";

const router = Router();

// Apply job
router.route("/apply/:id").get(isAuthenticated, applicationForJob);
router.route("/get").get(isAuthenticated, getAllApplicationsForJob);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateSatatus);

export default router;
