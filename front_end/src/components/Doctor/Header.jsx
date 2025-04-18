import { BriefcaseMedical, LogOut } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/useSlice";
import {  useNavigate } from "react-router-dom";
const Header = () => {
  const {user}=useSelector(state=>state.Auth)
 const dispatch=useDispatch()
 const navigate = useNavigate();

 const Logout=()=>{
  dispatch(logoutUser()).then(
    navigate('/')
  )
 }

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
      <button onClick={Logout} className="px-8 py-1 rounded-2xl bg-amber-300 flex space-x-2.5 cursor-pointer"><span>Logout</span> <LogOut/></button>
    </div>
  );
};

export default Header;
