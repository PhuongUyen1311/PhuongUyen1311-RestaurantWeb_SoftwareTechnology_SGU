
import React from 'react';
import '../../styles/YourCart.css';

const CartItem = ({ item, onIncrease, onDecrease }) => {
  const imageSrc = `/images/${item.name.toLowerCase().replace(/\s/g, '-')}.png`;
  const tax = (item.price * 0.1).toFixed(2);
  const price = item.price.toFixed(2);

  return (
    <div className="cart-item">
      <img
        src={imageSrc}
        alt={item.name}
        className="cart-item-image"
        onError={(e) => (e.target.src = 'https://via.placeholder.com/50')}
      />

      <div className="cart-item-details">
        <p className="cart-item-name">{item.name}</p>
        <p className="cart-item-price">Kr {price}</p>
        <p className="cart-item-tax">Incl. tax 10% = Kr {tax}</p>
      </div>

      <div className="cart-item-quantity">
        <button onClick={() => onDecrease(item.id)} className="quantity-button">-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onIncrease(item.id)} className="quantity-button">+</button>
      </div>
    </div>
  );
};

export default CartItem;
