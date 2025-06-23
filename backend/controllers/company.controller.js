import { Company } from "../models/company.model.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company name is taken",
                success: false
            });
        }

        company = await Company.create({
            name: companyName,
            userId: req.id  // Assuming `req.user.id` is set
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        });

    } catch (error) {
        console.error(error);  // Log the error for debugging
        return res.status(500).json({
            message: "Error while registering company",
            success: false
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;  // Ensure req.id is correctly set and validated
        if (!userId) {
            return res.status(400).json({
                message: "User ID is missing",
                success: false
            });
        }

        const companies = await Company.find({ userId });

        if (companies.length === 0) {
            return res.status(404).json({
                message: "No companies found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Companies found",
            companies,
            success: true
        });

    } catch (error) {
        console.error('Error fetching companies:', error);  // Log the error for debugging
        return res.status(500).json({
            message: "Error while fetching companies",
            success: false
        });
    }
};


export const getCompanybyId = async (req, res) => {
    try {
        const companyId = req.params.id;

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });

    } catch (error) {
        console.error(error);  // Log the error for debugging
        return res.status(500).json({
            message: "Error while fetching company",
            success: false
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;  // For file uploads, you might want to handle this accordingly

        // Cloudinary integration (or other file storage service) would go here
        const fileUri= getDataUri(file);
        const cloudResponse= await cloudinary.uploader.upload(fileUri.content);
        const logo= cloudResponse.secure_url;

        const updateData = { name, description, website, location,logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated",
            success: true,
            company
        });

    } catch (error) {
        console.error(error);  // Log the error for debugging
        return res.status(500).json({
            message: "Error while updating company",
            success: false
        });
    }
};
