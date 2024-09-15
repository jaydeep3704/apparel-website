import React from 'react';
import Banner_Img from "../assets/hero_img.png"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
 

  return (
    <div className='w-full md:h-[70vh] h-screen  py-10  '>
        <div className='flex flex-col w-full h-full bg-white border border-gray-300 lg:flex-row'>
          <div className='flex items-center w-full h-full px-10 py-5 md:px-20 lg:w-1/2'>
              <div className='flex flex-col gap-5'>
                  <div className='flex items-center gap-2'>
                     <span className='w-11 h-[1px] block bg-black'></span>
                     <span className='font-semibold'>OUR BESTSELLLERS</span>
                  </div>
                  <div className='text-4xl md:text-6xl font-prata'>
                    Latest Arrivals
                  </div>
                  <div className='flex items-center gap-2'>
                     <span className='font-semibold'>SHOP NOW</span>
                     <span className='w-11 h-[1px] block bg-black'></span>
                  </div>
              </div>
          </div>
          <div className='w-full h-full lg:w-1/2'>
            <img src={Banner_Img} alt="" className='object-cover w-full h-full'/>
          </div>
        </div>
    </div>
  );
};

export default Banner;
