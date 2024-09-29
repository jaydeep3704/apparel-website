import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { backendUrl } from '../App'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

const Add = () => {

  const {token}=useAuth()

  const [image1,setImage1]=useState(false)
  const [image2,setImage2]=useState(false)
  const [image3,setImage3]=useState(false)
  const [image4,setImage4]=useState(false)

  const[name,setName]=useState('')
  const[description,setDescription]=useState('')
  const[price,setPrice]=useState('')
  const[category,setCategory]=useState('Men')
  const[subCategory,setsubCategory]=useState('Topwear')
  const[bestseller,setBestseller]=useState(false)
  const[sizes,setSizes]=useState([])


  const submitHandler=async (e)=>{
    e.preventDefault()
    try {
        const formData=new FormData()
        formData.append("name",name)
        formData.append("description",description)
        formData.append("price",price)
        formData.append("category",category)
        formData.append("subCategory",subCategory)
        formData.append("bestSeller",bestseller)
        formData.append("sizes",JSON.stringify(sizes))
        image1 && formData.append("image1",image1)
        image2 && formData.append("image2",image2)
        image3 && formData.append("image3",image3)
        image4 && formData.append("image4",image4)
        if(sizes.length!==0)
        {
          const response=await axios.post(backendUrl+"/api/product/add",formData,{headers:{token}})
          toast.success(response.data.message)
          setName('')
          setPrice('')
          setDescription('')
          setCategory('Men')
          setsubCategory('Topwear')
          setBestseller(false)
          setSizes([])
          setImage1(false)
          setImage2(false)
          setImage3(false)
          setImage4(false)
        }
        else{
          toast.error("Sizes are not provided")
        }
    } catch (error) {
         console.log(error)
         toast.error(error)
    }
  }

  return (
    <form className='flex flex-col items-start w-full gap-3' onSubmit={submitHandler}>
        <div>
          <p className='mb-2'>Upload Image</p>
          <div className='flex gap-2' >
            <label htmlFor="image1">
              <img className='w-20' src={image1 ? URL.createObjectURL(image1) : assets.upload_area} alt="" />
              <input type="file" id='image1' hidden onChange={(e)=>setImage1(e.target.files[0])}/>
            </label>
        
            <label htmlFor="image2">
              <img  className='w-20'src={image2 ? URL.createObjectURL(image2):assets.upload_area} alt="" />
              <input type="file" id='image2' hidden onChange={(e)=>setImage2(e.target.files[0])}/>
            </label>
          
            <label htmlFor="image3">
              <img  className='w-20'src={image3 ? URL.createObjectURL(image3):assets.upload_area} alt="" />
              <input type="file" id='image3' hidden onChange={(e)=>setImage3(e.target.files[0])}/>
            </label>
         
            <label htmlFor="image4">
              <img  className='w-20'src={image4 ? URL.createObjectURL(image4):assets.upload_area} alt="" />
              <input type="file" id='image4' hidden onChange={(e)=>setImage4(e.target.files[0])}/>
            </label>
          </div>
        </div>

        <div className='w-full'>
            <p>Product Name</p>
            <input type="text" placeholder='Type Here' required className='w-full max-w-[500px] px-3 py-2' onChange={(e)=>setName(e.target.value)} value={name}/>
        </div>
        <div className='w-full'>
            <p>Product Description</p>
            <textarea type="text" placeholder='write content here' required className='w-full max-w-[500px] px-3 py-2' onChange={(e)=>setDescription(e.target.value)} value={description}/>
        </div>
        <div className='flex flex-col w-full gap-2 sm:flex-row sm:gap-8'>
           <div>
              <p className='mb-2'>Product Category</p>
              <select className='w-full px-3 py-2' onChange={(e)=>setCategory(e.target.value)}>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
           </div>
           
           <div>
              <p className='mb-2' >Product Subcategory</p>
              <select className='w-full px-3 py-2' onChange={(e)=>setsubCategory(e.target.value)}>
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
           </div>
           <div>
            <p className='mb-2'>Product Price</p>
            <input type="number" placeholder='25' className='w-full px-3 py-2 sm:w-[120px]' onChange={(e)=>setPrice(e.target.value)} value={price} required/>
           </div>
        </div>

        <div>
          <p className='mb-2'>Product Sizes</p>
          <div className='flex gap-3'>

            <div onClick={()=>setSizes(prev=>prev.includes("S")?prev.filter(item=>item!=="S"):[...prev,"S"] )}>
              <p className={`px-3 py-2 cursor-pointer  ${sizes.includes('S')?'bg-blue-400 text-white': 'bg-slate-200 text-black'}`}>S</p>
            </div>
            <div onClick={()=>setSizes(prev=>prev.includes("M")?prev.filter(item=>item!=="M"):[...prev,"M"] )}>
              <p className={`px-3 py-2 cursor-pointer  ${sizes.includes('M')?'bg-blue-400 text-white': 'bg-slate-200 text-black'}`}>M</p>
            </div>
            <div onClick={()=>setSizes(prev=>prev.includes("L")?prev.filter(item=>item!=="L"):[...prev,"L"] )}>
              <p className={`px-3 py-2 cursor-pointer  ${sizes.includes('L')?'bg-blue-400 text-white': 'bg-slate-200 text-black'}`}>L</p>
            </div>
            <div onClick={()=>setSizes(prev=>prev.includes("XL")?prev.filter(item=>item!=="XL"):[...prev,"XL"] )}>
              <p className={`px-3 py-2 cursor-pointer  ${sizes.includes('XL')?'bg-blue-400 text-white': 'bg-slate-200 text-black'}`}>XL</p>
            </div>
            <div onClick={()=>setSizes(prev=>prev.includes("XXL")?prev.filter(item=>item!=="XXL"):[...prev,"XXL"] )}>
              <p className={`px-3 py-2 cursor-pointer  ${sizes.includes('XXL')?'bg-blue-400 text-white': 'bg-slate-200 text-black'}`}>XXL</p>
            </div>

           


          </div>
        </div>

        <div className='flex gap-2 mt-2'>
          <input type="checkbox" id='bestseller' onChange={()=>setBestseller(prev=>!prev)}/>
          <label htmlFor="bestseller" className='cursor-pointers'>Add to bestseller</label>
        </div>

        <button type='submit' className='py-3 mt-4 text-white bg-black w-28'>Add</button>
    </form>
  )
}

export default Add
