import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"




export const fetchProductData=createAsyncThunk('product/data',async ()=>{
  
    const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/list`)
  
    const data=await response.data.products
    return data
})


const productSlice=createSlice({
    name:'product',
    initialState:{
        products:null,
        loading:false,
        error:null
    },
    reducers:{
        setProducts:(state,action)=>{
            state.products=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProductData.pending,(state,action)=>{
            state.loading=true
        });
        builder.addCase(fetchProductData.fulfilled,(state,action)=>{
            state.products=action.payload
            state.loading=false
        });
        builder.addCase(fetchProductData.rejected,(state,action)=>{
            state.error="failed to fetch product data"
            state.loading=false
        });
    }
})

export const {setProducts}=productSlice.actions
export default productSlice.reducer