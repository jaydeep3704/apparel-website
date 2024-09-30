import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart_items: [],
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, size, quantity } = action.payload;
      const existingProduct = state.cart_items.find(item => item.id === id && item.size === size);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.cart_items.push({ ...action.payload, quantity });
      }
    },

    updateCart:(state,action)=>{
      state.cart_items=action.payload
    },
    
    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.cart_items = state.cart_items.filter(product => !(product.id === id && product.size === size));
    },

    clearCart: (state) => {
      state.cart_items = [];
      state.totalPrice = 0;
    },

    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const existingProduct = state.cart_items.find(item => item.id === id && item.size === size);
      if (existingProduct) {
        existingProduct.quantity = quantity;
      }
    },

    setTotal: (state) => {
      let total = 0;
      state.cart_items.forEach(item => {
        total += item.price * (item.quantity || 1);
      });
      state.totalPrice = total;
    },

    // New action to set cart items from server
    setUserCart: (state, action) => {
      state.cart_items = action.payload;
      state.totalPrice = action.payload.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
});

// Export the actions
export const { 
  addToCart, 
  removeFromCart, 
  clearCart, 
  updateQuantity, 
  setTotal, 
  setUserCart ,
  updateCart
} = cartSlice.actions;

// Default export of the reducer
export default cartSlice.reducer;
