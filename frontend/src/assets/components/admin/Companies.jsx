import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '@mui/material'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../hooks/UseGetAllJobs'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../redux/companySlice'

const Companies = () => {
  useGetAllCompanies();
  const dispatch=useDispatch();
  const navigate= useNavigate();
  const [input, setInput]= useState("");
  useEffect(()=>{
    dispatch(setSearchCompanyByText(input))
  },[input])

  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
            <input className='m-fit border border-gray-500 rounded-md' 
            placeholder='Filter by Name' 
            onChange={(e)=>setInput(e.target.value)} />
            <Button onClick={()=>navigate("/admin/companies/create")} > New Company</Button> 
            </div>
            <CompaniesTable/>

        </div>
    </div>
  )
}

export default Companies