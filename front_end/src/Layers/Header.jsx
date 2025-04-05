import React, { useState } from 'react';
import './Style/header.css';
import LoginModal from '../Auth/LoginPage'; // Import the LoginModal component

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const LoginHandler = () => {
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    return (
        <header>
            <div className="logo">
                <a href="/">Hospi<span>Pharma</span></a>
            </div>
            <nav>
                <ul>
                    <li><a href="/Testimony">Testimony</a></li>
                    <li><a href="/Service">Service</a></li>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
            <div className="Login">
                <button className='Login' onClick={LoginHandler}>Login</button>
            </div>
            <LoginModal isOpen={isModalOpen} onClose={closeModal} /> {/* Include the LoginModal */}
        </header>
    );
};

export default Header;