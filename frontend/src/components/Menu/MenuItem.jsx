import React from 'react';
import '../../styles/MenuItem.css';
import { normalizeImageName } from '../../utils/Normalize.js';

const MenuItem = ({ item, onAddToCart }) => {
  return (
    <div className="menu-item">
      <img
        src={`/images/${normalizeImageName(item.name)}.jpg`}
        alt={item.name}
        onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
      />
      <h3 className="menu-item-name">{item.name.toUpperCase()}</h3>
      <p className="menu-item-price">{item.price.toFixed(0)}k</p>
      <button
        className="menu-item-button"
        onClick={() => onAddToCart(item)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuItem;
