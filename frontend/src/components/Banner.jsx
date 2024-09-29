import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Banner = ({ primaryColor, secondaryColor, lightbg, image, text1, text2 }) => {
  return (
    <div className='w-full h-full py-10 md:h-[80vh]'>
      <div className={`flex flex-col w-full h-full  lg:flex-row`} style={{ backgroundColor: lightbg }}>
        <div className='flex items-center justify-center w-full h-full px-10 py-5 md:px-20 lg:w-1/2'>
          <div className='flex flex-col items-center justify-center gap-5'>
            <div className={`mt-14 text-4xl text-center lg:mt-20 md:text-6xl font-prata `} style={{ color: primaryColor }}>
              {text1}
            </div>
            <hr className={`h-[2px] w-full`} style={{ backgroundColor: primaryColor }} />
            <p className={`text-2xl text-center font-medium`} style={{ color: primaryColor }}>
              {text2}
            </p>
            <button
              className={`w-[250px] py-2 rounded text-lg font-semibold transition ease-in-out`}
              style={{
                backgroundColor: secondaryColor,
                color: 'white',
                border: `2px solid ${secondaryColor}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = secondaryColor;
                e.currentTarget.style.borderColor = secondaryColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = secondaryColor;
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = secondaryColor;
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
        <div className='w-full h-full bg-white lg:w-1/2'>
          <img src={image} alt="" className='object-cover w-full h-full' />
        </div>
      </div>
    </div>
  );
};

export default Banner
