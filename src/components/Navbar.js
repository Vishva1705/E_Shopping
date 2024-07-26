import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { selectCartItems } from '../features/cart/cartSlice';
import '../Styles/Header.css';

const Header = () => {
  const cartItems = useSelector(selectCartItems);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setMenuOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">E-Shop</Link>
      </div>

      <nav className={`navbar ${menuOpen && isMobile ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={handleLinkClick}>Home</Link>        
        <Link to="/orders" className="nav-link" onClick={handleLinkClick}>Orders</Link>
        <Link to="/contact" className="nav-link" onClick={handleLinkClick}>Contact</Link>
      </nav>

      <div className="cart">
        <Link to="/cart" className="cart-link">
          <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
          <span className="cart-text">Cart</span>
          <span className="cart-count">{cartItems.length}</span>
        </Link>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </div>

      {menuOpen && isMobile && <div className="overlay" onClick={toggleMenu}></div>}
    </header>
  );
};

export default Header;
