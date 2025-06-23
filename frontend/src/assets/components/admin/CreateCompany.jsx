import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import Label from '../ui/Label';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is imported
import { COMPANY_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../redux/companySlice';

const CreateCompany = () => {
    const navigate = useNavigate();
    const dispatch= useDispatch();
    const [companyName, setCompanyName] = useState('');

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id; // Corrected company ID access
                navigate(`/admin/companies/${companyId}`);
                
            } else {
                toast.error(res.data.message || "Something went wrong.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error creating company");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto">
                <div className="my-10 gap-y-3">
                    <h1 className="font-bold text-2xl">Your Company name</h1>
                    <p className="text-gray-500">
                        What would you like to give your company name? You can change this later.
                    </p>

                    <Label htmlFor="cname">Company Name</Label>
                    <input
                        id="cname"
                        onChange={(e) => setCompanyName(e.target.value)}
                        type="text"
                        className="my-2 p-4 h-10 w-full border rounded-md bg-slate-100"
                        placeholder="JobHunt, Google, etc."
                    />

                    <div className="flex items-center gap-2 my-10">
                        <Button onClick={() => navigate("/admin/companies")} variant="outlined">
                            Cancel
                        </Button>
                        <Button onClick={registerNewCompany} variant="contained">
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCompany;
