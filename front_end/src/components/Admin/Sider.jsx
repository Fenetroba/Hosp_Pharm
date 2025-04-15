import React, { useState } from "react";
import { Logs, LayoutDashboard, User, Cog, Bug } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sider = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.Auth);

  const handleNavigation = (path) => {
    navigate(`/AdminDash_board/${path}`);
  };

  const navigationItems = [
    {
      path: '/',
      label: 'Dashboard',
      icon: <LayoutDashboard />,
      roles: ['Admin', 'Pharma', 'doctor']
    },
    {
      path: 'users',
      label: 'Users',
      icon: <User />,
      roles: ['Admin']
    },
    {
      path: 'settings',
      label: 'Settings',
      icon: <Cog />,
      roles: ['Admin', 'Pharma']
    },
    {
      path: 'reports',
      label: 'Reports',
      icon: <Bug />,
      roles: ['Admin', 'Pharma', 'doctor']
    }
  ];

  // Filter navigation items based on user role
  const filteredNavigationItems = navigationItems.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <div
      className={`fixed flex flex-col items-center top-[66px] justify-center h-screen bg-[#031021] shadow-md ${
        toggle ? "w-[190px] absolute" : "w-10.5"
      } transition-all duration-300`}
    >
      <div
        className="absolute top-0.5 right-3 cursor-pointer text-white hover:text-gray-300 z-50"
        onClick={() => setToggle(!toggle)}
      >
        <Logs />
      </div>
      <ul className={`flex flex-col gap-2 items-center justify-center h-[100px] text-white mt-[10px]`}>
        {filteredNavigationItems.map((item) => (
          <li 
            key={item.path}
            className="font-bold cursor-pointer hover:text-gray-300 flex items-center gap-2"
            onClick={() => handleNavigation(item.path)}
          >
            {toggle ? item.label : item.icon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sider;