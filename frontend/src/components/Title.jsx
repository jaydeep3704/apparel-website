import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='flex items-center justify-center w-full gap-3 text-4xl font-[400]'>
        <span className='text-gray-600'>{text1}</span>
        <span className='text-gray-800'>{text2}</span>
        <span className='block w-[50px] h-[2px] bg-black'></span>
    </div>
  )
}

export default Title
