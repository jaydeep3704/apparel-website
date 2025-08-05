import React, { useEffect, useState } from "react";
import Product from "./Product";
import Title from "./Title";
import { useSelector } from "react-redux";
import ProductGridShimmer from "./ProductGridShimmer";

const ProductGrid = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const products = useSelector((store) => store.product.products);
  const loading = useSelector((store) => store.product.loading);

  useEffect(() => {
    if (products) {
      setLatestProducts(products.slice(0, 8));
      setBestSellerProducts(
        products.filter((product) => product.bestSeller === true).slice(0,4)
      );
    }
  }, [products]);

  if (!products) {
    return <ProductGridShimmer />;
  }

  return (
    // BestSeller
    <div className="w-full">
      <div className="w-full my-10">
        <div className="flex justify-center py-8 text-3xl text-center">
          <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        </div>
        <div className="grid justify-center grid-cols-2 mx-auto mt-10 mb-5 sm:grid-cols-2 w-fit lg:grid-cols-4 md:grid-cols-3 justify-items-center gap-6">
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
        <div className="grid justify-center grid-cols-2 mx-auto mt-10 mb-5 sm:grid-cols-2 w-fit lg:grid-cols-4 md:grid-cols-3 justify-items-center gap-6">
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
