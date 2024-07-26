import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import categoriesReducer from './features/categories/categoriesSlice';
import ordersReducer from './features/orders/ordersSlice';


const loadState = () => {
  try {
    const cart = localStorage.getItem('cart');
    const orders = localStorage.getItem('orders');
    return {
      cart: cart ? JSON.parse(cart) : { items: [] },
      orders: orders ? JSON.parse(orders) : { orders: [] },
    };
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
    return { cart: { items: [] }, orders: { orders: [] } };
  }
};


const saveState = (state) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    localStorage.setItem('orders', JSON.stringify(state.orders));
  } catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoriesReducer,
    orders: ordersReducer,
  },
  preloadedState: loadState(), 
});


store.subscribe(() => {
  saveState(store.getState());
});

export default store;
