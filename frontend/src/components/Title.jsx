import React from 'react'

const Title = ({text1,text2,className}) => {
  return (
    <div className={`flex items-center gap-3   `}>
        <span className='text-gray-400'>{text1}</span>
        <span className='text-gray-800'>{text2}</span>
        <span className='block w-[40px] h-[2px] bg-black'></span>
    </div>
  )
}

export default Title
