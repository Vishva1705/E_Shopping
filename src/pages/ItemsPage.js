import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';
 
const ItemsPage = () => {
  const { categoryName } = useParams();
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
 
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then(response => response.json())
      .then(data => setItems(data.meals));
  }, [categoryName]);
 
  return (
<div>
<h1>{categoryName}</h1>
<ul>
        {items.map(item => (
<li key={item.idMeal}>
<Link to={`/item/${item.idMeal}`}>{item.strMeal}</Link>
<button onClick={() => dispatch(addToCart(item))}>Add to Cart</button>
</li>
        ))}
</ul>
</div>
  );
};
 
export default ItemsPage;