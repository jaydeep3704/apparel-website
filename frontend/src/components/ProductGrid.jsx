import React, { useEffect, useState } from "react";
import Product from "./Product";
import Title from "./Title";

const ProductGrid = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://api.foreverbuy.in/api/product/list");
      const json = await res.json();
      const products = json.products;
      const bestSeller = products.filter(
        (product) => product.bestseller == true
      );
      setBestSellerProducts(bestSeller);
      setLatestProducts(products.slice(0, 10));
     
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
        <div className="py-8 text-3xl text-center">
          <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        </div>
        <div className="grid grid-cols-2 gap-4 gird sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
          {latestProducts.map((product) => {
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
      <div className="w-full my-10">
        <div className="py-8 text-3xl text-center">
          <Title text1={"BEST"} text2={"SELLERS"} />
        </div>
        <div className="grid grid-cols-2 gap-4 gird sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
          {bestSellerProducts.map((product) => {
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

export default ProductGrid;
