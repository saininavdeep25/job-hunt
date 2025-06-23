import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        const file = req.file;

        // Check if all required fields are present
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All details are needed",
                success: false
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare the user profile data
        let profilePhotoUrl = null;
        if (file) {
            // Convert file to data URI and upload to Cloudinary
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhotoUrl = cloudResponse.secure_url;
        }

        // Create a new user
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: { profilePhoto: profilePhotoUrl }
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        return res.status(500).json({
            message: "Error while registering",
            success: false
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All details are needed",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                success: false
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                message: "Incorrect Password",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Role not correct",
                success: false
            });
        }

        const tokenData = {
            userId: user._id,
        }

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            },
            success: true
        });

    } catch (error) {
        console.error(error);  // Log the error for debugging
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

export const logout = async (req, res) => {
    try {
        // Clear the token cookie by setting it to expire immediately
        return res.status(200).cookie("token", "", { 
            maxAge: 0, // Expire the cookie immediately
            httpOnly: true, // Ensure cookie is not accessible via JavaScript
            sameSite: 'strict' // Prevent cookie from being sent with cross-site requests
        }).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        return res.status(500).json({
            message:"Cant log out",
            success: false
        });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.id;  // Ensure req.id is correctly set
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        const file = req.file;

        // Validate that file exists if it's required for the operation
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

            // Check if Cloudinary response contains necessary data
            if (cloudResponse && cloudResponse.secure_url) {
                // Add uploaded file details to user profile
                user.profile.resume = cloudResponse.secure_url;
                user.profile.resumeOriginalName = file.originalname;
            }
        }

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",").map(skill => skill.trim()); // Trim and split skills
        }

        

        // Update user fields if provided
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skillsArray) user.profile.skills = skillsArray;

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            }
        });

    }
        catch (error) {
            console.error(error);  // Log the complete error for debugging
            return res.status(500).json({
                message: error.message,  // Include the error message in the response
                success: false
            });
        }
        
    
};