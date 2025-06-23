import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {JOB_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const companyArray = [];

const PostJob = () => {

    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experienceLevel: "",
        position: 0,
        companyId: ""

    });

    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const selectChangeHandler = (e) => {
        const selectedCompany = companies.find((company) => company.name === e.target.value);
        setInput({ ...input, companyId: selectedCompany._id });
    };



    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log(input);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs")
            }

        } catch (error) {
            toast.error(error.response.data.message);

        } finally {
            setLoading(false);


        }

    }
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-evenly w-screen my-5'>
                <form action="" onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 items-center justify-evenly gap-4'>
                        <div className='flex flex-col items-start'>
                            <label htmlFor='title'> Title</label>
                            <input type='text' name='title'
                                id='title'
                                value={input.title}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 
                focus-visible:ring-0 my-1 border col-span-2 h-10 rounded-md shadow-md bg-slate-50'/>
                        </div>
                        <div className='flex flex-col items-start'>
                            <label htmlFor='description'> Description</label>
                            <input type='text' name='description'
                                id='description'
                                value={input.description}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 
                focus-visible:ring-0 my-1 border col-span-2 h-10 rounded-md shadow-md bg-slate-50'/>
                        </div>
                        <div className='flex flex-col items-start'>
                            <label htmlFor='title'>Requirements</label>
                            <input type='text' name='requirements'
                                id='requirements'
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 
                focus-visible:ring-0 my-1 border col-span-2 h-10 rounded-md shadow-md bg-slate-50'/>
                        </div>
                        <div className='flex flex-col items-start'>
                            <label htmlFor='salary'>Salary</label>
                            <input type='text' name='salary'
                                id='salary'
                                value={input.salary}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 
                focus-visible:ring-0 my-1 border col-span-2 h-10 rounded-md shadow-md bg-slate-50'/>
                        </div>
                        <div className='flex flex-col items-start'>
                            <label htmlFor='location'> Location</label>
                            <input type='text' name='location'
                                id='location'
                                value={input.location}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 
                focus-visible:ring-0 my-1 border col-span-2 h-10 rounded-md shadow-md bg-slate-50'/>
                        </div>
                        <div className='flex flex-col items-start'>
                            <label htmlFor='jobType'>JobType</label>
                            <input type='text' name='jobType'
                                id='jobType'
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 
                focus-visible:ring-0 my-1 border col-span-2 h-10 rounded-md shadow-md bg-slate-50'/>
                        </div>
                        <div className='flex flex-col items-start'>
                            <label htmlFor='experienceLevel'>Experience</label>
                            <input type='text' name='experienceLevel'
                                id='experienceLevel'
                                value={input.experienceLevel}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 
                focus-visible:ring-0 my-1 border col-span-2 h-10 rounded-md shadow-md bg-slate-50'/>
                        </div>
                        <div className='flex flex-col items-start'>
                            <label htmlFor='position'>No.  of Positions</label>
                            <input type='number' name='position'
                                id='position'
                                value={input.position}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 
                focus-visible:ring-0 my-1 border col-span-2 h-10 rounded-md shadow-md bg-slate-50'/>
                        </div>

                    </div>
                    {companies.length >= 1 ? <div className='my-5'>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Company</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Select Company"
                                onChange={selectChangeHandler}
                            >
                                {companies.map((company) => (
                                    <MenuItem key={company._id} value={company.name}>
                                        {company.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div> : <div> Found Nothing</div>}
                    <div className='mt-8'>
                        <Button type='Submit' variant='contained' className='w-full m-8'>{loading?<Loader2/>:'Post '}</Button>
                        {
                            companies.length === 0 && <p className='text-sm text-red-600 font-bold mt-3'> Please Register a Company first, before posting job</p>
                        }
                    </div>

                </form>


            </div>
        </div>
    )
}

export default PostJob