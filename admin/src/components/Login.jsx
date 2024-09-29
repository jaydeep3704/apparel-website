import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
const Login = () => {

const {token,setToken}=useAuth()
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')


const onSubmitHandler=async(e)=>{
  e.preventDefault()
  try {
    const response=await axios.post(backendUrl+"/api/user/admin",{
      email,password
    })
    console.log(response)
    if(response.data.success)
    {
      setToken(response.data.token)
      toast.success('Admin Login Sucessful')
    }
    else{
      toast.error(response.data.message)
    }
  } catch (error) {
      console.log(error)
      toast.error(error.message)
  }
}


  return (
    <div className='flex items-center justify-center w-full min-h-screen'>
      <div className='max-w-md px-8 py-6 bg-white rounded-lg shadow-md'>
        <h1 className='mb-4 text-2xl font-bold'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler} >
            <div className='mb-3 min-w-72'>
                <p className='mb-2 text-sm font-medium text-gray-700'>Email Address</p>
                <input type="email" placeholder='your@email.com' required className='w-full px-3 py-2 border border-gray-300 rounded outline-none'value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className='mb-3 min-w-72'>
                <p className='mb-2 text-sm font-medium text-gray-700'>Password</p>
                <input type="password" placeholder='Enter your password' required className='w-full px-3 py-2 border border-gray-300 rounded outline-none' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button type='submit' className='w-full py-2 mt-3 text-white bg-black border-none rounded-md outline-none'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
