import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.items.find(item => item.idMeal === action.payload.idMeal);
      if (itemExists) {
        itemExists.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.idMeal !== action.payload);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.idMeal === action.payload.idMeal);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectItemQuantity = (idMeal) => (state) => {
  const item = state.cart.items.find(item => item.idMeal === idMeal);
  return item ? item.quantity : 0;
};

export default cartSlice.reducer;
