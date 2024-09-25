import React from 'react'
import contact from "../assets/contact_img.png"
import Title from '../components/Title'
const Contact = () => {
  return (
    <div className='px-5 lg:px-40 sm:px-10'>
      <div className='flex justify-center pt-10 text-2xl text-center'>
          <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='flex flex-col justify-center gap-10 my-10 md:flex-row mb-28'>
          <img src={contact} alt="" className='w-full max-w-[480px]' />
          <div className='flex flex-col items-start justify-center gap-6'>
            <p className='text-xl font-semibold text-gray-600'>Our Store</p>
            <p className='text-gray-500'>54709 Willms Station
            <br />Suite 350, Washington, USA</p>
            <p className='text-gray-500'>Tel: (415) 555-0132
            <br />Email: admin@forever.com</p>
            <p className='text-xl font-semibold text-gray-600'>Careers at HypeBay</p>
            <p className='text-gray-500'>Learn more about our teams and job openings.</p>
            <button className='px-10 py-3 transition duration-300 ease-in-out border border-black rounded hover:bg-black hover:text-white'>Explore Jobs</button>
          </div>
      </div>
    </div>
  )
}

export default Contact
