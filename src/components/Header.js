import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
 
const Header = () => {
  const cartItems = useSelector((state) => state.cart);
 
  return (
<header>
<nav>
<Link to="/">Home</Link>
<Link to="/cart">Cart ({cartItems.length})</Link>
</nav>
</header>
  );
};
 
export default Header;