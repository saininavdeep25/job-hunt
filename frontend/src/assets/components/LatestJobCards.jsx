import { useNavigate } from 'react-router-dom';
import Badge from './ui/Badge';
import React from 'react';

const LatestJobCards = ({ job }) => {
  const naviagte = useNavigate();
  return (
    <div onClick={() => naviagte(`/jobs/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
      <div>
        <h1 className='font-medium text-lg'>{job?.company?.name || 'Unknown Company'}</h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title || 'Job Title Not Available'}</h1>
        <p className='text-sm text-gray-600'>{job?.description || 'No description available.'}</p>
        <div className='flex flex-wrap items-center gap-2 justify-evenly mt-4'>
          <Badge className='text-[#1e11d0] font-bold bg-slate-200' text={`${job?.position} Positions`} />
          <Badge className='text-[#e02b01] font-bold bg-slate-200' text={job?.jobType} />
          <Badge className='text-[#7209c7] font-bold bg-slate-200' text={`${job?.salary} LPA`} />
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;
