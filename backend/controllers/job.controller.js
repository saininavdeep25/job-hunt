import { Job } from "../models/job.model.js";

// Ensure 'experience' field exists in your Job schema
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, experienceLevel, location, jobType, position, companyId } = req.body;
        const userId = req.id;  // Assuming `req.user.id` is set

        if (!title || !description || !requirements || !salary || !experienceLevel || !location || !jobType || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const reqarray= requirements.split(",");
        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(','),
            salary: Number(salary),
            experienceLevel: Number(experienceLevel),
            location,
            jobType,
            position,
            company: companyId,
            createdBy: userId
        });

        return res.status(201).json({
            message: "Job created successfully",
            success: true,
            job
        });

    } catch (error) {
        console.error(error);  // Log the error for debugging
        return res.status(500).json({
            message: "Error while creating job",
            success: false
        });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || " ";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.error(error);  // Log the error for debugging
        return res.status(500).json({
            message: "Error during fetching jobs",
            success: false
        });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        console.error(error);  // Log the error for debugging
        return res.status(500).json({
            message: "Error while fetching job",
            success: false
        });
    }
};

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;  // Assuming `req.user.id` is set
        const jobs = await Job.find({ createdBy: adminId }).populate({
            path:'company'
        });

        if (jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.error(error);  // Log the error for debugging
        return res.status(500).json({
            message: "Error while fetching jobs",
            success: false
        });
    }
};
