import React, { useState } from 'react'
import { Logs } from "lucide-react";
const Sider = () => {
  const [toggle,setoggle]=useState(false)
  return (
    <div className={`fixed flex flex-col items-center top-[36px] justify-center h-screen bg-[#031021] shadow-md  ${toggle ? "w-[190px] absolute" : "w-10.5"} transition-all duration-300`}>
<div className="absolute top-0.5 right-3 cursor-pointer text-white hover:text-gray-300 z-50" onClick={()=>setoggle(!toggle)}>
        <Logs />
      </div>
    </div>
  )
}

export default Sider