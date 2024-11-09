import React, { useState } from "react";
import Navbar from "../shareable/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_APT_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";

const CompaniesCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState()

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_APT_ENDPOINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if(res.statusCode === 201){
        toast.success(res.message)
        const companyId = res?.data?.company?._id
        navigate(`/admin/company/${companyId}`)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-3xl mt-10">
        <div className="mb-8">
          <h1 className="font-bold text-2xl text-gray-800">
            Your Company Name
          </h1>
          <p className="text-gray-500 mt-1">
            What would you like to name your company? You can change it later.
          </p>
        </div>

        <Label className="text-gray-700 font-semibold">Company Name</Label>
        <Input
          onChange={(e) => setCompanyName(e.target.value)}
          type="text"
          placeholder="Enter your company name"
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all duration-200"
        />

        <div className="flex justify-end items-center gap-3 mt-8">
          <Button
            className="px-5 py-2 font-semibold bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-all duration-150"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button
            className="px-5 py-2 font-semibold bg-purple-700 text-white rounded-xl hover:bg-purple-800 transition-all duration-150 shadow-md transform hover:scale-105"
            onClink={registerNewCompany}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompaniesCreate;
