import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector ,useDispatch} from 'react-redux'

import { setTotal } from '../store/cartSlice'
import Title from './Title'
const CartTotal = () => {

const navigate=useNavigate()
const handleCheckout=()=>{
    navigate('/order')
  }



  const deliveryFee=20
  const cartItems = useSelector((store) => store.cart.cart_items);
  const total=useSelector((store)=>store.cart.totalPrice)
  const dispatch=useDispatch()  
  useEffect(()=>{
     dispatch(setTotal())
  },[cartItems])
  
  return (
   
    <div className="flex w-full ">
    <div className="flex flex-col w-full ">
      <div className="flex items-center gap-3 py-5 text-2xl font-medium">
        <Title text1={'CART'} text2={'TOTALS'}/>
      </div>
       <p className="flex justify-between py-2 border-b border-gray-300"><span>Subtotal</span><span>${total}</span></p>
       <p className="flex justify-between py-2 border-b border-gray-300"><span>Delivery Fee</span><span>${deliveryFee}</span></p>
       <p className="flex justify-between py-2 font-medium "><span>Total</span><span>${total+deliveryFee}</span></p>
       
    </div>
  </div>
  )
}

export default CartTotal
