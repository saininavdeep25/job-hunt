import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Popover from '@radix-ui/react-popover';
import Button from '../ui/button';
import Avatar from '../ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; // Make sure axios is imported
import { LogOut, User2Icon } from 'lucide-react';
import toast from 'react-hot-toast';
import { USER_API_END_POINT } from '../utils/constant';
import { setUser } from '../redux/authSlice';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error); // Use console.error for better error visibility
            toast.error(error.response?.data?.message || "An error occurred while logging out.");
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div className="bg-white">
                    <h1 className="text-2xl font-bold text-black">
                        Job <span className="text-[#f83002]">Portal</span>
                    </h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className="flex font-medium items-center gap-5">
                        {
                            user && user.role === 'Recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }

                    </ul>
                    {
                        !user ? (
                            <div className='flex gap-x-6'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button variant="outline" className="bg-[#6a46cb] hover:bg-[#5d2db1] text-white">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover.Root>
                                <Popover.Trigger asChild>
                                    <Button variant="outline">Profile</Button>
                                </Popover.Trigger>
                                <Popover.Content side="bottom" className="w-80 p-4 bg-slate-200 rounded shadow-lg">
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar
                                            className="cursor-pointer"
                                            src={user?.profile?.profilePhoto}
                                            alt="User Avatar"
                                            fallback="UA"
                                            size="medium"
                                        />
                                        <div className='flex justify-center gap-x-5 flex-col'>
                                            <h4 className="font-bold">{user.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user.profile.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex mx-auto gap-9 my-6'>
                                        <Button variant="outline"><User2Icon /><Link to="/profile">View Profile</Link></Button>
                                        <Button variant="outline" onClick={logoutHandler} ><LogOut />Logout</Button>
                                    </div>
                                </Popover.Content>
                            </Popover.Root>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
