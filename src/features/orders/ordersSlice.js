import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state, action) => {
      if (action.payload === null) {
        state.orders = []; 
      } else {
        state.orders = state.orders.map(order =>
          order.filter(item => item.idMeal !== action.payload)
        ).filter(order => order.length > 0); 
      }
    },
  },
});

export const { addOrder, removeOrder } = ordersSlice.actions;
export const selectOrders = (state) => state.orders.orders;
export default ordersSlice.reducer;
