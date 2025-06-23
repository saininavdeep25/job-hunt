import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { APPLICATION_API_END_POINT } from '../utils/constant';
import { setAllAppliedJobs } from '../redux/jobSlice';

const UseGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
        
        // Check if the response contains the data as expected
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications)); // Dispatch the jobs data to Redux store
        } else {
          console.log('Failed to fetch applied jobs:', res.data.message); // Log failure reason
        }

      } catch (error) {
        // Log the error for debugging
        console.error('Error fetching applied jobs:', error);
      }
    };

    // Fetch applied jobs
    fetchAppliedJobs();
    
  }, [dispatch]); // Added dispatch to the dependency array to avoid warnings
};

export default UseGetAppliedJobs;
