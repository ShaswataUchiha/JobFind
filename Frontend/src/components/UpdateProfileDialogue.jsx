import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { setLoading, setUser } from "@/redux/authSlice";

const UpdateProfileDialogue = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phonenumber: user?.phonenumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || "",
  });

  const changeEventhandeler = (e) => {
    setInput({...input, [e.target.name] : [e.target.value]})
  } 

  const changeFileHandeler = (e) => {
    setInput({...input, file : e.target.files?.[0]})
  }

  const submitHandeler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phonenumber", input.phonenumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true)
      const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
        headers : {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials : true
      });

      if(res.status === 200 || res.status === 201){
        console.log("Enter in function")
        const userData = res.data.message.user;
        dispatch(setUser(userData));
        toast.success("User updated successfully");
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
    finally{
      setLoading(false)
    }
    setOpen(false);
    console.log(input)
  }

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-md p-8 bg-white rounded-full shadow-lg transition-all duration-300 ease-in-out"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800 mb-4">
              Update Your Profile
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-6" onSubmit={submitHandeler}>
            <div className="grid gap-4">
              {/* Name Field */}
              <div className="flex flex-col">
                <Label
                  htmlFor="name"
                  className="font-medium text-gray-700 mb-1"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={input.fullname}
                  onChange={changeEventhandeler}
                  type="text"
                  placeholder="Enter your name"
                  className="rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 ease-in-out p-3"
                />
              </div>
              {/* Email Field */}
              <div className="flex flex-col">
                <Label
                  htmlFor="email"
                  className="font-medium text-gray-700 mb-1"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventhandeler}
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 ease-in-out p-3"
                />
              </div>
              {/* Phone Number Field */}
              <div className="flex flex-col">
                <Label
                  htmlFor="number"
                  className="font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </Label>
                <Input
                  id="number"
                  name="number"
                  value={input.phonenumber}
                  onChange={changeEventhandeler}
                  type="number"
                  placeholder="Enter your phone number"
                  className="rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 ease-in-out p-3"
                />
              </div>
              {/* Bio Field */}
              <div className="flex flex-col">
                <Label htmlFor="bio" className="font-medium text-gray-700 mb-1">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventhandeler}
                  type="text"
                  placeholder="Write a short bio"
                  className="rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 ease-in-out p-3"
                />
              </div>
              {/* Skills Field */}
              <div className="flex flex-col">
                <Label
                  htmlFor="skills"
                  className="font-medium text-gray-700 mb-1"
                >
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventhandeler}
                  type="text"
                  placeholder="List your skills (comma-separated)"
                  className="rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 ease-in-out p-3"
                />
              </div>
              {/* Resume Upload Field */}
              <div className="flex flex-col">
                <Label
                  htmlFor="resume"
                  className="font-medium text-gray-700 mb-1"
                >
                  Resume
                </Label>
                <Input
                  id="resume"
                  name="resume"
                  onChange={changeFileHandeler}
                  type="file"
                  className="file:mr-4 file:py-2 file:px-6 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition duration-200 ease-in-out"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button
                  className="w-full py-3 mt-4 bg-gray-300 text-gray-700 rounded-lg flex items-center justify-center"
                  variant="outline"
                  disabled
                >
                  <Loader2 className="animate-spin mr-2" />
                  Please Wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out shadow-md transform hover:scale-105"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialogue;
