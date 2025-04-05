import React, { useState } from "react";
import { Logs,LayoutDashboard,User ,Cog ,Bug } from "lucide-react";
const Sider = () => {
  const [toggle,setoggle]=useState(false)
  return (
    <div className={`fixed top-[55px] bg-[var(--adnimO)] h-[92vh] ${toggle ? "w-[190px] absolute" : "w-10.5"} transition-all duration-300`}>
      <div className="absolute top-0.5 right-3 cursor-pointer text-white hover:text-gray-300 z-50" onClick={()=>setoggle(!toggle)}>
        <Logs />
      </div>
      <ul className={`flex flex-col gap-2 items-center justify-center h-64  text-white mt-[300px] `}>
        <li className=" font-bold cursor-pointer hover:t">{toggle?"Dashboard":<LayoutDashboard />} </li>
        <li className="font-bold cursor-pointer hover:t"> {toggle?"Users":<User/>}</li>
        <li className=" font-bold cursor-pointer hover:t">{toggle?"Settings":<Cog/>}</li>
        <li className="font-bold cursor-pointer hover:t">{toggle?"Reports":<Bug/>}</li>
        </ul>
    </div>
  );
};

export default Sider;
