// src/components/YourCart/YourCart.jsx

import React from 'react';
import CartItem from '../../components/Cart/Yourcartcomponent'; 
import '../../styles/YourCart.css';

const YourCart = ({ cartItems = [], onIncrease, onDecrease }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = totalPrice * 0.1;
  const totalWithTax = totalPrice + tax;

  return (
    <div className="your-cart">
      <div className="your-cart-header">
        <h2>Your Cart ({cartItems.length})</h2>
        <button className="DINE-IN">DINE IN</button>
      </div>

      {cartItems.length === 0 ? (
        <p className="your-cart-empty">Chưa có add 😭 sao có mà hiện</p>
      ) : (
        <div className="your-cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
              />
            ))}
          </div>

          <div className="your-cart-total">
            <p className="total-text">TOTAL: Kr {totalWithTax.toFixed(2)}</p>
            <p className="tax-details">(Incl. tax 10% = Kr {tax.toFixed(2)})</p>
          </div>

          <button className="payment-button">PAYMENT</button>
        </div>
      )}
    </div>
  );
};

export default YourCart;
