// YourCart.jsx
import React from 'react';
import '../../styles/YourCart.css';
import { normalizeImageName } from '../../utils/Normalize.js';

export const YourCart = ({ item, onIncrease, onDecrease }) => {
  const imageSrc = `/images/${normalizeImageName(item.name)}.jpg`;
  console.log("Image source:", imageSrc);
  const tax = (item.price * 0.1).toFixed(3);
  const price = item.price.toFixed(3);

  return (
    <div className="cart-item">
      <img
        src={imageSrc}
        alt={item.name}
        className="cart-item-image"
        onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
      />

      <div className="cart-item-details">
        <p className="cart-item-name">{item.name}</p>
        <p className="cart-item-price">{price} VND</p>
        <p className="cart-item-tax">Incl. tax 10% = Kr {tax}</p>
      </div>

      <div className="cart-item-quantity">
        <button onClick={() => onDecrease(item.productId)} className="quantity-button">-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onIncrease(item.productId)} className="quantity-button">+</button>
      </div>
    </div>
  );
};
export default YourCart;