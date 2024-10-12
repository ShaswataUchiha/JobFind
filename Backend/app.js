import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js"

const app = express();

app.use(cors({
    origin : "https://localhost:5173",
    credentials : true,
}))

// Using json to handel midllewres
app.use(express.json({ limit : "24kb"}))
app.use(express.urlencoded({ extended :true, limit : "24kb" }))
app.use(cookieParser())


// http://localhost:3000/api/v1/user

app.use("/api/v1/user", userRoutes)

export {app}