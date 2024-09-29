
import { useState,useEffect } from "react";
import axios from "axios";
const useProducts=()=>{
    const [products,setProducts]=useState([])

    const fetchProducts = async () => {
        try {
          const res = await axios.get("https://localhost:5000/api/product/list");
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