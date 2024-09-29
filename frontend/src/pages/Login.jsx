import React, { useEffect, useState } from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import { saveToken } from '../store/authSlice.js'
import { backendURL } from '../App.jsx'
import { toast } from 'react-toastify'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [currentState,setCurrentState]=useState('Sign Up')
  const[email,setEmail]=useState('')
  const navigate=useNavigate()
  const[password,setPassword]=useState('')
  const[name,setName]=useState('')
  const dispatch=useDispatch()
  const token=useSelector((store)=>store.auth.token)

  const onSubmitHandler=async (e)=>{
    e.preventDefault()
    try {
        if(currentState==='Sign Up')
        {
          const response=await axios.post(backendURL+'/api/user/register',{name,email,password})
          if(response.data.success)
          {
            dispatch(saveToken(response.data.token))
            localStorage.setItem('token',response.data.token)
            toast.success(response.data.message)
            navigate('/')
          }
          else{
            toast.error(response.data.message)
          }
        }
        else{
          const response=await axios.post(backendURL+'/api/user/login',{email,password})
          if(response.data.success)
          {
            dispatch(saveToken(response.data.token))
            localStorage.setItem('token',response.data.token)
            toast.success(response.data.message)
          }
          else{
            toast.error(response.data.message)
          }
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  useEffect(()=>{
      if(token)
      {
        navigate('/')
      }
  },[token])

 

  
  return (
   
        <form className='flex flex-col items-center m-auto w-[90%] sm:max-w-96 mt-4 text-gray-800 gap-4' onSubmit={onSubmitHandler}>
            <div className='inline-flex items-center gap-2 mt-10 mb-2'>
                <p className='text-3xl font-prata'>{currentState}</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
            </div>
            {currentState=='Sign Up' && <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name'  required onChange={(e)=>setName(e.target.value)}/>}
            <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required  onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required  onChange={(e)=>setPassword(e.target.value)}/>
            <div className='w-full flex justify-between text-sm mt-[-8px]'>
                <p className='cursor-pointer'>Forgot your Password ?</p>
                <p className='cursor-pointer'>
                    {currentState==='Login'? <p  className='cursor-pointer' onClick={()=>setCurrentState('Sign Up')}>Create Account</p>:<p className='cursor-pointer' onClick={()=>setCurrentState('Login')}>Login Here</p>}
                </p>
            </div>
            <button className='py-2 mt-4 font-light text-white bg-black px-14'>{currentState==='Login'?'Sign In':'Sign Up'}</button>
        </form>
 
  )
}

export default Login
