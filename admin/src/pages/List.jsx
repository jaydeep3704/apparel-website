import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'
import { RxCross2 } from "react-icons/rx";
import { useAuth } from '../context/AuthContext';
const List = () => {
  const[list,setList]=useState([])
  const {token}=useAuth()
  console.log(list)
  const fetchList=async()=>{
    try {
      const response=await axios.get(backendUrl+"/api/product/list")
      if(response.data.success)
      {
         setList(response.data.products)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct=async (id)=>{
      try {
          const response=await axios.post(backendUrl+"/api/product/remove",{id},{headers:{token}})
       
            toast.success(response.data.message)
            await fetchList()
        
         
      } catch (error) {
         console.log(error)
         toast.error(error.message)
      }
  }


  useEffect(()=>{
    fetchList()
  },[])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* --------------List Table Title ------------ */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* -----------Product List------------ */}
        {
          list.map((item)=>{
            return (<div key={item._id} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border text-sm'>
              <img src={item.images[0]} alt="" className='w-20'/>
              <p className='text-sm text-right cursor-pointer md:text-left'>{item.name}</p>
              <p>{item.category}</p>
              <p>₹ {item.price}</p>
              <p className='flex justify-center text-right cursor-pointer md:text-center'><RxCross2 className='text-lg ' onClick={()=>removeProduct(item._id)}/></p>
            </div>)
          })
        }
      </div>
    </>
  )
}

export default List
