import React from 'react'
import ShimmerCard from './ShimmerCard'
const ProductGridShimmer = () => {
  return (
    <div className='w-full my-10'>
        <div className='grid grid-cols-2 gap-4 gird sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6'>
            <ShimmerCard/>
            <ShimmerCard/>
            <ShimmerCard/>
            <ShimmerCard/>
            <ShimmerCard/>
            <ShimmerCard/>
            <ShimmerCard/>
            <ShimmerCard/>
            <ShimmerCard/>
            <ShimmerCard/>
        </div>
    </div>
  )
}

export default ProductGridShimmer
