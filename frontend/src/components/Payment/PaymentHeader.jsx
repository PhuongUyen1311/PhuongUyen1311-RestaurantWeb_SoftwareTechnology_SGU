import React from 'react';
import '../../styles/PaymentHeader.css';

const PaymentHeader = () => {
  return (
    <header className="payment-header">
    <a href="/" className="back-btn">⬅ Back</a>
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