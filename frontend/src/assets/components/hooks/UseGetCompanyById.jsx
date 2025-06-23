import { setSingleCompany } from '../redux/companySlice';
import { setAllJobs } from '../redux/jobSlice';
import { COMPANY_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();  // Access Redux dispatch

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));  // Dispatch fetched jobs to Redux store
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleCompany();  // Trigger the job fetching when the component mounts
  }, [companyId, dispatch]);  // Include dispatch in the dependency array
};

export default useGetCompanyById;
