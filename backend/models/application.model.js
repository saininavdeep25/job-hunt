import mongoose from "mongoose";
import { User } from "./user.model.js";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Changed ref to 'User' instead of 'Applicants'
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],  // Fixed typo in 'Rejected'
        default: 'Pending'
    },
}, { timestamps: true });

export const Application = mongoose.model("Application", applicationSchema);
