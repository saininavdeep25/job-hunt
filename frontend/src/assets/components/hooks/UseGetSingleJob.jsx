import { setAllJobs, setSingleJob } from '../redux/jobSlice';
import { JOB_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetSingleJob = (jobId) => {
  const dispatch = useDispatch();  // Access Redux dispatch

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));  // Dispatch fetched jobs to Redux store
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();  // Trigger the job fetching when the component mounts
  }, []);  // Include dispatch in the dependency array
};

export default useGetSingleJob;
