import express from 'express';
import jwt from 'jsonwebtoken'; // Make sure to import jwt
import env from 'dotenv';

env.config();

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.access_Token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        // Verify the token and decode the user
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded; // Attach the user information to the request
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(403).json({ message: "Forbidden" });
    }
};

export default authMiddleware;