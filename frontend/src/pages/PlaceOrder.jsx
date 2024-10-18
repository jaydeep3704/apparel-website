import React, { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import razorpay from '../assets/payment/razorpay_logo.png'
import stripe from '../assets/payment/stripe_logo.png'
import { useNavigate } from 'react-router-dom'
import { backendURL } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { clearCart } from '../store/cartSlice'
import { toast } from 'react-toastify'

const PlaceOrder = () => {


  const navigate = useNavigate();
  const dispatch=useDispatch();
  const token=localStorage.getItem('token')
  const totalPrice=useSelector((store)=>store.cart.totalPrice)+50
  const cartItems=useSelector((store)=>store.cart.cart_items)
  const products=useSelector((store)=>store.product.products)
  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });



  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

 

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    let orderItems = [];
  
    for (const items in cartItems)
    {
        for(const item in cartItems[items])
        {
            if(item==="_id")
            {   
                let itemInfo=structuredClone(products.find((product)=>product._id===cartItems[items][item]))
                itemInfo.size=cartItems[items]['size']
                itemInfo.quantity=cartItems[items]['quantity']
                orderItems.push(itemInfo)
            }
          
            
        }
    }

  
   
    let orderData={
        address:formData,
        items:orderItems,
        amount:totalPrice
    }

    switch(method){
        case 'cod':
            const response=await axios.post(backendURL+"/api/order/place",orderData,{headers:{token}})
            if(response.success)
            {
              dispatch(clearCart())
              toast.success("Order Placed")
              navigate('/orders')
            }
            else{
              toast.error(response.message)
            }
            break;

        case 'stripe':
            const responseStripe=await axios.post(backendURL+'/api/order/stripe',orderData,{headers:{token}})
            if(responseStripe.data.success)
            {
              const {session_url}=responseStripe.data
              dispatch(clearCart())
              window.location.replace(session_url)
            }
            else{
              toast.error(responseStripe.data.message)
            }
            break;
        
        default:
            break;
    }
  };

  

  return (
    <form className='flex flex-col justify-between gap-4 px-[4%] pt-5 lg:flex-row  sm:pt-14 min-h-[80vh]' onSubmit={handleFormSubmit}> 
      {/* ---------------------Left Side --------------------------- */}
      <div className='sm:w-[480px] w-full flex flex-col gap-10'>
        <div className='text-2xl font-semibold'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex flex-col w-full gap-4'>
          <div className='flex w-full gap-3'>
            <input
              type='text'
              placeholder='First name'
              name='firstName'
              value={formData.firstName}
              onChange={onChangeHandler}
              className='flex-1 px-3.5 py-1.5 rounded border border-gray-300'
              required
            />
            <input
              type='text'
              placeholder='Last name'
              name='lastName'
              value={formData.lastName}
              onChange={onChangeHandler}
              className='flex-1 px-3.5 py-1.5 rounded border border-gray-300'
              required
            />
          </div>

          <input
            type='email'
            placeholder='Email address'
            name='email'
            value={formData.email}
            onChange={onChangeHandler}
            className='px-3.5 py-1.5 rounded border border-gray-300'
            required
          />
          <input
            type='text'
            placeholder='Street'
            name='street'
            value={formData.street}
            onChange={onChangeHandler}
            className='px-3.5 py-1.5 rounded border border-gray-300'
            required
          />
          <div className='flex w-full gap-3'>
            <input
              type='text'
              placeholder='City'
              name='city'
              value={formData.city}
              onChange={onChangeHandler}
              className='flex-1 px-3.5 py-1.5 rounded border border-gray-300'
              required
            />
            <input
              type='text'
              placeholder='State'
              name='state'
              value={formData.state}
              onChange={onChangeHandler}
              className='flex-1 px-3.5 py-1.5 rounded border border-gray-300'
              required
            />
          </div>
          <div className='flex w-full gap-3'>
            <input
              type='number'
              placeholder='Zipcode'
              name='zipcode'
              value={formData.zipcode}
              onChange={onChangeHandler}
              className='flex-1 px-3.5 py-1.5 rounded border border-gray-300'
              required
            />
            <input
              type='text'
              placeholder='Country'
              name='country'
              value={formData.country}
              onChange={onChangeHandler}
              className='flex-1 px-3.5 py-1.5 rounded border border-gray-300'
              required
            />
          </div>
          <input
            type='number'
            placeholder='Phone No'
            name='phone'
            value={formData.phone}
            onChange={onChangeHandler}
            className='px-3.5 py-1.5 rounded border border-gray-300'
            required
          />
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
            <button className="lg:w-1/2 w-full py-2.5 mt-5 font-semibold text-white bg-black text-md  self-end" type='submit'>PLACE ORDER</button>
       </div>


    </form>
  )
}

export default PlaceOrder
