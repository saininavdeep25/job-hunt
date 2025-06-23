import { setCompanies } from '../redux/companySlice';
import { COMPANY_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
  const dispatch = useDispatch();  // Access Redux dispatch

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies)); 
          console.log(res.data.companies);// Dispatch fetched companies to Redux store
        }
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies(); 
     // Fetch companies on component mount
  }, [dispatch]);  // Include dispatch in the dependency array
};

export default useGetAllCompanies;
