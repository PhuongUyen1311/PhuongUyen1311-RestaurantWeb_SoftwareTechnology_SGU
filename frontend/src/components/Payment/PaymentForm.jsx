import React, { useState } from 'react';
import '../../styles/PaymentForm.css';

const Pay = ({ paymentInfo, handlePayment }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit', 'vnpay', 'bank', 'cod');

  const totalItems = paymentInfo.items.reduce((total, item) => total + item.quantity, 0);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="payment-container">
      <div className="payment-section">
        <h2>Phương thức thanh toán</h2>

        <div className="payment-method">
          <label className="payment-option">
            <input
              type="radio"
              name="payment-method"
              checked={paymentMethod === 'credit'}
              onChange={() => handlePaymentMethodChange('credit')}
            />
            <span className="radio-label">Thẻ tín dụng / Ghi nợ</span>
            <div className="card-logos">
              <span className="card-logo visa"></span>
              <span className="card-logo mastercard"></span>
              <span className="card-logo jcb"></span>
            </div>
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment-method"
              checked={paymentMethod === 'bank'}
              onChange={() => handlePaymentMethodChange('bank')}
            />
            <span className="radio-label">Chuyển khoản ngân hàng</span>
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment-method"
              checked={paymentMethod === 'vnpay'}
              onChange={() => handlePaymentMethodChange('vnpay')}
            />
            <span className="radio-label">Ví VN Pay</span>
            <span className="vnpay-logo"></span>
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment-method"
              checked={paymentMethod === 'cod'}
              onChange={() => handlePaymentMethodChange('cod')}
            />
            <span className="radio-label">Thanh toán khi nhận hàng (COD)</span>
          </label>
        </div>

        {/* Chỉ xuất hiện form thông tin thẻ khi chọn thanh toán bằng thẻ*/}
        {paymentMethod !== 'cod' && (
          <div className="card-info">
            <h3>Thông tin thẻ</h3>

            <div className="card-number">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Số thẻ"
              />
            </div>

            <div className="card-name">
              <input
                type="text"
                placeholder="Tên chủ thẻ"
              />
            </div>

            <div className="card-expiry-cvv">
              <div className="card-expiry">
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="Ngày hết hạn (MM/YY)"
                />
              </div>
              <div className="card-cvv">
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="CVV"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="order-summary">
        <h2>Thông tin đơn hàng</h2>

        <div className="order-details">
          <div className="order-row">
            <span>Số lượng sản phẩm:</span>
            <span>{totalItems}</span>

          </div>
          <div className="order-row">
            <span>Tạm tính:</span>
            <span>{paymentInfo.cost.toFixed(3)}đ</span>
          </div>

          <div className="order-row">
            <span>Mã giao dịch</span>
            <span>XXXXXXXXXXX</span>
          </div>
          <div className='order-cost'>
            <div className="order-row">
              <span>Thuế 10%:</span>
              <span className="tax">{paymentInfo.tax.toFixed(3)}đ</span>
            </div>
            <div className="order-row">
              <span>Tổng tiền:</span>
              <span className="total-cost">{(paymentInfo.cost + paymentInfo.tax).toFixed(3)}đ</span>
            </div>
          </div>
          <div className="action-buttons">
          <button className="btn btn-cancel" onClick={() => window.location.href = '/'}>Hủy</button>
            <button className="btn btn-pay" onClick={handlePayment}>
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;