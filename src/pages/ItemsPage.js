import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import '../Styles/itemPage.css';

const ItemsPage = () => {
  const { categoryName } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const cartQuantities = useSelector(state => 
    state.cart.items.reduce((acc, item) => {
      acc[item.idMeal] = item.quantity;
      return acc;
    }, {})
  );

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        setItems(response.data.meals);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [categoryName]);

  return (
    <div className="item-page">
      <button className="back-button" onClick={() => navigate('/')}>
        &larr; Back
      </button>
      <h1>{categoryName}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-container">
          {items.map((item) => {
            const quantity = cartQuantities[item.idMeal] || 0;
            return (
              <div className="card" key={item.idMeal} data-aos="fade-up">
                <Link to={`/item/${item.idMeal}`} className="card-link">
                  <div className="card-content">
                    <img src={item.strMealThumb} alt={item.strMeal} className="card-img" />
                    <div className="card-details">
                      <h2 className="card-title">{item.strMeal}</h2>
                      <p>In Cart: {quantity}</p>
                      <button onClick={(e) => { e.preventDefault(); dispatch(addToCart(item)); }} className="card-button">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ItemsPage;
