import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { backendURL } from '../App'
import { clearCart } from '../store/cartSlice'
import { useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import axios from 'axios'
const Verify = () => {
const navigate=useNavigate()
const token=localStorage.getItem('token')
const [searchParams,setSearchParams]=useSearchParams()
const dispatch=useDispatch()
const success=searchParams.get('success')
const orderId=searchParams.get('orderId')
console.log(success,orderId)
const verifyPayment=async ()=>{
    try {
        if(!token)
        {
            return null
        }
        const response=await axios.post(backendURL+"/api/order/verifyStripe",{success,orderId},{headers:{token}})
        console.log(response.data)
        if(response.data.success)
        {
            dispatch(clearCart())
            navigate('/orders')
        }
        else{
            navigate('/cart')
        }
    } catch (error) {
        toast.error(error.message)
    }
}

useEffect(()=>{
    verifyPayment()
},[token])
  return (
    <div>
      Verify
    </div>
  )
}

export default Verify
