import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { User, Menu, X, Bell, Search } from 'lucide-react';

const AdminHeader = ({ title, onMenuClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.Auth);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (onMenuClick) {
      onMenuClick(!isMobileMenuOpen);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#031021] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section - Menu and Title */}
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
            <div className="hidden lg:flex lg:items-center lg:ml-6">
              <h1 className="text-xl font-semibold">{title}</h1>
            </div>
          </div>

          {/* Center section - Search (Desktop only) */}
          <div className="hidden lg:flex lg:items-center lg:flex-1 lg:justify-center lg:max-w-2xl">
            <div className="relative w-full max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-blue-900 text-white placeholder-gray-400 focus:outline-none focus:bg-blue-800 focus:border-blue-700 sm:text-sm"
              />
            </div>
          </div>

          {/* Right section - User info and notifications */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 rounded-full text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>

            {/* User profile */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <User className="h-8 w-8 text-white" />
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
                <p className="text-xs text-gray-300">{user?.role || 'Administrator'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 z-40">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75" onClick={toggleMobileMenu}></div>
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#031021] shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-3 border-b border-blue-900">
                <h2 className="text-lg font-medium">{title}</h2>
                <button
                  onClick={toggleMobileMenu}
                  className="text-white hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 px-4 py-6">
                {/* Mobile search */}
                <div className="mb-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-blue-900 text-white placeholder-gray-400 focus:outline-none focus:bg-blue-800 focus:border-blue-700 sm:text-sm"
                    />
                  </div>
                </div>
                {/* Mobile user info */}
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
                    <p className="text-xs text-gray-300">{user?.role || 'Administrator'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader; 