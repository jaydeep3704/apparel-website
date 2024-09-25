import React, { useState } from 'react'
import Logo from "../assets/logo/logo.png"
import { motion,AnimatePresence } from 'framer-motion';
import { FaUser ,FaShoppingCart,FaSearch} from "react-icons/fa";
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { RxCross2 } from "react-icons/rx";
import { CiMenuBurger } from "react-icons/ci";
import profile_icon from "../assets/icons/profile_icon.png"
import cart_icon from "../assets/icons/cart_icon.png"
import menu_icon from "../assets/icons/menu_icon.png"
import search_icon from "../assets/icons/search_icon.png"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchVisible } from '../store/searchSlice';
const Navbar = () => {
  
  const [openMenu,setOpenMenu]=useState(false)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const cart_items=useSelector((store)=>store.cart.cart_items)
  let total_items=0
  cart_items.forEach((item)=>{
      total_items+=item.quantity
  })


  return (
    <>
    <motion.div  initial={{y:-100,opacity:0}} animate={{y:0,opacity:1}}   transition={{duration:0.4,ease:"easeIn"}}  whileInView={{opacity:1}}   className='sticky top-0 left-0 right-0 z-10 flex items-center justify-between w-full h-20 px-5 bg-white lg:px-40 sm:px-10' >

      <div className='flex items-center justify-between w-full pb-3 border-b border-gray-300'>
      <img src={Logo} alt="" className='cursor-pointer h-9 md:h-12' onClick={()=>navigate('/')}/>
       
       <ul className='hidden lg:flex md:text-lg md:capitalize md:gap-7'>
         <li><Link to={'/'}>home</Link></li>
         <li><Link to={'/collection'}>collection</Link></li>
         <li><Link to={'/about'}>about</Link></li>
         <li><Link to={'/contact'}>contact</Link></li>
       
       </ul>
       <div className="flex gap-5 cursor-pointer md:gap-8">
        <Link to={'/login'}> <img src={profile_icon} alt="" className='w-5 h-5'/></Link>
       
       <Link to={'/collection'}>
       <img src={search_icon} alt="" className='w-5 h-5' onClick={()=>{
        dispatch(setSearchVisible(true))
       }}/>
       </Link>
       
       <div className='relative'>
        <Link to={'/cart'}> <img src={cart_icon} alt="" className='w-5 h-5'/></Link>
       <span className=' flex items-center justify-center w-[18px] h-[18px] text-[10px] text-white bg-black rounded-full font-prata absolute bottom-[-50%] right-[-50%]'>{total_items}</span>
       </div>
       
       
       </div>
       <img src={menu_icon} className='w-5 h-5 lg:hidden' onClick={()=>{setOpenMenu((prev)=>!prev)}}/>
      </div>
     
    </motion.div>

    <AnimatePresence >
   {openMenu &&<motion.div className='fixed top-0 left-0 right-0 z-50 h-full bg-white shadow-lg ' initial={{y:"-80px" , opacity:0}} animate={{y:0 ,opacity:1}} transition={{type:"tween",duration:0.3,ease:"easeInOut"}} exit={{y:"-80px",opacity:0}}>
    <RxCross2 className='absolute text-2xl right-10 top-5' onClick={()=>{setOpenMenu(false) }}/>
    <ul className='flex flex-col px-10 py-20 text-3xl text-right uppercase gap-7 '>
        <li className='transition duration-300 hover:text-gray-600 '><Link to={'/'}>home</Link></li>
        <li className='transition duration-300 hover:text-gray-600'><Link to={'/collection'}>collection</Link></li>
        <li className='transition duration-300 hover:text-gray-600'><Link to={'/about'}>about</Link></li>
        <li className='transition duration-300 hover:text-gray-600'><Link to={'/contact'}>contact</Link></li>
       
      </ul>
    </motion.div>}
    </AnimatePresence>

    </>
  )
}

export default Navbar
