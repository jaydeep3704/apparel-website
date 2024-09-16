import React from 'react'

const NewsLetter = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full gap-5 py-20'>
        <p className='text-2xl font-semibold'>Subscribe now & get 20% off</p>
        <p className='text-gray-500 '>HypeBay Offers a wide variety of clothing brands along with awesome price </p>
        <div className='flex items-center w-full border border-gray-400 md:w-2/3'><input type="text" className='w-full px-10 py-3 border-none outline-none' placeholder='Enter your email'/><button className='px-10 py-3 text-white bg-black border-none outline-none'>SUBSCRIBE</button></div>
    </div>
  )
}

export default NewsLetter
