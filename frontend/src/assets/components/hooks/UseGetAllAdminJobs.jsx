import { setAllAdminJobs } from '../redux/jobSlice';
import { JOB_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();  // Access Redux dispatch

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getAdminJobs`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs)); 
           // Dispatch fetched jobs to Redux store
           console.log(res.data.jobs)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllAdminJobs();  // Trigger the job fetching when the component mounts
  }, [dispatch]);  // Include dispatch in the dependency array
};

export default useGetAllAdminJobs;
