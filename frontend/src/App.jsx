import { useState } from 'react'
import './App.css'
import Navbar from './assets/components/shared/navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './assets/components/auth/Signup'
import Login from './assets/components/auth/login'
import Home from './assets/components/Home'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'
import Jobs from './assets/components/Jobs'
import Browse from './assets/components/Browse'
import Profile from './assets/components/Profile'
import JobDescription from './assets/components/JobDescription'
import Companies from './assets/components/admin/Companies'
import CreateCompany from './assets/components/admin/CreateCompany'
import CompanySetup from './assets/components/admin/CompanySetup'
import AdminJobs from './assets/components/admin/AdminJobs'
import PostJob from './assets/components/admin/PostJob'
import Applicants from './assets/components/admin/Applicants'
import ProtectedRoute from './assets/components/admin/ProtectedRoute'
const appRoute= createBrowserRouter([{
  path:'/',
  element:<Home/>
},
{
  path:'/login',
  element:<Login/>
},{
  path:'/signup',
  element:<Signup/>
},{
  path:'/jobs',
  element:<Jobs/>
},{
  path:'/browse',
  element:<Browse/>
},{
  path:'/profile',
  element:<Profile/>
},{
  path:"/jobs/description/:id",
  element:<JobDescription/>
},
{
  path:"/admin/companies",
  element:<ProtectedRoute><Companies/></ProtectedRoute>
},{
  path:"/admin/companies/create",
  element: <ProtectedRoute><CreateCompany/></ProtectedRoute>
},{
  path:"/admin/companies/:id",
  element: <ProtectedRoute><CompanySetup/></ProtectedRoute>
},{
  path: "/admin/jobs",
  element: <ProtectedRoute><AdminJobs/></ProtectedRoute>
},{
  path:"/admin/jobs/create",
  element:<ProtectedRoute><PostJob/></ProtectedRoute>
},{
  path:`/admin/jobs/:id/applicants`,
  element:<ProtectedRoute><Applicants/></ProtectedRoute>
}])

function App() {

  return (
    <div>
      <Toaster/>
      <RouterProvider router={appRoute}/>
    </div>
  )
}

export default App
