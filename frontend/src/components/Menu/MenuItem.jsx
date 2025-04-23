import React from 'react';
import '../../styles/MenuItem.css';

const MenuItem = ({ item, onAddToCart }) => {
  return (
    <div className="menu-item">
      <img
        src={`/images/${item.name.toLowerCase().replace(/\s/g, '-')}.jpg`}
        alt={item.name}
        onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
      />
      <h3 className="menu-item-name">{item.id}. {item.name}</h3>
      <p className="menu-item-price">Kr {item.price.toFixed(2)}</p>
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
