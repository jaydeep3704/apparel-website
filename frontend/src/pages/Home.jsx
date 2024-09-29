import React from 'react'

import ProductGrid from '../components/ProductGrid'
import Ourpolicy from '../components/Ourpolicy'
import NewsLetter from '../components/NewsLetter'
import BannerCarousel from '../components/BannerCarousel'

const Home = () => {



  return (
    <div className='px-[4%]'>
        <BannerCarousel/>
       
  
        
        <ProductGrid />
        <Ourpolicy/>
        <NewsLetter/>
    </div>
  )
}

export default Home
