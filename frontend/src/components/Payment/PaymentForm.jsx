// src/components/Payment/PaymentForm.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../styles/PaymentForm.css'
import { toast } from 'react-toastify';

const Pay = ({ paymentInfo, onCheckout }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [errors, setErrors] = useState({});
  const [orderId, setOrderId] = useState('');
  const [note, setNote] = useState(paymentInfo.note);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const totalItems = paymentInfo.items.reduce((total, item) => total + item.quantity, 0);

  const tempPrice = (paymentInfo.cost - paymentInfo.tax).toLocaleString('vi-VN', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });

  const tax = paymentInfo.tax.toLocaleString('vi-VN', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });

  const cost = paymentInfo.cost.toLocaleString('vi-VN', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });


  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setErrors({});
  };
  useEffect(() => {
    setOrderId(`${Date.now()}`);
    setNote(paymentInfo.note);
  }, [paymentInfo.note]);

  const validateCardInfo = () => {
    const newErrors = {};
    if (paymentMethod === 'credit' || paymentMethod === 'bank') {
      if (!cardNumber || !/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Số thẻ phải có 16 chữ số';
      }
      if (!cardHolder || cardHolder.trim().length < 2) {
        newErrors.cardHolder = 'Tên chủ thẻ không hợp lệ';
      }
      if (!expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
        newErrors.expiry = 'Ngày hết hạn phải có định dạng MM/YY';
      }
      if (!cvv || !/^\d{3}$/.test(cvv)) {
        newErrors.cvv = 'CVV phải có 3 chữ số';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (paymentMethod === 'bank') {
      // Điều hướng đến trang BankTransferPage và truyền thông tin cần thiết
      navigate('/bank-transfer', {
        state: {
          paymentInfo,
          orderId: orderId || `${Date.now()}`,
        },
      });
    } else if (validateCardInfo()) {
      onCheckout(paymentMethod);
    }
  };

  return (
    <div className="payment-container" id="payment-container">
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
              <span className="card-logo visa">Visa</span>
              <span className="card-logo mastercard">Mastercard</span>
              <span className="card-logo jcb">JCB</span>
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
            <span className="vnpay-logo">VNPAY</span>
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

        {(paymentMethod === 'credit') && (
          <div className="card-info">
            <h3>Thông tin thẻ</h3>
            <div className="card-number">
              {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Số thẻ"
              />
            </div>
            <div className="card-name">
              {errors.cardHolder && <span className="error">{errors.cardHolder}</span>}
              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
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
                {errors.expiry && <span className="error">{errors.expiry}</span>}
              </div>
              <div className="card-cvv">
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="CVV"
                />
                {errors.cvv && <span className="error">{errors.cvv}</span>}
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
            <span>{tempPrice} VND</span>
          </div>
          <div className="order-row">
            <span>Mã giao dịch</span>
            <span>{orderId}</span>
          </div>
          <div className="order-cost">
            <div className="order-row">
              <span>Thuế 10%:</span>
              <span className="tax">{tax} VND</span>
            </div>
            <div className="order-row">
              <span>Tổng tiền:</span>
              <span className="total-cost">{cost} VND</span>
            </div>
          </div>
        </div>
        <div className='order-note'>
          <textarea className='order-note-input'
            value={note || ''}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ghi chú cho đơn hàng"
            rows={4}
          />
        </div>
        <div className="action-buttons">
          <button className="btn btn-cancel" onClick={() => {
            navigate('/');
            toast.info("Hủy thanh toán");
          }}>
            Hủy
          </button>
          <button className="btn btn-pay" onClick={handleSubmit}>
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pay;