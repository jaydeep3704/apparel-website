import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import star from "../assets/icons/star_icon.png"
import dullStar from "../assets/icons/star_dull_icon.png"
const SingleProduct = () => {
  const { id } = useParams();
  const products = useSelector((store) => store.product.products);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size,setSize]=useState("");
  const fetchProductInfo = async () => {
    try {
      const product = products.filter((product) => {
        return product._id === id;
      })[0];
      setProductData(product)
      setImage(product.image[0])
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductInfo();
  }, []);

  return productData ? 
  <div className="w-full px-5 pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100 md:px-40 sm:px-10 ">
    {/* Product Data  */}
    <div className="flex flex-col h-full gap-12 sm:gap-12 sm:flex-row">
        {/* product images  */}
       <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row ">
          <div className="flex justify-between sm:flex-col sm:justify-normal sm:w-[18.7%] w-full">
              {
                productData.image.map((item,index)=>{
                  return <img key={index} src={item} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" onClick={()=>setImage(item)}/>
                })
              }
          </div>
          <div className="w-full sm:w-[80%]">
                <img src={image} alt="" className="w-full h-auto" />
          </div>
       </div>

      {/* product info */}
      <div className="">
         <h1 className="mt-2 text-2xl font-medium">{productData.name}</h1>
         <div className="flex items-center gap-1 mt-2">
            <img src={star} alt="" className="w-3 " />
            <img src={star} alt="" className="w-3 " />
            <img src={star} alt="" className="w-3 " />
            <img src={star} alt="" className="w-3 " />
            <img src={dullStar} alt="" className="w-3 " />
            <p className="pl-2">(122)</p>
         </div>
         <p className="mt-5 text-3xl font-medium">$ {productData.price}</p>
         <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
         <div className="flex flex-col gap-4 mt-5 text-lg ">
              <p className="font-medium">Select Size</p>
              <div className="flex gap-1">
              {
                productData.sizes.map((item,index)=>{
                  return(
                    <button className={`border py-2 px-4 bg-gray-100 ${item==size ? 'border-orange-500':''}`} onClick={()=>setSize(item)}>{item}</button>
                  )
                })
              }
              </div>
              <button className="w-40 py-2 mt-2 text-center text-white bg-black border-none oultine-none">ADD TO CART</button>
              <div className="flex flex-col gap-2 py-5 mt-5 text-sm text-gray-500 border-t border-gray-300">
                  <p>100% Original product.</p>
                  <p>Cash on delivery is available on this product.</p>
                  <p>Easy return and exchange policy within 7 days.</p>
              </div>
         </div>
      </div>
    </div>
    <div className="mt-20">
            <div className="flex"> 
                <b className="px-5 py-3 text-sm border">Description</b>
                <p className="px-5 py-3 text-sm border">Reviews (122)</p>
            </div>
            <div className="w-full p-5 border border-gray-300">
                <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
                <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
            </div>
    </div>

    {/* Related Products */}

  </div> : 
  <div></div>;
};

export default SingleProduct;
