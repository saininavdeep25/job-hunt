import { Search } from 'lucide-react';
import React, { useState } from 'react'; // Import useState
import Button from './ui/Button';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from './redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim()) { // Check if query is not just whitespace
      dispatch(setSearchQuery(query));
      navigate("/browse");
    }
  };

  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <h2 className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
          No. 1 Job Hunt Website
        </h2>
        <h1 className='text-5xl font-bold'>
          Search, Apply & <br /> Get Your <span className='text-[#6a38c2]'>Dream Jobs</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui laudantium dignissimos obcaecati quis, voluptate error.
        </p>
        <div className='flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
          <input
            type='text'
            placeholder="Find your dream job"
            onChange={(e) => setQuery(e.target.value)}
            className='outline-none border-none w-full'
            aria-label="Search for jobs" // Added aria-label for accessibility
          />
          <Button className='rounded-r-full bg-[#6a38c2]' onClick={searchJobHandler}>
            <Search className='h-5 w-5' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
