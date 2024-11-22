import React, { useState } from "react";
import Navbar from "../shareable/Navbar";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_APT_ENDPOINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CompanySetup = () => {
  const params = useParams();
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const {singleCompany} = useSelector(store => store.company)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandeler = async (e) => {
    e.preventDefault();
    // console.log(input);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_APT_ENDPOINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.statusCode === 200) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg">
        <form onSubmit={submitHandeler}>
          {/* Back Button */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-600 hover:bg-gray-100"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="text-xl font-semibold">Set up your company</h1>
          </div>

          {/* Form Inputs in Vertical Layout */}
          <div className="space-y-6">
            {/* Company Name */}
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                placeholder="Enter your company name"
                onChange={changeEventHandler}
                className="mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                placeholder="Enter a brief description"
                onChange={changeEventHandler}
                className="mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Website */}
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                placeholder="Enter your company website"
                onChange={changeEventHandler}
                className="mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Location */}
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                placeholder="Enter your company location"
                onChange={changeEventHandler}
                className="mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Logo Upload */}
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-8">
            {loading ? (
              <Button className="w-full my-4 flex items-center justify-center bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-600 active:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full my-4 bg-[#7209b7] text-white rounded-lg p-3 hover:bg-[#6a38c2] active:bg-[#5f32ad] transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#e9d5ff]"
              >
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
