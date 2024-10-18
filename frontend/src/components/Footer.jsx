import React from 'react'
import logo from "../assets/logo/logo.png"
const Footer = () => {
  return (
    <div className='px-[4%]'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
        <img src={logo} alt="" className='w-32 mb-5' />
          <p className='w-full text-gray-600 md:w-2/3'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
          </p>
        </div>
         <div>
            <p className='mb-5 text-xl font-medium'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
              <li>Home</li>
              <li>About</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
         </div>
         <div>
            <p className='mb-5 text-xl font-medium'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
              <li>+91 100-001-0001</li>
              <li>github</li>
              <li>prakriticlothing@gmail.com</li>
            </ul>
         </div>


      </div>
      <div className='py-5 text-sm text-center border-t border-gray-400'>
      Copyright 2024 @prakriticlothing - All Right Reserved.
      </div>
    </div>
  )
}

export default Footer
