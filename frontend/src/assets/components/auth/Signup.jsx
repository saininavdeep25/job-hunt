import React, { useEffect, useState } from 'react';
import Navbar from '../shared/navbar';
import Label from '../ui/Label';
import Input from '../ui/Input';
import { RadioGroup } from '@radix-ui/react-radio-group'; // Ensure you have the correct package installed
import Button from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/authSlice';
import { Loader2 } from 'lucide-react';


const Signup = () => {
    const { loading, user } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success('Registration successful!');
                navigate("/login");
            } else {
                toast.error('Registration failed.');
            }

        } catch (error) {
            console.log(error);
            toast.error('An error occurred. Please try again.');
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(()=>{
        if(user){
            navigate('/');
        }
    })

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4'>
                    <h1 className='font-bold text-xl mb-5'>SignUp</h1>

                    <div className='my-2'>
                        <Label htmlFor="fullname">Full Name</Label>
                        <Input
                            type='text'
                            id="fullname"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Navdeep Singh"
                        />
                    </div>

                    <div className='my-2'>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type='text'
                            id="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Navdeep@hotmail.com"
                        />
                    </div>

                    <div className='my-2'>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            type='text'
                            id="phoneNumber"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8989898989"
                        />
                    </div>

                    <div className='my-2'>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type='password'
                            id="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="password"
                        />
                    </div>

                    <div className='flex items-center justify-between gap-8 mx-5 flex-wrap'>
                        <RadioGroup className='flex items-center gap-4 my-5'>
                            <div className='flex items-center space-x-2'>
                                <input
                                    type="radio"
                                    id="r1"
                                    name="role"
                                    checked={input.role === 'Student'}
                                    value="Student"
                                    onChange={changeEventHandler}
                                />
                                <label htmlFor="r1">Student</label>
                            </div>

                            <div className='flex items-center space-x-2'>
                                <input
                                    type="radio"
                                    id="r2"
                                    name="role"
                                    checked={input.role === 'Recruiter'}
                                    value="Recruiter"
                                    onChange={changeEventHandler}
                                />
                                <label htmlFor="r2">Recruiter</label>
                            </div>
                        </RadioGroup>

                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <input
                                accept='image/*'
                                type='file'
                                onChange={changeFileHandler}
                                className='cursor-pointer'
                            />
                        </div>
                    </div>

                    {loading ?
                        <Button className='w-full my-4' variant='outline'>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
                        </Button>
                        :
                        <Button type='submit' variant='outline' className='w-full my-4'>
                            Signup
                        </Button>
                    }


                    <span className='text-sm'>
                        Already have an account? <Link to='/login' className='text-blue-600'>Login</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Signup;
