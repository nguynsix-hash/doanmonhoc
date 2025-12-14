import React from 'react';
import Slide from "./Slide";
import ProductCard from './ProductCard';
import CategoryList from './CategoryList';
import PostNew from './PostNew'

const Home = () => {
  return (
    <>
      <Slide />
      <CategoryList/>
      <ProductCard type="new" />

      <PostNew />
    </>
  );
};

export default Home;