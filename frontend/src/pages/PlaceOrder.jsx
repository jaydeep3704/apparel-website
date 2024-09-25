import React, { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import razorpay from '../assets/payment/razorpay_logo.png'
import stripe from '../assets/payment/stripe_logo.png'
import { useNavigate } from 'react-router-dom'
const PlaceOrder = () => {

 const [method,setMethod]=useState('cod')
 const navigate=useNavigate()

  return (
    <div className='flex flex-col justify-between gap-4 px-5 pt-5 lg:flex-row lg:px-40 sm:px-10 sm:pt-14 min-h-[80vh]'>
       {/* ---------------------Left Side --------------------------- */}
       <div className='sm:w-[480px] w-full flex flex-col gap-10'>
            <div className='text-2xl font-semibold'>
                 <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
            </div>
            <div className='flex flex-col w-full gap-4'>
                 <div className='flex w-full gap-3'>
                    <input type="text" placeholder='First name' className='flex-1 px-3.5 py-1.5 rounded border border-gray-300'/>
                    <input type="text" placeholder='Last name' className='flex-1 px-3.5 py-1.5 rounded border border-gray-300'/>
                 </div>
           
                 <input type="email" placeholder='Email address' className='px-3.5 py-1.5 rounded border border-gray-300'/>
                 <input type="text" placeholder='Street' className='px-3.5 py-1.5 rounded border border-gray-300'/>
                 <div className='flex w-full gap-3'>
                    <input type="text" placeholder='City' className='flex-1 px-3.5 py-1.5 rounded border border-gray-300'/>
                    <input type="text" placeholder='State' className='flex-1 px-3.5 py-1.5 rounded border border-gray-300'/>
                 </div>
                 <div className='flex w-full gap-3'>
                    <input type="number" placeholder='Zipcode' className='flex-1 px-3.5 py-1.5 rounded border border-gray-300'/>
                    <input type="text" placeholder='Country' className='flex-1 px-3.5 py-1.5 rounded border border-gray-300'/>
                 </div>
                 <input type="number" placeholder='Phone No' className='px-3.5 py-1.5 rounded border border-gray-300'/>
            </div>
       </div>

       {/* ----------------------------Right Side------------------------- */}
       <div className='flex flex-col gap-8 mt-8 min-w-80'>
            <div>
                <CartTotal/>
            </div>
            <div>
                <div className='font-medium'>
                    <Title text1={'PAYMENT'} text2={'METHOD'}/>
                </div>
        {/* -----------------PAYMENT METHOD SELECTION ----------------------------- */}
                 <div className='flex flex-col gap-3 mt-3 lg:flex-row'>
                    <div className='flex items-center gap-3 p-2 px-3 border cursor-pointer' onClick={()=>setMethod('razorpay')}>
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay' && 'bg-green-500'}`}></p>
                        <img src={razorpay} alt="" className='h-5 mx-4'/>
                    </div>
                    <div className='flex items-center gap-3 p-2 px-3 border cursor-pointer' onClick={()=>setMethod('stripe')}>
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe' && 'bg-green-500'}`}></p>
                        <img src={stripe} alt="" className='h-5 mx-4'/>
                    </div>
                    <div className='flex items-center gap-3 p-2 px-3 border cursor-pointer' onClick={()=>setMethod('cod')}>
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod' && 'bg-green-500'}`}></p>
                        <p className='mx-4 font-medium uppercase'>cash on delivery</p>
                    </div>
                 </div>
            </div>
            <button className="lg:w-1/2 w-full py-2.5 mt-5 font-semibold text-white bg-black text-md  self-end" onClick={()=>navigate('/orders')}>PLACE ORDER</button>
       </div>


    </div>
  )
}

export default PlaceOrder
