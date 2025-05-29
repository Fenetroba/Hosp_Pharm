import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { User, Menu, X } from 'lucide-react';

const Header = ({ title, onMenuClick }) => {
  const { user } = useSelector((state) => state.Auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (onMenuClick) {
      onMenuClick(!isMobileMenuOpen);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
            <div className="hidden lg:flex lg:items-center lg:ml-6">
              <h1 className="text-xl font-semibold text-gray-100">{title}</h1>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
             
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 z-40">
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleMobileMenu}></div>
              <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">{title}</h2>
                    <button
                      onClick={toggleMobileMenu}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="flex-1 px-4 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <User className="h-10 w-10 text-gray-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {user?.name || 'Admin'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user?.role || 'Administrator'}
                        </p>
                      </div>
                    </div>
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

export default Header; 