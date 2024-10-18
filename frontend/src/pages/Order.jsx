import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { backendURL } from '../App'
const Order = () => {

   
    const [orderData,setOrderData]=useState([])
    const token=localStorage.getItem('token')
    
    const fetchOrders=async()=>{
        try {
            if(!token)
            {
                return null
            }
            const response=await axios.post(backendURL+'/api/order/userorders',{},{headers:{token}})
            if(response.data.success)
            {
                let allOrdersItem=[]
                response.data.orders.map((order)=>{
                    order.items.map((item)=>{
                        item['status']=order.status
                        item['payment']=order.payment
                        item['paymentMethod']=order.paymentMethod
                        item['date']=order.date
                        allOrdersItem.push(item)
                    })
                })
                setOrderData(allOrdersItem)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchOrders()
    },[token])

    console.log(orderData)


   


  return (
    <div className='px-[4%]'>
       <div className='text-2xl font-medium'>
            <Title text1={'MY'} text2={'ORDERS'}/>
       </div>

       <div>
        {   orderData.length>0 ?
            orderData.map((item,index)=>{
                let date=new Date(item.date)
                return(
                    <div key={index} className='flex flex-col gap-4 py-4 text-gray-700 border-t border-b md:flex-row md:itmes-center md:justify-between'>
                            <div className='flex items-start gap-6 text-sm'>
                                <img src={item.images[0]} className='w-16 sm:w-20' alt="" />
                                <div>
                                    <p className='text-base font-medium'>{item.name}</p>
                                    <div className='flex items-center gap-3 mt-3 text-base text-gray-700'>
                                        <p className='text-lg'>Price: ₹ {item.price}</p>
                                        <p>Quantitiy: {item.quantity}</p>
                                        <p>Size: {item.size}</p>
                                    </div>
                                    <p className='mt-1'>Date <span className='text-gray-400'>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</span></p>
                                    <p className='mt-1 text-gray-400'>Payment Method : {item.paymentMethod}</p>
                                    
                                </div>
                            </div>
                            <div className='flex items-center justify-between md:w-1/2'>
                                <div className='flex items-center gap-2'>
                                    <p className='h-2 bg-green-500 rounded-full min-w-2'></p>
                                    <p>{item.status}</p>
                                </div>
                                <button className='px-4 py-2 text-sm font-medium border rounded-lg'>Track Order</button>
                            </div>
                    </div>
                )
            }):<div className='flex items-center justify-center w-full h-[50vh] text-3xl text-gray-300'>You Havent Made any Orders yet</div>
        }
       </div>
    </div>
  )
}

export default Order
