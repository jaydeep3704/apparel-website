import React from 'react'
import Banner from '../components/Banner'
import ProductGrid from '../components/ProductGrid'
import Ourpolicy from '../components/Ourpolicy'
import NewsLetter from '../components/NewsLetter'
const Home = () => {
  return (
    <div className='px-[4%]'>
        <Banner/>
        <ProductGrid />
        <Ourpolicy/>
        <NewsLetter/>
    </div>
  )
}

export default Home
