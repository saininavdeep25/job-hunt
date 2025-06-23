import React from 'react'
import Button from './ui/Button'
import { Bookmark } from 'lucide-react'
import { Avatar } from './ui/Avatar'
import Badge from './ui/Badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate= useNavigate();
    const jobId= job._id;
    

    const daysAgo=(mongodbtime)=>{
        const createdAt= new Date(mongodbtime);
        const currentTime= new Date();

        const gap= currentTime-createdAt;
        return Math.floor(gap/(1000*24*60*60));

    }
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-200'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-600 '> {daysAgo(job?.createdAt)} days ago</p>
                <Button variant='outline' className='rounded-full' size='icon' ><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2 justify-items-center'>
                <Button className='w-15 h-12 rounded-r-full p-0 bg-[#d9c9ee]'>
                    <Avatar className='w-10 h-10' src={job?.company?.logo} />
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div className=''>
                <h1 className='font-bold text-lg my-2 '>{job?.title}</h1>
                <p className='text-sm text-gray-600'> {job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 justify-evenly mt-4'>
                <Badge className='text-[#1e11d0] font-bold bg-slate-200' text={`${job?.position} Positions`}></Badge>
                <Badge className='text-[#e02b01] font-bold bg-slate-200' text={job?.jobType}/>
                <Badge className='text-[#7209c7] font-bold bg-slate-200' text={`${job?.salary} LPA`}/>
            </div>
            <div className='flex items-center justify-around mt-4'>
                <Button variant='outline' onClick={()=>navigate(`/jobs/description/${jobId}`)}>Details</Button>
                <Button className='bg-[#7209b7] text-white'>Save for Later</Button>
            </div>
        </div>
    )
}

export default Job