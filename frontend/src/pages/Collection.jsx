import React,{useEffect,useState} from "react";
import Product from "../components/Product";




const Collection = () => {

  const [products,setProducts]=useState([])
  const [filteredProducts,setFilteredProducts]=useState([])

  const fetchProductInfo=async ()=>{
    try {
      const res = await fetch("https://api.foreverbuy.in/api/product/list");
      const json = await res.json();
      const products = json.products;
      setProducts(products)
     } catch (error) {
      console.log("Collection Fetch ",error)
     }
  }


  useEffect(()=>{
      fetchProductInfo()
  },[])


  return (
    <div className="flex flex-col justify-between gap-10 px-5 mt-10 md:px-40 sm:px-10 md:flex-row">
      {/* filters */}
      <div className="flex flex-col gap-5 md:w-[20%] w-full">
        <p className="mb-3 text-xl font-medium uppercase">Filters</p>
        <div className="w-full py-5 pl-5 border border-gray-300">
          <p className="text-lg font-medium uppercase">Categories</p>
          
          <div className="flex flex-col gap-2 mt-5">
            <label htmlFor="" className="flex items-center gap-2">
              <input type="checkbox" />
              Men
            </label>
            <label htmlFor="" className="flex items-center gap-2">
              <input type="checkbox" />
              women
            </label>
            <label htmlFor="" className="flex items-center gap-2">
              <input type="checkbox" />
              kids
            </label>
          </div>
        </div>
        <div className="w-full py-5 pl-5 border border-gray-300">
          <p className="text-lg font-medium uppercase">Type</p>
          <div className="flex flex-col gap-2 mt-5">
            <label htmlFor="" className="flex items-center gap-2">
              <input type="checkbox" />
              Topwear
            </label>
            <label htmlFor="" className="flex items-center gap-2">
              <input type="checkbox" />
              Bottomwear
            </label>
            <label htmlFor="" className="flex items-center gap-2">
              <input type="checkbox" />
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
            <select className="px-3 py-2 border border-gray-300">
              <option value="relevant">Sort By : Relevant</option>
              <option value="lowtohigh">Sort By : Low to High</option>
              <option value="hightolow">Sort By : High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Container */}
        <div className="grid grid-cols-2 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
          {products.map((product) => {
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
