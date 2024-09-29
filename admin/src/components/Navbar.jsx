import React from 'react'
import { assets } from '../assets/assets'
import { useAuth } from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'
const Navbar = () => {
  const navigate=useNavigate()
  const {token,setToken}=useAuth()
  return (
    <div className='flex items-center justify-between  px-[4%] py-3'>
       <img src={assets.logo} alt="" className='w-40'/>
       <button className='px-5 py-2 text-xs text-white bg-gray-600 rounded-full sm:px-7 sm:text-sm' onClick={()=>{
        setToken('')
        localStorage.removeItem('token')
        navigate('/')
        }}>logout</button>
    </div>
  )
}

export default Navbar
