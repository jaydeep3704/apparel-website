import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart_items: [],
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, size } = action.payload;

      // Check if the product with the same ID and size is already in the cart
      const existingProduct = state.cart_items.find(item => item.id === id && item.size === size);

      if (existingProduct) {
        // Update quantity if the product already exists in the cart
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      } else {
        // Add new product to cart
        state.cart_items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const { id, size } = action.payload;

      // Filter out the product with the given id and size
      state.cart_items = state.cart_items.filter(product => !(product.id === id && product.size === size));
    },

    clearCart: (state) => {
      // Clear the cart
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

    

  },
});

// Export the actions
export const { addToCart, removeFromCart, clearCart, updateQuantity, setTotal } = cartSlice.actions;

// Default export of the reducer
export default cartSlice.reducer;
