import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/PaymentForm.css'
import { toast } from 'react-toastify';

const Pay = ({ paymentInfo, onCheckout }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [orderId, setOrderId] = useState('');
  const [note, setNote] = useState(paymentInfo.note);
  const navigate = useNavigate();

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
  };
  useEffect(() => {
    setOrderId(`${Date.now()}`);
    setNote(paymentInfo.note);
  }, [paymentInfo.note]);
  const handleSubmit = () => {
    if (paymentMethod === 'bank') {
      // Điều hướng đến trang BankTransferPage
      navigate('/bank-transfer', {
        state: {
          paymentInfo,
          orderId: orderId || `${Date.now()}`,
        },
      });
    } else {
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