import React, { useState } from "react";
import "./login.css"; // Import your CSS file
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/useSlice.js"; // Import your action
import { useNavigate } from "react-router-dom";
import Loading from "@/components/ui/loading/Loading";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const LoginModal = ({ isOpen, onClose }) => {
  const { loading } = useSelector((state) => state.Auth);
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
      // Dispatch the login action and wait for the result
      const resultAction = await dispatch(loginUser(loginData));

      // Check if the action was fulfilled
      if (loginUser.fulfilled.match(resultAction)) {
        const { user } = resultAction.payload; // Assuming user is in the payload
        toast.success("Login successful"); // Ensure this is a string

        onClose(); // Close the modal on successful login

        // Redirect based on user role
        const redirectPath = {
          doctor: "/doctorDash_board",
          Pharma: "/pharmaDash_board",
          Admin: "/AdminDash_board",
        }[user?.role] || "/";
        navigate(redirectPath);
      } else {
        // Show an error toast if login was unsuccessful
        toast.error("Please try again"); // Ensure this is a string
      }
    } catch (error) {
      // Enhanced error handling
      const errorMessage = error.response?.data?.message || error.message || "Login failed. Please try again.";
      toast.error(errorMessage); // Ensure this is a string
    }
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <Toaster />
      <div className="modal-content  text-white p-8   border-2 rounded-2xl" onClick={(e) => e.stopPropagation()}>
        <h1 className="text-white font-bold text-3xl text-center mb-12">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              className="bg-white text-black"
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
              className="bg-white mb-10 text-black"
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
          <button type="submit" className="submit h-8 flex items-center justify-center">
            {loading ? <Loading /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;