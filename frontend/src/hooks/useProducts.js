
import { useState,useEffect } from "react";

const useProducts=()=>{
    const [products,setProducts]=useState([])

    const fetchProducts = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/product/list");
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