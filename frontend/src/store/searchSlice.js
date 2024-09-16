import { createSlice } from "@reduxjs/toolkit";


const searchSlice=createSlice({
    name:'search',
    initialState:{
        searchVisible:false,
        searchText:''
    },
    reducers:{
        setSearchVisible:(state,action)=>{
            state.searchVisible=action.payload
        },
        setSearchText:(state,action)=>{
            state.searchText=action.payload
        }
    }
})

export const {setSearchVisible,setSearchText}=searchSlice.actions
export default searchSlice.reducer
