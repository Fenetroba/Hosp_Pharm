import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Token configuration
const TOKEN_CONFIG = {
  access: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: "15m"
  },
  refresh: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    expiresIn: "7d"
  }
};

// Generate JWT tokens
const generateToken = (userId, username, useremail,userrole) => {
  return {
    accessToken: jwt.sign(
      { userId, username, useremail,userrole },
      TOKEN_CONFIG.access.secret,
      { expiresIn: TOKEN_CONFIG.access.expiresIn }
    ),
    refreshToken: jwt.sign(
      { userId, username, useremail,userrole },
      TOKEN_CONFIG.refresh.secret,
      { expiresIn: TOKEN_CONFIG.refresh.expiresIn }
    )
  };
};

// Set secure cookies
const setCookies = (res, accessToken, refreshToken) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 15 * 60 * 1000 // 15 minutes
  };

  res.cookie("access_Token", accessToken, cookieOptions);
  res.cookie("refresh_Token", refreshToken, { 
    ...cookieOptions, 
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

// Login controller
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({success:false, message: "Email and password are required" });
    }

    // Find user and validate password
    const user = await User.findOne({ email });

    if(!user){
      return res.status(404).json({success:false,message:"the user is not found"})
    }
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({success:false, message: "Invalid credentials" });
    }

    // Generate tokens and set cookies
    const { accessToken, refreshToken } = generateToken(user._id, user.name, user.email, user.role);
    setCookies(res, accessToken, refreshToken);

    // Return success response without sensitive data
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({success:false, message: "Server error" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    const decoded = jwt.verify(refreshToken, TOKEN_CONFIG.refresh.secret);
    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken(
      user._id,
      user.name,
      user.email,
      user.role
    );
    setCookies(res, accessToken, newRefreshToken);
    
    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("access_Token");
    res.clearCookie("refresh_Token");
    res.status(200).json({ message: "Logged out successfully55555555555" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};