import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addToCart, selectItemQuantity } from '../features/cart/cartSlice';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../Styles/ItemDetailPage.css';

const ItemDetailPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchItem = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`);
        setItem(response.data.meals[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItem();
  }, [itemId]);

  const quantity = useSelector(selectItemQuantity(itemId));

  return item ? (
    <div className="item-detail-container" data-aos="fade-up">
      <button className="back-button" onClick={() => navigate(-1)}>&larr; Back</button>
      <div className="item-content">
        <div className="item-image">
          <img src={`${item.strMealThumb}/preview`} alt={item.strMeal} />
        </div>
        <div className="item-details">
          <h1 className="item-title">{item.strMeal}</h1>
          <p className="item-instructions">{item.strInstructions}</p>
          <p>In Cart: {quantity}</p>
          <button className="item-button" onClick={() => dispatch(addToCart(item))}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default ItemDetailPage;
