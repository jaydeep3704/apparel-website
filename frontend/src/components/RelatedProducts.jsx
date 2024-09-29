import React, { useEffect, useState } from 'react'
import Product from './Product';
import Title from './Title';
const RelatedProducts = ({products,category,subCategory}) => {
 
  let productCp=products
  const [relatedProducts,setRelatedProducts]=useState([])
  useEffect(()=>{
        productCp=products.filter((product)=>{return product.category===category})
        productCp=productCp.filter((product)=>{return product.subCategory===subCategory})
        setRelatedProducts(productCp.slice(0,4))
  },[products])

  return (
    <div className="w-full my-10">
    <div className="flex justify-center w-full py-8 text-3xl">
      <Title text1={"RELATED"} text2={"PRODUCTS"} />
    </div>
    <div className="grid justify-center grid-cols-1 mx-auto mt-10 mb-5 sm:grid-cols-2 w-fit lg:grid-cols-4 md:grid-cols-3 justify-items-center gap-y-20 gap-x-10">
      {relatedProducts.map((product) => {
        return (
          <Product
            price={product.price}
            image={product.images[0]}
            key={product._id}
            id={product._id}
            name={product.name}
            
          />
        );
      })}
    </div>
  </div>
  )
}

export default RelatedProducts
