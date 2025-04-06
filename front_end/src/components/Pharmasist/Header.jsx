import React from "react";
import { Pill } from "lucide-react";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-[var(--sixP)] shadow-md flex items-center justify-around min-h-[65px] z-20">
      <div>
        <h1 className="text-3xl font-bold">Share</h1>
      </div>
      <div className="header-title">
        <h1 className="text-black">
          {" "}
          <span className="flex gap-3.5 text-3xl font-bold items-center">
            {" "}
            <span className="text-[var(--fiveP)] w-3.5"> 
              <Pill />
            </span>
            <span>Pharmacyst Dashboard</span>
          </span>
        </h1>
      </div>
      <div className="header-profile">
        <img src="/images/profile.jpg" alt="Profile" />
      </div>
    </div>
  );
};

export default Header;
