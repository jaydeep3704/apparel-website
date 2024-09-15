import React from 'react'
import prodImg from '../assets/p_img8.png'
import { Link } from 'react-router-dom'

const Product = ({id,image,name,price}) => {

  return (
   <Link className='text-gray-700 cusor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden'>
          <img src={image[0]} alt="" className='transition ease-in-out hover:scale-110'/>
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='pt-3 pb-1 text-sm font-medium'>$ {price}</p>
   </Link>
  )
}

export default Product
