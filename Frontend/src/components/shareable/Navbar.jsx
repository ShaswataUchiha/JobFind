import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'sonner'
import { USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const user = false;
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logoutHandeler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(setUser(null));
        navigate("/");
        toast.success("Logout Success");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold text-gray-800">
              Job<span className="text-[#F83002]">Portal</span>
            </h1>
          </Link>
        </div>

        {/* Menu Items (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-8 text-gray-600">
            <li className="hover:text-[#F83002] cursor-pointer transition-colors duration-300">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-[#F83002] cursor-pointer transition-colors duration-300">
              <Link to="/jobs">Jobs</Link>
            </li>
            <li className="hover:text-[#F83002] cursor-pointer transition-colors duration-300">
              <Link to="/browse">Browse</Link>
            </li>
          </ul>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline" className="hover:bg-gray-100">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  className="bg-[#6A38C2] hover:bg-[#5930A3] text-white px-4 py-2 rounded-md transition-colors duration-300"
                  variant="primary"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-full"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="p-4 w-48 bg-white shadow-lg rounded-lg">
                <div className="flex items-center gap-3 border-b pb-3">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                      className="rounded-full"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-800">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-[#6A38C2] transition-colors duration-300">
                    <User2 className="w-5 h-5" />
                    <Button variant="link" className="text-sm">
                      <Link to="/profile"> View Profile</Link>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-red-500 transition-colors duration-300">
                    <LogOut className="w-5 h-5" />
                    <Button onClick={logoutHandeler} variant="link" className="text-sm">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-800 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col items-center gap-4 text-gray-600 py-4">
            <li className="hover:text-[#F83002] cursor-pointer transition-colors duration-300">
              Home
            </li>
            <li className="hover:text-[#F83002] cursor-pointer transition-colors duration-300">
              Jobs
            </li>
            <li className="hover:text-[#F83002] cursor-pointer transition-colors duration-300">
              Browse
            </li>
            {!user && (
              <div className="flex flex-col gap-2 mt-4">
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="w-full hover:bg-gray-100"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    className="bg-[#6A38C2] hover:bg-[#5930A3] text-white w-full rounded-md transition-colors duration-300"
                    variant="primary"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
