import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '@mui/material';
import { ArrowLeft, Loader2 } from 'lucide-react';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../hooks/UseGetCompanyById';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    });
    const { singleCompany } = useSelector(store => store.company);

    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null,
            });
        }
    }, [singleCompany]);

    return (
        <div>
            <Navbar />
            <div className='flex justify-center'>
                <form onSubmit={submitHandler} className='bg-white p-8 rounded-lg shadow-md w-full max-w-2xl'>
                    <div className='flex items-center gap-10 mb-8'>
                        <Button onClick={() => navigate(-1)} className='flex items-center gap-2 text-gray-500 font-semibold'>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4 my-5'>
                        <label htmlFor='name'>Company Name</label>
                        <input
                            value={input.name}
                            onChange={changeEventHandler}
                            type='text'
                            name="name"
                            id="name"
                            className='border h-10 bg-slate-100 p-3 rounded-sm'
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4 my-5'>
                        <label htmlFor='description'>Description</label>
                        <input
                            value={input.description}
                            onChange={changeEventHandler}
                            type='text'
                            name="description"
                            id="description"
                            className='border h-10 bg-slate-100 p-3 rounded-sm'
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4 my-5'>
                        <label htmlFor='website'>Website</label>
                        <input
                            value={input.website}
                            onChange={changeEventHandler}
                            type='text'
                            name="website"
                            id="website"
                            className='border h-10 bg-slate-100 p-3 rounded-sm'
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4 my-5'>
                        <label htmlFor='location'>Location</label>
                        <input
                            value={input.location}
                            onChange={changeEventHandler}
                            type='text'
                            name="location"
                            id="location"
                            className='border h-10 bg-slate-100 p-3 rounded-sm'
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4 my-5'>
                        <label htmlFor='logo'>Logo</label>
                        <input
                            onChange={changeFileHandler}
                            type='file'
                            accept='image/*'
                            name="logo"
                            id="logo"
                            className='border h-10 bg-slate-100 p-1 rounded-sm'
                        />
                    </div>
                    <Button variant='contained' type='Submit' className='w-full m-8' disabled={loading}>
                        {loading ? <><Loader2 className='mr-2 animate-spin' /> Updating...</> : 'Update'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
