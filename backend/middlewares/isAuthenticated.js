import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token; // Ensure you have the cookie-parser middleware setup

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Verify the token
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid or expired token",
                    success: false,
                });
            }

            // Attach user ID to request object
            req.id = decoded.userId;
            next();
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

export default isAuthenticated;
