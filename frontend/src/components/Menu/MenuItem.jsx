import React from 'react';
import '../../styles/MenuItem.css';
import { normalizeImageName } from '../../utils/Normalize.js';

const MenuItem = ({ item, onAddToCart, onItemClick }) => {
  const price = Number(item.price).toLocaleString('vi-VN', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
  return (
    <div
      className="menu-item"
      onClick={() => onItemClick(item)} // Mở popup khi nhấn item
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onItemClick(item)} // Hỗ trợ phím Enter
    >
      <img
        src={`/images/${normalizeImageName(item.name)}.jpg`}
        alt={item.name}
        onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
        className="menu-item-image"
      />
      <h3 className="menu-item-name">{item.name.toUpperCase()}</h3>
      <p className="menu-item-price">{price} VND</p>
      <button
        className="menu-item-button"
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(item);
        }}
      >
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};

export default MenuItem;