import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart, clearCart } from '../features/cart/cartSlice';
import { useHistory } from 'react-router-dom';
 
const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
 
  const handlePlaceOrder = () => {
    // Assuming an order API to create an order
    // Example: fetch('/api/orders', { method: 'POST', body: JSON.stringify(cartItems) })
    dispatch(clearCart());
    history.push('/orders');
  };
 
  return (
<div>
<h1>Cart</h1>
<ul>
        {cartItems.map(item => (
<li key={item.idMeal}>
            {item.strMeal} - Quantity: 
<input
              type="number"
              value={item.quantity}
              onChange={(e) => dispatch(updateQuantity({ idMeal: item.idMeal, quantity: Number(e.target.value) }))}
            />
<button onClick={() => dispatch(removeFromCart(item))}>Remove</button>
</li>
        ))}
</ul>
<button onClick={handlePlaceOrder}>Place Order</button>
</div>
  );
};
 
export default CartPage;