import { BriefcaseMedical } from "lucide-react";
import React from "react";
const Header = () => {
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
      <div className="header-profile">
        <img src="/images/profile.jpg" alt="Profile" />
      </div>
    </div>
  );
};

export default Header;
