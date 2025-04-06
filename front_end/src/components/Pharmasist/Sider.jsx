import React, { useState } from "react";
import { Logs,LayoutDashboard,User ,Cog ,Bug } from "lucide-react";
const Sider = () => {
  const [toggle, setoggle] = useState(false);
  return (
    <div
      className={`fixed flex flex-col items-center top-[66px] justify-center h-screen bg-[#041e06] shadow-md  ${
        toggle ? "w-[190px] absolute" : "w-10.5"
      } transition-all duration-300`}
    >
      <div
        className="absolute top-0.5 right-3 cursor-pointer text-white hover:text-gray-300 z-50"
        onClick={() => setoggle(!toggle)}
      >
        <Logs />
      </div>
      <ul className={`flex flex-col gap-2 items-center justify-center h-[100px]  text-white mt-[300px] `}>
        <li className=" font-bold cursor-pointer hover:text-[var(--fiveP)]">{toggle?"Dashboard":<LayoutDashboard />} </li>
        <li className="font-bold cursor-pointer hover:text-[var(--fiveP)]"> {toggle?"Users":<User/>}</li>
        <li className=" font-bold cursor-pointer hover:text-[var(--fiveP)]">{toggle?"Settings":<Cog/>}</li>
        <li className="font-bold cursor-pointer hover:text-[var(--fiveP)]">{toggle?"Reports":<Bug/>}</li>
        </ul>


    </div>
  );
};

export default Sider;
