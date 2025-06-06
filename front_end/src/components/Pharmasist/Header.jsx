import React from "react";
import { LogOut, Pill } from "lucide-react";
import { logoutUser } from "@/store/useSlice";
import { useDispatch } from "react-redux";
import ParmacyLogo from '../../assets/PharmacyLogo.jpg'
const Header = () => {
  const dispatch=useDispatch()
  const Logout=()=>{
    dispatch(logoutUser()).then(
      navigate('/')
    )
   }
  return (
    <div className="fixed top-0 left-0 w-full bg-[var(--sixP)] shadow-md flex items-center justify-around min-h-[65px] z-20">
      
        <img src={ParmacyLogo} alt="ParmacyLogo" className="w-[60px]"/>
   
      <div className="header-title">
        <h1 className="text-black">
          {" "}
          <span className="flex gap-3.5 text-3xl font-bold items-center">
            {" "}
            <span className="text-[var(--fiveP)] w-3.5"> 
              <Pill />
            </span>
            <span className="sm:text-3xl max-sm:text-[14px]">Pharmacyst Dashboard</span>
          </span>
        </h1>
      </div>
      <div className="header-profile">
      <button onClick={Logout} className="px-8 py-1 rounded-2xl bg-amber-300 flex space-x-2.5 cursor-pointer"><span>Logout</span> <LogOut/></button>

      </div>
    </div>
  );
};

export default Header;
