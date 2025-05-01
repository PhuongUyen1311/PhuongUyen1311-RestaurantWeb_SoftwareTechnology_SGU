// YourCart.jsx
import React, { useRef } from 'react';
import '../../styles/YourCart.css';
import { normalizeImageName } from '../../utils/Normalize.js';

export const YourCart = ({ item, onIncrease, onDecrease, onRemove, onItemClick }) => {
  const imageSrc = `/images/${normalizeImageName(item.name)}.jpg`;
  const price = Number(item.price).toLocaleString('vi-VN', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });

  const tax = Number(item.price * 0.1).toLocaleString('vi-VN', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });


  const holdDelay = 100; // Thời gian giữa mỗi lần tăng/giảm (ms)
  const intervalRef = useRef(null);

  const startHolding = (action, id) => {
    action(id);
    intervalRef.current = setInterval(() => {
      action(id);
    }, holdDelay);
  };

  const stopHolding = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="cart-item" >
      <img
        onClick={() => onItemClick(item)} // Mở popup khi nhấn item
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onItemClick(item)} // Hỗ trợ phím Enter
        src={imageSrc}
        alt={item.name}
        className="cart-item-image"
        onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
      />

      <div className="cart-item-details"
        onClick={() => onItemClick(item)} // Mở popup khi nhấn item
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onItemClick(item)} // Hỗ trợ phím Enter
      >
        <p className="cart-item-name">{item.name}</p>
        <p className="cart-item-price">{price} VND</p>
        <p className="cart-item-tax">Incl. tax 10% = Kr {tax}</p>
      </div>

      <div className="cart-item-quantity">
        <button
          className="quantity-button"
          onMouseDown={() => startHolding(onDecrease, item.id)}
          onMouseUp={stopHolding}
          onMouseLeave={stopHolding}
        >
          –
        </button>

        <span>{item.quantity}</span>

        <button
          className="quantity-button"
          onMouseDown={() => startHolding(onIncrease, item.id)}
          onMouseUp={stopHolding}
          onMouseLeave={stopHolding}
        >
          +
        </button>
      </div>
      <div className='cart-item-remove'>
        <button className="remove-button" onClick={() => onRemove(item.id)}>
        </button>
      </div>
    </div>
  );
};

export default YourCart;
