import React from 'react';
import BackToHome from './BackToHome';
import Menu from '../Menu/Menu';
import Filter from './Filter';
import YourCart from './YourCart';
import '../../styles/Home.css';

const Home = () => {
  return (
    <div className="app-container">
      <div className="back-to-home-wrapper">
        <BackToHome />
      </div>
      <div className="main-content">
        <div className="left-section">
          <div className="filter-products">
            <Filter />
          </div>
          <div className="menu-products">
            <Menu />
          </div>
        </div>
        <div className="your-cart">
          <YourCart />
        </div>
      </div>
    </div>
  );
};

export default Home;