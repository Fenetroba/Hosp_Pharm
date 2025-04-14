import React, { useEffect, useState } from "react";
import "./login.css"; // Import your CSS file
import { useDispatch, useSelector } from "react-redux";
import { CheckAuths, loginUser } from "../store/useSlice.js"; // Import your action
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onClose }) => {
  const { error, isAuthenticated } = useSelector((state) => state.Auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    try {
      const result = await dispatch(loginUser(loginData)).unwrap();
      if (result.user) {
        toast.success("Login successful");
        onClose(); // Close the modal on successful login
        // Redirect based on user role
        const redirectPath = {
          doctor: "/doctorDash_board",
          Pharma: "/pharmaDash_board",
          Admin: "/AdminDash_board"
        }[result.user.role] || "/";
        navigate(redirectPath);
      }
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  };


  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <ToastContainer />
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;