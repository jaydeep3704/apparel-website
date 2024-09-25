import React from 'react'
import Title from '../components/Title'
import about from "../assets/about_img.png"
import NewsLetter from '../components/NewsLetter'
const About = () => {
  return (
    <div className='px-5 lg:px-40 sm:px-10'>
      <div className='flex justify-center pt-8 text-2xl font-semibold'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='flex flex-col gap-16 my-10 md:flex-row'>
          <img src={about} alt=""  className='h-[400px] aspect-square'/>
          <div className='flex flex-col justify-center gap-6 text-gray-600 md:w-1/2'>
            <p>HypeBay was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
            <p>
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
            </p>
            <b>Our Mission</b>
            <p>Our mission at HypeBay is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
          </div>
      </div>
   
        <div className='py-4 text-2xl'>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
         
        </div>
        <div className='flex flex-col mb-20 text-sm md:flex-row'>
            <div className='flex flex-col gap-5 px-10 py-8 border md:px-16'> 
              <b>Quality assurance</b>
              <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
            </div>
            <div className='flex flex-col gap-5 px-10 py-8 border md:px-16'> 
              <b>Convenience:</b>
              <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
            </div>
            <div className='flex flex-col gap-5 px-10 py-8 border md:px-16'> 
              <b>Exceptional Customer Service</b>
              <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
            </div>
       </div>
       <NewsLetter/>
    </div>
  )
}

export default About
