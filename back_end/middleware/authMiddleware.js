import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.access_Token;

        // Check if token exists
        if (!token) {
            return res.status(401).json({ 
                message: "Authentication required. Please log in." 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        // Fetch user from database to ensure we have the latest data
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(401).json({ 
                message: "User not found. Please log in again." 
            });
        }

        // Attach user information to request
        req.user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        // Proceed to next middleware
        next();
    } catch (error) {
        // Handle different types of JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: "Session expired. Please log in again." 
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                message: "Invalid token. Please log in again." 
            });
        }

        // Handle other errors
        console.error('Authentication error:', error);
        return res.status(500).json({ 
            message: "Internal server error during authentication." 
        });
    }
};

export default authMiddleware;