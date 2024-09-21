import React, { useEffect, useState } from 'react'
import Product from './Product';
import Title from './Title';
const RelatedProducts = ({products,category,subCategory}) => {
 
  let productCp=products
  const [relatedProducts,setRelatedProducts]=useState([])
  useEffect(()=>{
        productCp=products.filter((product)=>{return product.category===category})
        productCp=productCp.filter((product)=>{return product.subCategory===subCategory})
        setRelatedProducts(productCp.slice(0,5))
  },[products])

  return (
    <div className="w-full my-10">
    <div className="py-8 text-3xl text-center">
      <Title text1={"RELATED"} text2={"PRODUCTS"} />
    </div>
    <div className="grid grid-cols-2 gap-4 gird sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
      {relatedProducts.map((product) => {
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
  )
}

export default RelatedProducts
