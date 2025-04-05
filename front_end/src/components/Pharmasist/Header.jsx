// PharmacistHeaded.js
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './style/header.css';

const PharmacistHeaded = () => {
  const [showOptions, setShowOptions] = useState(false); // State to show/hide pharmacist options

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="pharmacist-header">
      <h3 onClick={toggleOptions} className="header-title">
        Pharmacist {showOptions ? <FaChevronUp /> : <FaChevronDown />}
      
      </h3>
      {showOptions && (
        <ul className="options-list">
          <li>Docter Prescription</li>
          <li>View Pharmacists</li>
          <li><button>Log Out</button></li>
        </ul>
      )}
    </div>
  );
};

export default PharmacistHeaded;