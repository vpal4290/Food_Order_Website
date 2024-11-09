import React, { useState } from 'react'
import './Home.css';
import Header from '../../components/Headers/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/foodDisplay/FoodDisplay';
import Footer from '../../components/Footer/Footer';
const Home = () => {
  const [category,setCategory]=useState("All");
  return (
    <>
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
    {/* <Footer/> */}
    </div>
    </>
  )
}

export default Home