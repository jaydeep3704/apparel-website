import { configureStore } from "@reduxjs/toolkit";
import searchReducer from './searchSlice'
import productReducer from "./productSlice"
import cartReducer from "./cartSlice"
const store=configureStore({
    reducer:{
        search:searchReducer,
        product:productReducer,
        cart:cartReducer
    }
})

export default store