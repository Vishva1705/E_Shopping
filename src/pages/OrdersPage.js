// src/pages/OrdersPage.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrders, removeOrder } from '../features/orders/ordersSlice';
import '../Styles/ordersPage.css';
import MessageBox from '../components/MessageBox';

const OrdersPage = () => {
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [message, setMessage] = useState('');

  const handleCancelOrder = (idMeal) => {
    dispatch(removeOrder(idMeal));
  };

  const handleClearAllOrders = () => {
    if (orders.length > 0) {
      dispatch(removeOrder(null)); 
      setMessage('All orders have been canceled.');
      setShowMessageBox(true);
      setTimeout(() => {
        setShowMessageBox(false);
      }, 1500);
    }
  };

  return (
    <div className="orders-page-unique">
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders placed yet. <a className="order-link" href="/">Go and order something</a></p>
      ) : (
        <div className="orders-list-unique">
          {orders.map((order, index) => (
            <div className="order-item-unique" key={index}>
              {order.map((item) => (
                <div className="order-item-details-unique" key={item.idMeal}>
                  <img src={item.strMealThumb} alt={item.strMeal} className="order-item-image-unique" />
                  <div>
                    <span className="order-item-name-unique">{item.strMeal}</span>
                    <p className="order-item-extra-unique">Quantity: {item.quantity}</p>
                    <p className="order-item-extra-unique">Delivery date: 3-5 business days</p>
                    <p className="order-item-extra-unique">Order status: Processing</p>
                    <button className="order-item-button-unique" onClick={() => handleCancelOrder(item.idMeal)}>Cancel Order</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {orders.length > 0 && (
        <button onClick={handleClearAllOrders} className="clear-all-orders-button">
          Clear All Orders
        </button>
      )}
      {showMessageBox && <MessageBox message={message} />}
    </div>
  );
};

export default OrdersPage;
