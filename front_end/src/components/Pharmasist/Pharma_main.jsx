import React from "react";
import { useSelector } from "react-redux";
import FrontSide from "./FrontSide";
import NotificationPharma from "./NotificationPharma";
import { Mail, User2Icon } from "lucide-react";
import Daily_report from "./Daily_report";

const Pharma_main = () => {
  const { user } = useSelector((state) => state.Auth);
  return (
    <div className="p-4 mt-20">
      {/* Profile Header */}
      <div className="header-profile bg-[var(--fiveP)] p-4 mb-4 rounded-lg shadow-sm">
        <p className="flex items-center justify-center space-x-2">
          <span className="text-2xl text-blue-950">
            <User2Icon />
          </span>
          <span className="text-lg font-semibold">{user?.username || user?.name}</span>
        </p>
        <div className="mt-2 flex items-center justify-center space-x-2">
          <Mail className="w-5 h-5" />
          <span>{user?.useremail || user?.email}</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Notifications Sidebar */}
        <div className="lg:col-span-1 ml-10 bg-[var(--oneP)] rounded-lg shadow-sm h-[calc(100vh-250px)] overflow-y-auto">
          <NotificationPharma />
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-4 space-y-4">
          {/* Front Side Section */}
          <div className="bg-[var(--oneP)] rounded-lg shadow-sm min-h-[400px]">
            <FrontSide />
          </div>

          {/* Daily Report Section */}
          <div className="bg-[var(--oneP)] rounded-lg shadow-sm min-h-[400px]">
            <Daily_report />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pharma_main;
