import React, { useState } from "react";
import Navbar from "../shareable/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { RainbowButton } from "../ui/rainbow-button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();

  const changeEventhandeler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const chaneFileHandeler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandeler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phonenumber", input.phonenumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (
      !input.fullname ||
      !input.email ||
      !input.phonenumber ||
      !input.password ||
      !input.role
    ) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.status === 201 || res.status === 200) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 409) {
        toast.error("User already exists.");
      } else {
        toast.error(error.response?.data?.message || "An error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <Navbar />
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-10">
        <form
          onSubmit={submitHandeler}
          className="w-full sm:w-3/4 lg:w-1/2 bg-white shadow-lg rounded-xl p-6 sm:p-8 my-10 border-t-4 border-primary"
        >
          <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
            Create Your Account
          </h1>
          <div className="space-y-5">
            <div>
              <Label className="block text-sm font-medium text-gray-600">
                Full Name
              </Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventhandeler}
                placeholder="Your Name"
                className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-600">
                Email
              </Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventhandeler}
                placeholder="yourmail@gmail.com"
                className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-600">
                Phone Number
              </Label>
              <Input
                type="tel"
                value={input.phonenumber}
                name="phonenumber"
                onChange={changeEventhandeler}
                placeholder="Eg: 9830XXXXXX"
                className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-600">
                Password
              </Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventhandeler}
                placeholder="Enter your password"
                className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 my-5">
              <RadioGroup className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventhandeler}
                    className="cursor-pointer form-radio"
                  />
                  <Label htmlFor="r1" className="text-sm">
                    Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventhandeler}
                    className="cursor-pointer form-radio"
                  />
                  <Label htmlFor="r2" className="text-sm">
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <Label className="block text-sm font-medium text-gray-600">
                Profile
              </Label>
              <Input
                accept="image/*"
                type="file"
                onChange={chaneFileHandeler}
                className="w-full sm:w-auto cursor-pointer border rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <RainbowButton
            type="submit"
            className="text-white w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 ease-in-out"
          >
            Sign Up
          </RainbowButton>
          <p className="text-center mt-4 text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
