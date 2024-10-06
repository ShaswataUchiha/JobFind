import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin : "https://localhost:5173",
    credentials : true,
}))

// Using json to handel midllewres
app.use(express.json({ limit : "24kb"}))
app.use(express.urlencoded({ extended :true, limit : "24kb" }))
app.use(cookieParser())

export {app}