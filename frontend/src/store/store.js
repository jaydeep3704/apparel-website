import { configureStore } from "@reduxjs/toolkit";
import searchReducer from './searchSlice'
import productReducer from "./productSlice"
import cartReducer from "./cartSlice"
import authReducer from './authSlice'
const store=configureStore({
    reducer:{
        search:searchReducer,
        product:productReducer,
        cart:cartReducer,
        auth:authReducer
    }
})

export default store