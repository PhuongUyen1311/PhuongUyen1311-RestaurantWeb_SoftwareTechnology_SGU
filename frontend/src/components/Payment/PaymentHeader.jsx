import React from 'react';
import '../../styles/PaymentHeader.css';

const PaymentHeader = () => {
  return (
    <header className="payment-header">
    <a href="/" class="back-btn">
      <svg class="back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path d="M11 2L3 8l8 6V2z"/>
      </svg>
      <span class="back-text">Back</span>
    </a>

    <h1>PAYMENT</h1>
    <nav>
      <a href="/">Home</a>
      <span>•</span>
      {/* <a href="/payment">Payment</a> */}
    </nav>
    </header>
  );
};

export default PaymentHeader;
