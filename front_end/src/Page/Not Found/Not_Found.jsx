// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import folde from '../../assets/folder.png'
import './notFound.css'; // Optional: Import CSS for styling

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <img src={folde} alt="folde" style={{width:'400px', height:'400px'}} />
      <Link to="/">Go Back to Home</Link>
    </div>
  );
};

export default NotFound;
