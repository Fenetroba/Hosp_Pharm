import React, { useEffect, useState } from 'react';
import './Style/bottomNav.css'; // Import your CSS file
import { RiContactsFill, RiHome2Line, RiInfoCardFill, RiServiceFill } from 'react-icons/ri';
const BottomNav = () => {
    const [isHidden, setIsHidden] = useState(false);
    let lastScrollTop = 0;

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop < lastScrollTop) {
            setIsHidden(true); // Scrolling down
        } else {
            setIsHidden(false); // Scrolling up
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`bottom-nav ${isHidden ? 'hidden' : ''}`}>
            <ul>
                <li><a href="#home"><RiHome2Line/></a></li>
                <li><a href="#service"><RiServiceFill/></a></li>
                <li><a href="#about"><RiInfoCardFill/></a></li>
                <li><a href="#contact"><RiContactsFill/></a></li>
            </ul>
        </nav>
    );
};

export default BottomNav;