import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,  // Changed to String for better handling of different formats
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Student", "Recruiter"],
        required: true
    },
    profile: {
        bio: { type: String },
        skills: [String],  // Simplified syntax
        resume: { type: String },
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
        profilephoto: { type: String, default: "" }
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
