import React, { useEffect, useState } from 'react'
import Navbar from '../shared/navbar'
import Label from '../ui/Label'
import Input from '../ui/Input'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import Button from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios"
import { USER_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../redux/authSlice'
import store from '../redux/store'
import { Loader2 } from 'lucide-react'



const Login = () => {
    const { loading,user } = useSelector(store => store.auth);
    const [input, setinput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
    
        try {
            dispatch(setLoading(true));  // Set loading state to true
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true  // Include credentials with the request
            });
    
            if (res.data.success) {
                dispatch(setUser(res.data.user));  // Update the user state in Redux
                toast.success('Login successful!');  // Notify the user of success
                navigate("/");  // Redirect to the home page
            } else {
                toast.error('Login failed. Please check your credentials.');  // Notify the user of failure
            }
        } catch (error) {
            console.error('Login error:', error);  // Log error for debugging
            toast.error("Error during login. Please try again.");  // Notify the user of an error
        } finally {
            dispatch(setLoading(false));  // Reset loading state regardless of the outcome
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
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 '>
                    <h1 className='font-bold text-xl mb-5'> Login </h1>
                    <div className='my-2'>
                        <Label htmlFor="email"> Email</Label>
                        <Input type='text' id="email"
                            value={input.email} name="email"
                            onChange={changeEventHandler}
                            placeholder="Navdeep@hotmail.com" />
                    </div>
                    <div className='my-2'>
                        <Label htmlFor="password"> Password</Label>
                        <Input type='password' id="password"
                            value={input.password} name="password"
                            onChange={changeEventHandler} placeholder="password" />
                    </div>
                    <div className='flex items-center justify-between gap-8 mx-5'>
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
                    </div>
                    {loading ?
                        <Button className='w-full my-4' variant='outline'>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
                        </Button>
                        :
                        <Button type='submit' variant='outline' className='w-full my-4'>
                            Login
                        </Button>
                    }

                    <span className='text-sm'>Dont have an account? <Link to='/signup' className='text-blue-600'>Sign up</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login