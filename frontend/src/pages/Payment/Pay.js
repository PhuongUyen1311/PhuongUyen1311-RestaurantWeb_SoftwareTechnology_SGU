import React, { useState } from 'react';
import '../../styles/Pay.css';

const Pay = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    console.log('Processing payment...');
  };

  return (
    <div className="payment-container">
      {/* Payment Details */}
      <div className="payment-details">
        <div className="business-info">
          <p>Business name</p>
          <p>1 item (expand)</p>
        </div>
        <div className="amount">
          <p>25.00 NOK</p>
          <p>Inc. VAT</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="payment-method">
        <label>
          <input type="radio" name="payment-method" checked readOnly />
          Credit Card - debit or credit
        </label>
        <div className="card-logos">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" />
        </div>
      </div>

      {/* Card Input Fields */}
      <div className="card-inputs">
        <div className="input-group">
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Card Number"
          />
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>MM/YY</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
            />
          </div>
          <div className="input-group">
            <label>CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="CVV"
            />
          </div>
        </div>
      </div>

      {/* Pay Button */}
      <button className="pay-btn" onClick={handlePayment}>
        Pay NOK 25.00
      </button>

      {/* Footer Links */}
      <footer className="payment-footer">
        <div className="language">
          <span>🌐</span> English
        </div>
        <div className="footer-links">
          <a href="/cancel">Cancel payment</a>
          <a href="/terms">Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default Pay;