import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './features/categories/categoriesSlice';
import cartReducer from './features/cart/cartSlice';
 
const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    cart: cartReducer,
  },
});
 
export default store;