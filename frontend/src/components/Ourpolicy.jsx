import React from 'react'
import  exchange_icon from "../assets/icons/exchange_icon.png"
import  quality_icon from "../assets/icons/quality_icon.png"
import support_icon from "../assets/icons/support_img.png"

const Ourpolicy = () => {
  return (
    <div className='flex flex-col justify-around gap-12 py-20 text-center sm:flex-row sm:gap-2'>
           <div className='flex flex-col items-center justify-center gap-2'>
                <img src={exchange_icon} alt="" />
                <p className='font-semibold'>Easy Exchange Policy</p>
                <p className='text-gray-400'>We offer hassle free exchange policy</p>
            </div> 
           <div className='flex flex-col items-center justify-center gap-2'>
                <img src={quality_icon} alt="" />
                <p className='font-semibold'>7 Days Return Policyy</p>
                <p className='text-gray-400'>We provide 7 days free return policy</p>
            </div> 
           <div className='flex flex-col items-center justify-center gap-2'>
                <img src={support_icon} alt="" />
                <p className='font-semibold'>Best customer support</p>
                <p className='text-gray-400'>we provide 24/7 customer support</p>
            </div> 
    </div>
  )
}

export default Ourpolicy
