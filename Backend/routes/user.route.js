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
router.route("/logout").get(logoutUser)
router.route("/profile/update").post(isAuthenticated, updateUser)

export default router