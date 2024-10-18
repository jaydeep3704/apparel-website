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

    updateCart: (state, action) => {
      state.cart_items = action.payload;
    },

    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.cart_items = state.cart_items.filter(item => !(item._id === id && item.size === size));
      console.log(state.cart_items);
    },

    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      console.log(id,size,quantity)
      const existingProduct = state.cart_items.find(item => item._id === id && item.size === size);
      if (existingProduct) {
        existingProduct.quantity = quantity;
      }
    },

    setTotal: (state, action) => {
      const  products  = action.payload; // Expecting products to be an array
      let total = 0;

      state.cart_items.forEach(item => {
        const product =products && products.find(prod => prod._id === item._id);
        if (product) {
          total += product.price * item.quantity; // Calculate total based on quantity and product price
        }
      });

      state.totalPrice = total; // Set the total price in the state
    },

    // New action to set cart items from server
    setUserCart: (state, action) => {
      state.cart_items = action.payload;
      state.totalPrice = action.payload.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    clearCart:(state,action)=>{
      state.cart_items.length=0
    }
  },
});

// Export the actions
export const { 
  addToCart, 
  removeFromCart, 
  clearCart, 
  updateQuantity, 
  setTotal, 
  setUserCart,
  updateCart 
} = cartSlice.actions;

// Default export of the reducer
export default cartSlice.reducer;
