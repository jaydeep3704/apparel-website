import React from 'react'

const ShimmerCard = () => {
  return (
    <div className='bg-slate-100 animate-pulse h-[350px] rounded-2xl p-5'>
        <div className='rounded-xl bg-slate-200 h-[200px]'>

        </div>
        <div className='flex flex-col gap-3 mt-4'>
            <span className='block w-3/4 h-2 bg-slate-200'></span>
            <span className='block w-1/2 h-2 bg-slate-200'></span>
            <span className='block w-1/3 h-2 bg-slate-200'></span>
        </div>
    </div>
  )
}

export default ShimmerCard
