
import { useState,useEffect } from "react";

const useProducts=()=>{
    const [products,setProducts]=useState([])

    const fetchProducts = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/list`);
          const json = await res.json();
          setProducts(json.products)
         
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        fetchProducts();
      }, []);
    
    return products
}

export {useProducts}