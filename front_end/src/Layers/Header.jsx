import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Style/header.css';
import LoginModal from '../Auth/LoginPage'; // Import the LoginModal component

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const LoginHandler = () => {
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-white shadow-md z-50 flex justify-between flex-col items-center">
    
                <div className="flex justify-between items-center w-full">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="/" className="text-2xl font-bold text-blue-950">
                            Hospi<span className="text-blue-600">Pharma</span>
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-md text-gray-100 hover:text-blue-600 focus:outline-none"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <ul className="flex space-x-8 ">
                            <li>
                                <a href="/Testimony" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Testimony
                                </a>
                            </li>
                            <li>
                                <a href="/Service" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Service
                                </a>
                            </li>
                            <li>
                                <a href="/home" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* Login Button */}
                    <div className="hidden md:block">
                        <button
                            onClick={LoginHandler}
                            className="bg-white text-black px-10 cursor-pointer font-bold text-[16px] py-2 rounded-md hover:bg-blue-100 transition-colors"
                        >
                            Login
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="/Testimony"
                                        className="block px-3 py-2 text-gray-100 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                                    >
                                        Testimony
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/Service"
                                        className="block px-3 py-2 text-gray-100 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                                    >
                                        Service
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/home"
                                        className="block px-3 py-2 text-gray-100 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/about"
                                        className="block px-3 py-2 text-gray-100 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                                    >
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/contact"
                                        className="block px-3 py-2 text-gray-100 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                            <div className="pt-4 pb-3 border-t border-gray-200">
                                <button
                                    onClick={LoginHandler}
                                    className="w-full bg-blue-50 text-black px-4 py-2 rounded-md hover:bg-blue-900 transition-colors"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            
            <LoginModal isOpen={isModalOpen} onClose={closeModal} /> {/* Include the LoginModal */}
        </header>
    );
};

export default Header;