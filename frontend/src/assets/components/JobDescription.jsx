import React, { useEffect, useState } from 'react';
import Badge from './ui/Badge';
import Button from './ui/Button';
import Navbar from './shared/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from './utils/constant';
import { setSingleJob } from './redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };

                // Dispatch updated job to Redux
                dispatch(setSingleJob(updatedSingleJob));

                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

        // Fetch single job details
        useEffect(() => {
            const fetchSingleJob = async () => {
                try {
                    const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                    if (res.data.success) {
                        dispatch(setSingleJob(res.data.job));
                        setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            fetchSingleJob();
        }, [jobId, dispatch, user?._id]);
    
        // Check if the user has already applied
        useEffect(() => {
            console.log('user:', user);
            console.log('job applications:', singleJob?.applications);
    
            if (singleJob?.applications?.some(application => application.applicant === user?._id)) {
                setIsApplied(true);
            } else {
                setIsApplied(false); // Reset in case it’s not applied
            }
        }, [singleJob, user]);
    

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-xl '>{singleJob?.title}</h1>
                        <div className='flex items-center gap-2 mt-4'>
                            <Badge className='text-[#1e11d0] font-bold bg-slate-200' text={`${singleJob?.position || 0} Positions`} />
                            <Badge className='text-[#e02b01] font-bold bg-slate-200' text={`${singleJob?.jobType || 'N/A'}`} />
                            <Badge className='text-[#7209c7] font-bold bg-slate-200' text={`${singleJob?.salary || 'N/A'} LPA`} />
                        </div>
                    </div>
                    <Button 
                        onClick={isApplied ? null : applyJobHandler} 
                        className={`rounded-lg text-white ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#470473]"}`} 
                        variant='outline'
                    >
                        {isApplied ? "Already Applied" : "Apply Now"}
                    </Button>
                </div>

                <h1 className='border-b-2 border-b-gray-300 font-medium my-4'>Job Description</h1>
                <div className='flex flex-col justify-start items-start'>
                    <h1 className='font-bold my-2'>Role: <span className='font-normal text-gray-800 pl-4'>{singleJob?.title || 'N/A'}</span></h1>
                    <h1 className='font-bold my-2'>Location: <span className='font-normal text-gray-800 pl-4'>{singleJob?.location || 'N/A'}</span></h1>
                    <h1 className='font-bold my-2'>Description: <span className='font-normal text-gray-800 pl-4'>{singleJob?.description || 'N/A'}</span></h1>
                    <h1 className='font-bold my-2'>Experience: <span className='font-normal text-gray-800 pl-4'>{singleJob?.experienceLevel || 0} yrs</span></h1>
                    <h1 className='font-bold my-2'>Salary: <span className='font-normal text-gray-800 pl-4'>{singleJob?.salary || 'N/A'} LPA</span></h1>
                    <h1 className='font-bold my-2'>Total Applicants: <span className='font-normal text-gray-800 pl-4'>{singleJob?.applications?.length || 0}</span></h1>
                    <h1 className='font-bold my-2'>Posted Date: <span className='font-normal text-gray-800 pl-4'>{singleJob?.createdAt?.split("T")[0] || 'N/A'}</span></h1>
                </div>
            </div >
        </div>
    );
};

export default JobDescription;
