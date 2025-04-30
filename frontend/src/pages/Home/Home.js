import React, { useState } from 'react';
import BackToHome from './BackToHome';
import Menu from '../Menu/Menu';
import Filter from './Filter';
import Cart from '../Cart/YourCart';
import '../../styles/Home.css';

const Home = ({ goToPayment }) => {

  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="app-container">
      <div className="back-to-home-wrapper">
        <BackToHome />
      </div>
      <div className="main-content">
        <div className="left-section">
          <div className="filter-products">
            <Filter onCategoryChange={setSelectedCategory} />
          </div>
          <div className="menu-products">
            <Menu category={selectedCategory} />
          </div>
        </div>
        <div className="your-cart">
          <Cart onCheckout={goToPayment} />
        </div>
      </div>
    </div>
  );
};

export default Home;
