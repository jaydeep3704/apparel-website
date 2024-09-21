
import { useState,useEffect } from "react";

const useProducts=()=>{
    const [products,setProducts]=useState([])

    const fetchProducts = async () => {
        try {
          const res = await fetch("https://api.foreverbuy.in/api/product/list");
          const json = await res.json();
          const products = json.products;
          setProducts(products)
         
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        fetchProducts();
      }, []);
    
    return {products}
}

export {useProducts}