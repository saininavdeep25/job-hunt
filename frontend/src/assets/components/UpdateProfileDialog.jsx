import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Label from './ui/Label';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from './utils/constant';
import { setUser } from './redux/authSlice';
import toast from 'react-hot-toast';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);  // This will close the dialog
    };

    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: null // Default to null for file, will be updated on file change
    });

    const changeEventHandler = (e) => {
        if (e.target.name === 'skills') {
            const skillsArray = e.target.value.split(',').map(skill => skill.trim());
            setInput({...input, [e.target.name]: skillsArray });
        } else {
            setInput({...input, [e.target.name]: e.target.value });
        }
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }

        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <div className='flex justify-between'>
                    <DialogTitle>
                        Update Profile
                    </DialogTitle>
                    <Button onClick={handleClose} className="close-button"><X /></Button>
                </div>
                <DialogContent className='sm:max-w-[425px]'>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="fullname" className="text-right">Name</Label>
                                <input
                                    id="fullname"
                                    onChange={changeEventHandler}
                                    name='fullname'
                                    value={input.fullname || ''}
                                    className='col-span-3 border p-1 rounded-lg border-gray-400'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <input
                                    id="email"
                                    onChange={changeEventHandler}
                                    name='email'
                                    value={input.email || ''}
                                    className='col-span-3 rounded-lg border p-1 border-gray-400'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="phoneNumber" className="text-right">Number</Label>
                                <input
                                    id="phoneNumber"
                                    onChange={changeEventHandler}
                                    name='phoneNumber'
                                    value={input.phoneNumber || ''}
                                    className='rounded-lg col-span-3 border p-1 border-gray-400'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className="text-right">Bio</Label>
                                <input
                                    id="bio"
                                    onChange={changeEventHandler}
                                    name='bio'
                                    value={input.bio || ''}
                                    className='col-span-3 rounded-lg border p-1 border-gray-400'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className="text-right">Skills</Label>
                                <input
                                    id="skills"
                                    onChange={changeEventHandler}
                                    name='skills'
                                    value={input.skills || ''}
                                    className='col-span-3 rounded-lg border p-1 border-gray-400'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file" className="text-right">Resume</Label>
                                <input
                                    id="file"
                                    name='file'
                                    type='file'
                                    onChange={fileChangeHandler}
                                    accept='application/pdf'
                                    className='col-span-3 rounded-lg border p-1 border-gray-400'
                                />
                            </div>
                        </div>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button type="submit" color="primary">Save</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UpdateProfileDialog;
