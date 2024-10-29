import React, { useState } from "react";
import Navbar from "./shareable/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsTable from "./AppliedJobsTable";
import UpdateProfileDialogue from "./updateProfileDialogue";
import { useSelector } from "react-redux";
import store from "@/redux/store";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-[#f5f3ff]">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-lg rounded-3xl my-8 p-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-6 mb-6 md:mb-0">
            <Avatar className="w-24 h-24 shadow-md rounded-full overflow-hidden border-2 border-[#6a38c2]">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div className="flex flex-col">
              <h1 className="font-semibold text-2xl text-[#6a38c2]">
                {user?.fullname || "Username"}
              </h1>
              <p className="text-gray-600 mt-1">
                {user?.profile?.bio || "No bio available"}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 border-[#6a38c2] text-[#6a38c2] hover:bg-[#e9d5ff] transition duration-150"
          >
            <Pen className="w-4 h-4" /> Edit Profile
          </Button>
        </div>

        <div className="my-6 border-t border-gray-200 pt-6">
          <h2 className="font-medium text-lg text-[#6a38c2] mb-3">
            Contact Information
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="w-5 h-5 text-[#7209b7]" />
              <span>{user?.email || "Not provided"}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Contact className="w-5 h-5 text-[#7209b7]" />
              <span>{user?.phonenumber || "Not provided"}</span>
            </div>
          </div>
        </div>

        <div className="my-6 border-t border-gray-200 pt-6">
          <h2 className="font-medium text-lg text-[#6a38c2] mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-[#7209b7] bg-[#e9d5ff] text-[#6a38c2] px-3 py-1 rounded-full"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">No skills available</span>
            )}
          </div>
        </div>

        <div className="my-6 border-t border-gray-200 pt-6">
          <Label className="text-lg font-medium text-[#6a38c2]">Resume</Label>
          {user?.profile?.resume ? (
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6a38c2] hover:underline mt-2 block"
            >
              View Resume
            </a>
          ) : (
            <span className="text-gray-500">Not uploaded</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-200 my-8 p-8">
        <h1 className="font-bold text-lg text-[#7209b7] mb-5">Applied Jobs</h1>
        <AppliedJobsTable />
      </div>
      <UpdateProfileDialogue open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
