
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { removeFromCart, updateQuantity, selectCartItems, clearCart } from '../features/cart/cartSlice';
import { addOrder } from '../features/orders/ordersSlice';
import '../Styles/cartPage.css';
import MessageBox from '../components/MessageBox'; 

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const [showMessageBox, setShowMessageBox] = useState(false); 

  const handleRemove = (idMeal) => {
    dispatch(removeFromCart(idMeal));
  };

  const handleQuantityChange = (idMeal, quantity) => {
    if (quantity < 1) {
      handleRemove(idMeal);
    } else {
      dispatch(updateQuantity({ idMeal, quantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePlaceOrder = () => {
    const orderWithQuantities = cartItems.map(item => ({
      ...item,
      quantity: item.quantity,
    }));
  
    dispatch(addOrder(orderWithQuantities));
    dispatch(clearCart());
    setShowMessageBox(true);
    setTimeout(() => {
      setShowMessageBox(false);
      navigate('/orders');
    }, 1500);
  };
  

  return (
    <div className="cart-page">
       <button className="back-button" onClick={() => navigate(-1)}>&larr; Back</button>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <>
        <p>Your cart is empty.</p>
        <a href="/" className="order-link">Go to add item in a Cart</a>
        </>
      ) : (
        <>
         
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.idMeal}>
                <img src={item.strMealThumb} alt={item.strMeal} className="cart-item-image" />
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.strMeal}</span>
                  <div className="cart-item-quantity">
                    <button onClick={() => handleQuantityChange(item.idMeal, item.quantity - 1)} className="icon-button">
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.idMeal, Number(e.target.value))}
                      className="quantity-input"
                    />
                    <button onClick={() => handleQuantityChange(item.idMeal, item.quantity + 1)} className="icon-button">
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button onClick={() => handleRemove(item.idMeal)} className="icon-button cart-item-remove">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-buttons">
            <button onClick={handleClearCart} className="clear-cart-button">Clear Cart</button>
            <button onClick={handlePlaceOrder} className="place-order-button">Place Order</button>
          </div>
        </>
      )}
      {showMessageBox && <MessageBox message="Order placed successfully!" />}
    </div>
  );
};

export default CartPage;
