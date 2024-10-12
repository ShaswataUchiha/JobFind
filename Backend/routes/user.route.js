import {Router} from "express"
import { 
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
} from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/Auth.middlewares.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logut").post(logoutUser)
router.route("/prfile/update").post(isAuthenticated, updateUser)

export default router