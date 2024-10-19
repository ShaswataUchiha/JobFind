import React, { useState } from "react";
import Navbar from "../shareable/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { RainbowButton } from "../ui/rainbow-button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/constant";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate()

  const changeEventhandeler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  
  const submitHandeler = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {'Content-Type' : "application/json"},
        withCredentials: true
      })

      if(res.data.success){
        navigate("/")
        toast(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <Navbar />
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-10">
        <form onSubmit={submitHandeler} className="w-full sm:w-3/4 lg:w-1/2 bg-white shadow-md rounded-xl p-6 sm:p-8 my-10 border-t-4 border-primary">
          <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
            Login to your Account
          </h1>
          <div className="space-y-4">
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
          </div>
          <RainbowButton
            type="submit"
            className="text-white w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 ease-in-out"
          >
            Login
          </RainbowButton>
          <p className="text-center mt-4 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
