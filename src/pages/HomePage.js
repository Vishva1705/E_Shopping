import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories, selectCategories } from '../features/categories/categoriesSlice';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import '../Styles/HomePage.css'; 

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
    AOS.init({ duration: 1000 }); 
  }, [dispatch]);

  return (
    <div className="home-page">
      <h1>Categories</h1>
      <div className="categories">
        {categories.map((category, index) => (
          <Link
            key={category.idCategory}
            to={`/category/${category.strCategory}`}
            className="category"
            data-aos="fade-up" 
            data-aos-delay={index * 100} 
          >
            <img src={category.strCategoryThumb} alt={category.strCategory} />
            <h2>{category.strCategory}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
