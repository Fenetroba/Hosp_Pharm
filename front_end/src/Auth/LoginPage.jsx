import React, { useEffect, useState } from "react";
import "./login.css"; // Import your CSS file
import { useDispatch } from "react-redux";
import { CheckAuths, loginUser } from "../store/useSlice.js"; // Import your action

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
 
  // Handle form submission
  const handleSubmit = () => {
    // Dispatch the login action with the loginData
    dispatch(loginUser(loginData))
        console.log("Login successful");
        onClose(); // Close the modal on successful login
   
      }
    // Handle errors here if needed
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>
        
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              id="email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              id="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
      
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;