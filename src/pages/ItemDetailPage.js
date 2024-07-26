import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';
 
const ItemDetailPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const dispatch = useDispatch();
 
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`)
      .then(response => response.json())
      .then(data => setItem(data.meals[0]));
  }, [itemId]);
 
  return item ? (
<div>
<h1>{item.strMeal}</h1>
<p>{item.strInstructions}</p>
<img src={`${item.strMealThumb}/preview`} alt={item.strMeal} />
<button onClick={() => dispatch(addToCart(item))}>Add to Cart</button>
</div>
  ) : (
<p>Loading...</p>
  );
};
 
export default ItemDetailPage;