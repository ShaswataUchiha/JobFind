import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken";

const registerUser = AsyncHandler(async (req, res) => {
  const { fullname, email, phonenumber, password, role } = req.body;

  if (!fullname || !email || !phonenumber || !password || !role) {
    throw new ApiError(400, "Required fileds are missing");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User with email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    fullname,
    email,
    phonenumber,
    password: hashedPassword,
    role,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "User registered Successfully"));
});

const loginUser = AsyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    throw new ApiError(400, "Required fields are missing");
  }

  let user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (role !== user.role) {
    throw new ApiError(403, "Accunt doesnt exict with current role");
  }

  const tokenData = {
    userId: user._id,
  };

  const accessToken = jwt.sign(tokenData, process.env.SECRET_KEY, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(tokenData, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  user = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    phonenumber: user.phonenumber,
    role: user.role,
    profile : user.profile
  };

  const options = {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, { user, accessToken }, "User logged in successfully")
    );
});

const logoutUser = AsyncHandler(async (req, res) => {
  res.cookie("refreshToken", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "User logged out successfully"));
});

const updateUser = AsyncHandler(async (req, res) => {
  const { fullname, email, phonenumber, bio, skills } = req.body;
  const file = req.file;

  if (!fullname || !email || !phonenumber || !bio || !skills) {
    throw new ApiError(400, "No fields are provided to update");
  }

  const skillsArray = skills.split(",");
  const userId = req.id;
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (fullname) user.fullname = fullname;
  if (email) user.email = email;
  if (phonenumber) user.phonenumber = phonenumber;
  if (bio) user.bio = bio;
  if (skills) (user.profile.skills = skillsArray);

  await user.save();

  const updatedUser  = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    phonenumber: user.phonenumber,
    role: user.role,
    profile : user.profile
  };

  return res
  .status(200)
  .json(new ApiResponse(200, { user : updateUser }, "User updated successfully"));
});

export { 
    registerUser, 
    loginUser, 
    logoutUser,
    updateUser
};
