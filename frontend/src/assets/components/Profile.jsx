import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import Avatar from './ui/Avatar'
import Button from './ui/Button'
import { Contact, Mail, Pen } from 'lucide-react'
import Badge from './ui/Badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import UseGetAppliedJobs from './hooks/UseGetAppliedJobs'

const skills = ["HTML", "CSS", "JAVASCRIPT", "REACTJS"]

const Profile = () => {
    UseGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const isResume = true;

    const {user}= useSelector(store=>store.auth)

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-4'>
                        <Avatar src="https://th.bing.com/th/id/OIP.afQdiNPi7rhMZnP6xqoyLwAAAA?rs=1&pid=ImgDetMain" size='large' />
                        <div>
                            <h1 className='font-medium text-xl'>{user.fullname}</h1>
                            <p>{user.profile.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className='text-right' variant='outline'>
                        <Pen />
                    </Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail /><span>{user.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact /><span>{user.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5 flex items-start justify-start flex-col'>
                    <div>
                        <h1>Skills</h1>
                    </div>
                    <div className='flex items-center gap-2 my-2'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge className='text-white bg-[#240331]' key={index} text={item} />) : <span>Not Found</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm justify-start items-center gap-1.5'>
                    <label className='text-md font-bold'>Resume</label>
                    {
                        isResume ? <a className='text-blue-500 cursor-pointer w-full hover:underline' target='blank' href={user.profile.resume}>{user?.profile?.resumeOriginalName}</a> : <span>Not Applicable</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1> All Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile;
