import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setSearchVisible,setSearchText } from '../store/searchSlice'
import SearchIcon from "../assets/icons/search_icon.png"
import CrossIcon from "../assets/icons/cross_icon.png"
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
const SearchBar = () => {

const dispatch=useDispatch()
const location=useLocation()
const [search,setSearch]=useState('')
useEffect(()=>{
    if(location.pathname.includes('/collection'))
    {
        dispatch(setSearchVisible(true))
    }
    else{
        dispatch(setSearchVisible(false))
    }
},[location])

useEffect(()=>{
    dispatch(setSearchText(search))
},[search])




 const searchVisible=useSelector((store)=>store.search.searchVisible)
  return <AnimatePresence>
  {searchVisible &&
  <motion.div className='w-full' initial={{y:-100}} animate={{y:0}} transition={{ease:'easeInOut'}} exit={{y:-100}} >
        <div className='flex items-center justify-center gap-5 px-10 py-5 mx-[4%] bg- '>
              <div className='flex items-center w-full px-5 bg-white border border-gray-400 md:w-1/2 rounded-3xl'>
                 <input type="text" placeholder='Search' className='w-full py-2 border-none outline-none' value={search} onChange={(e)=>setSearch(e.target.value)}/>
                 <img src={SearchIcon} alt="" className='w-5 h-5' />
              </div>
              <img src={CrossIcon} alt="" className='w-4 h-4' onClick={()=>dispatch(setSearchVisible(false))}/>
        </div>
  </motion.div>}
  </AnimatePresence>
}

export default SearchBar
