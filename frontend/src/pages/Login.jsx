import React, { useState } from 'react'

const Login = () => {
  const [currentState,setCurrentState]=useState('Sign Up')
  const onSubmitHandler=async (e)=>{
    e.preventDefault()
  }
  
  return (
   
        <form className='flex flex-col items-center m-auto w-[90%] sm:max-w-96 mt-4 text-gray-800 gap-4' onSubmit={onSubmitHandler}>
            <div className='inline-flex items-center gap-2 mt-10 mb-2'>
                <p className='text-3xl font-prata'>{currentState}</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
            </div>
            {currentState=='Sign Up' && <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name'  required/>}
            <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
            <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
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
