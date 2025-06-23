import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { Button } from '@mui/material';
import { setSearchJobByText } from '../redux/jobSlice'; // Updated the action to be job-related
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../hooks/UseGetAllAdminJobs';

const AdminJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchJobByText(input)); // Dispatching job-related filter action
  }, [input, dispatch]); // Added dispatch to the dependency array

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <input
            className="m-fit border border-gray-500 rounded-md px-3 py-2" // Added padding for better UX
            placeholder="Filter by Job Title" // Updated placeholder to make it more relevant
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate('/admin/jobs/create')}>Post New Job</Button> {/* Updated path */}
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
