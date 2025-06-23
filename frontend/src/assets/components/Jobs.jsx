import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from './hooks/UseGetAllJobs';
import { motion } from 'framer-motion';
import { setSearchQuery } from './redux/jobSlice';

const Jobs = () => {
    useGetAllJobs();
    const { allJobs, searchQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const dispatch= useDispatch();

    useEffect(() => {
        if (searchQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchQuery.toLowerCase())

            })
            setFilterJobs(filteredJobs);

        } else {
            setFilterJobs(allJobs);
        }

    }, [allJobs, searchQuery]);
    useEffect(()=>{
        return()=>{
            dispatch(setSearchQuery(""));

        }
    },[])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-1/5'>
                        <FilterCard />
                    </div>

                    <div className='w-4/5'>
                        {!Array.isArray(filterJobs) || filterJobs.length === 0 ? (
                            <span>No job available</span>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                                {filterJobs.map((job) => (
                                    <motion.div key={job._id} initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }} >
                                        <Job job={job} />

                                    </motion.div>

                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
