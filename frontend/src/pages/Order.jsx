import React from 'react'
import Title from '../components/Title'
import { useSelector } from 'react-redux'
const Order = () => {

    const products=useSelector((store)=>store.product.products)


  return (
    <div className='pt-16 lg:px-40 sm:px-10'>
       <div className='text-2xl font-medium'>
            <Title text1={'MY'} text2={'ORDERS'}/>
       </div>

       <div>
        {
            products.slice(0,3).map((item,index)=>{
                return(
                    <div key={index} className='flex flex-col gap-4 py-4 text-gray-700 border-t border-b md:flex-row md:itmes-center md:justify-between'>
                            <div className='flex items-start gap-6 text-sm'>
                                <img src={item.image[0]} className='w-16 sm:w-20' alt="" />
                                <div>
                                    <p className='text-base font-medium'>{item.name}</p>
                                    <div className='flex items-center gap-3 mt-3 text-base text-gray-700'>
                                        <p className='text-lg'>Price: $ {item.price}</p>
                                        <p>Quantitiy: 1</p>
                                        <p>Size: M</p>
                                    </div>
                                    <p className='mt-2'>Date <span className='text-gray-400'>Sept 14, 2024</span></p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between md:w-1/2'>
                                <div className='flex items-center gap-2'>
                                    <p className='h-2 bg-green-500 rounded-full min-w-2'></p>
                                    <p>Ready to Ship</p>
                                </div>
                                <button className='px-4 py-2 text-sm font-medium border rounded-lg'>Track Order</button>
                            </div>
                    </div>
                )
            })
        }
       </div>
    </div>
  )
}

export default Order
