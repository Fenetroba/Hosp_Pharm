import { BriefcaseMedical, LogOut, BellDot } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/useSlice";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { user } = useSelector((state) => state.Auth);


  const Logout = () => {
    dispatch(logoutUser()).then(navigate("/"));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[var(--six)] shadow-md flex items-center justify-around min-h-[65px] z-20">
      <div>
        <h1 className="sm:text-3xl font-bold">Share</h1>
      </div>
      <div className="header-title">
        <h1 className="text-black">
          <span className="flex gap-3.5 sm:text-3xl font-bold items-center">
            <BriefcaseMedical />
            Doctor Dashboard
          </span>
        </h1>
      </div>
      <div className="flex gap-2">
      <button className="text-2x1 bg-blue-950 rounded-full p-2 cursor-pointer hover:scale-110 transition-all duration-300 text-white flex items-center justify-center relative">
        <BellDot className="text-white" />
        <span className="text-white bg-red-600 rounded-full px-1.5 py-0.5 text-sm absolute -top-1 -right-1">
          0
        </span>
      </button>
    
      </div>
    </div>
  );
};

export default Header;
