import React, { useEffect, useState } from "react";
import Product from "./Product";
import Title from "./Title";
import { useDispatch } from "react-redux";
import { setProducts } from "../store/productSlice";
import ProductGridShimmer from "./ProductGridShimmer";
const ProductGrid = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const dispatch=useDispatch()
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/product/list");
      const json = await res.json();
      const products = json.products;
      console.log(products)
      dispatch(setProducts(products))
      const bestSeller = products.filter(
        (product) => product.bestSeller == true
      );
      setBestSellerProducts(bestSeller);
      setLatestProducts(products.slice(0, 8));
     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    // BestSeller
    <div className="w-full">
      <div className="w-full my-10">
        <div className="flex justify-center py-8 text-3xl text-center">
          <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        </div>
        <div className="grid justify-center grid-cols-2 mx-auto mt-10 mb-5 sm:grid-cols-2 w-fit lg:grid-cols-4 md:grid-cols-3 justify-items-center gap-y-20 gap-x-14">
          {latestProducts.map((product) => {
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
      <div className="w-full my-10">
        <div className="flex justify-center py-8 text-3xl text-center">
          <Title text1={"BEST"} text2={"SELLERS"} />
        </div>
        <div className="grid justify-center grid-cols-2 mx-auto mt-10 mb-5 sm:grid-cols-2 w-fit lg:grid-cols-4 md:grid-cols-3 justify-items-center gap-y-20 gap-x-14">
          {bestSellerProducts.map((product) => {
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
    </div>
  );
};

export default ProductGrid;
