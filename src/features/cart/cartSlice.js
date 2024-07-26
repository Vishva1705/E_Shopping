import { createSlice } from '@reduxjs/toolkit';
 
const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = state.find(item => item.idMeal === action.payload.idMeal);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => state.filter(item => item.idMeal !== action.payload.idMeal),
    updateQuantity: (state, action) => {
      const item = state.find(item => item.idMeal === action.payload.idMeal);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: () => [],
  },
});
 
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;