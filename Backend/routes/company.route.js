import { Router } from "express";
import { 
    registerCompany,  
    getUserCompanies,
    getCompanyById,
    updateCompany
} from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/Auth.middlewares.js";

const router = Router();

// Register a new 
router.route("/register").post(isAuthenticated, registerCompany)
// Get all companies
router.route("/get").get(isAuthenticated, getUserCompanies)
// get company by id
router.route("/get/:id").get(isAuthenticated, getCompanyById)
// update company
router.route("/update/:id").put(isAuthenticated, updateCompany)

export default router;