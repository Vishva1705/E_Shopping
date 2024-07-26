import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../features/categories/categoriesSlice';
 
const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
 
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
 
  return (
<div>
<h1>Categories</h1>
<ul>
        {categories.map(category => (
<li key={category.idCategory}>
<Link to={`/category/${category.strCategory}`}>{category.strCategory}</Link>
</li>
        ))}
</ul>
</div>
  );
};
 
export default HomePage;