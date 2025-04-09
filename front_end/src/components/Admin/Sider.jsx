import React, { useState } from "react";
import { Logs, LayoutDashboard, User, Cog, Bug } from "lucide-react";

const Sider = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  // Navigation items configuration
  const navItems = [
    { id: "dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
    { id: "users", icon: <User />, label: "Users" },
    { id: "settings", icon: <Cog />, label: "Settings" },
    { id: "reports", icon: <Bug />, label: "Reports" },
  ];

  const handleNavigation = (itemId) => {
    setActiveItem(itemId);
    // Add your navigation logic here
  };

  return (
    <div
      className={`fixed top-[55px] bg-[var(--adnimO)] h-[calc(100vh-55px)] ${
        isExpanded ? "w-48" : "w-16"
      } transition-all duration-300 z-40 shadow-xl`}
    >
      <button
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-6 -right-3 p-1.5 bg-indigo-100 rounded-full text-black hover:bg-[var(--adnimO)] hover:text-white cursor-pointer transition-colors shadow-md"
      >
        <Logs className="w-5 h-5" />
      </button>

      <nav className="mt-[100px]">
        <ul className="flex flex-col gap-2 px-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg  cursor-pointer
                  ${
                    activeItem === item.id
                      ? "bg-[var(--adnim1)] text-white"
                      : "text-indigo-100 hover:bg-indigo-900"
                  }
                  transition-colors duration-200`}
                aria-current={activeItem === item.id ? "page" : undefined}
              >
                <span className="shrink-0">{item.icon}</span>
                {isExpanded && (
                  <span className="text-sm font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sider;