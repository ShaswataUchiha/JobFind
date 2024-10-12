import jwt from "jsonwebtoken";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const isAuthenticated = AsyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  const decode = jwt.verify(token, process.env.SECRET_KEY)    
  if (!decode){
    throw new ApiError(401, "Invalid token");
  }

  req.id = decode.userId;
  next();
});

export default isAuthenticated;
