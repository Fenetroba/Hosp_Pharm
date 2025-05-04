import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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
        
        // Attach user information to request
        req.user = {
            userIds: decoded.userId,
            username: decoded.username,
            useremail: decoded.useremail,
            userrole: decoded.userrole,
            date:decoded.date
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