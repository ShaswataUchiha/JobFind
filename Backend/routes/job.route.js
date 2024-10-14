import { Router } from "express";
import isAuthenticated from "../middlewares/Auth.middlewares.js";
import { getAdminPostedJobs, getAllJobs, getJobsById, postJob } from "../controllers/job.cntroller.js";

const router = Router();

// Post jobs
router.route("/post").post(isAuthenticated, postJob)
router.route("/get").get(isAuthenticated, getAllJobs)
router.route("/getAdminJob").get(isAuthenticated, getAdminPostedJobs)
router.route("/get/:id").get(isAuthenticated, getJobsById)


export default router;