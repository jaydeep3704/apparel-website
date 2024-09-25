import React,{useEffect,useState} from "react";
import Product from "../components/Product";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProducts } from "../store/productSlice";


const Collection = () => {

  const [products,setProducts]=useState([])
  const [filteredProducts,setFilteredProducts]=useState([])
  const [categories,setCategories]=useState([])
  const [subcategories,setSubcategories]=useState([])
  const searchText=useSelector((store)=>store.search.searchText)
 const dispatch=useDispatch()
  const fetchProductInfo=async ()=>{
    try {
      const res = await fetch("https://api.foreverbuy.in/api/product/list");
      const json = await res.json();
      const products = json.products;

      setProducts(products)
      setFilteredProducts(products)
      dispatch(setProducts(products))
     } catch (error) {
      console.log("Collection Fetch ",error)
     }
  }


  const toggleCategory=(e)=>{
    if(e.target.checked)
    {
      setCategories((prev)=>[...prev,e.target.value])
    }
    else{
      const categoryList=categories.filter((category)=>{
        return category!==e.target.value
      })
      setCategories(categoryList)
    }
  }
  const toggleSubCategory=(e)=>{
    if(e.target.checked)
    {
      setSubcategories((prev)=>[...prev,e.target.value])
    }
    else{
      const subcategoryList=subcategories.filter((subcategory)=>{
        return subcategory!==e.target.value
      })
      setSubcategories(subcategoryList)
    }
  }


 const applyFilter=()=>{
      let productsCopy=products.slice()
      if(searchText!=="")
      {
        productsCopy=productsCopy.filter((product)=>{return product.name.toLowerCase().includes(searchText.toLowerCase())})
      }
      if(categories.length>0)
      {
         productsCopy=productsCopy.filter((product)=>{return categories.includes(product.category)})
      }
      if(subcategories.length>0)
      {
        productsCopy=productsCopy.filter((product)=>{return subcategories.includes(product.subCategory)})
      }
      setFilteredProducts(productsCopy)
 }




  useEffect(()=>{
      fetchProductInfo()
  },[])

  useEffect(()=>{
    applyFilter()
  },[categories,subcategories,searchText])

 


  const sortProducts=(e)=>{
    console.log(e.target.value)
     let fpCopy=filteredProducts.slice()

     switch(e.target.value)
     {
      case 'lowtohigh':
           const sortbylowtohigh=fpCopy.sort((product1,product2)=>product1.price-product2.price)
           setFilteredProducts(sortbylowtohigh)
           break;
      case 'hightolow':
           const sortbyhightolow=fpCopy.sort((product1,product2)=>product2.price-product1.price)
           setFilteredProducts(sortbyhightolow)
           break;
      default:
           applyFilter()
           break;
     }
  }
 





  return (
    <div className="flex flex-col justify-between gap-10 px-5 mt-10 lg:px-40 sm:px-10 md:flex-row">
      {/* filters */}
      <div className="flex flex-col gap-5 lg:w-[20%] w-full">
        <p className="mb-3 text-xl font-medium uppercase">Filters</p>
        <div className="w-full py-5 pl-5 border border-gray-300">
          <p className="text-lg font-medium uppercase">Categories</p>
          
          <div className="flex flex-col gap-2 mt-5">
            <label htmlFor="" className="flex items-center gap-2">
              <input type="checkbox" onChange={toggleCategory} value={'Men'}/>
              Men
            </label>
            <label htmlFor="" className="flex items-center gap-2">
              <input type="checkbox" onChange={toggleCategory} value={'Women'}/>
              women
            </label>
            <label htmlFor="" className="flex items-center gap-2">
              <input type="checkbox" onChange={toggleCategory} value={'Kids'}/>
              Kids
            </label>
          
          </div>
        </div>
        <div className="w-full py-5 pl-5 border border-gray-300">
          <p className="text-lg font-medium uppercase">Type</p>
          <div className="flex flex-col gap-2 mt-5">
            <label htmlFor="" className="flex items-center gap-2">
              <input type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/>
              Topwear
            </label>
            <label htmlFor="" className="flex items-center gap-2"  >
              <input type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/>
              Bottomwear
            </label>
            <label htmlFor="" className="flex items-center gap-2">
              <input type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />
              Winterwear
            </label>
          </div>
        </div>
      </div>
      <div className="md:w-[78%]">

        <div className="flex justify-between">
          <div
            className={`flex items-center  w-full gap-3 md:text-2xl text-xl font-[400]`}
          >
            <span className="text-gray-600">ALL</span>
            <span className="text-gray-800">COLLECTIONS</span>
            <span className="block w-[50px] h-[2px] bg-black"></span>
          </div>
          <div>
            <select className="px-3 py-2 border border-gray-300" onChange={sortProducts}>
              <option value="relevant">Sort By : Relevant</option>
              <option value="lowtohigh">Sort By : Low to High</option>
              <option value="hightolow">Sort By : High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Container */}
        <div className="grid grid-cols-2 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
          {filteredProducts.map((product) => {
            return (
              <Product
                price={product.price}
                image={product.image}
                key={product._id}
                id={product._id}
                name={product.name}
              />
            );
          })}
        </div>

      </div>

      

    </div>
  );
};

export default Collection;
