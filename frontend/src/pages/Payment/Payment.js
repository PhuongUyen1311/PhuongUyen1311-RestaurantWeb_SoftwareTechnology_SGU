import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Nếu bạn cần tải dữ liệu thanh toán từ server
import '../../styles/Payment.css';

const Payment = () => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/payment');
        setPaymentInfo(response.data);
      } catch (err) {
        console.error("Lỗi khi tải thông tin thanh toán:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentInfo(); 
  }, []);

  // Xử lý thanh toán 
  const handlePayment = async () => {
    try {
      await axios.post('http://localhost:5000/payment/checkout', paymentInfo);
      alert('Thanh toán thành công!');
      window.location.href = '/'; // Quay lại trang chủ sau khi thanh toán thành công
    } catch (err) {
      console.error("Lỗi thanh toán:", err);
      alert('Thanh toán thất bại, vui lòng thử lại!');
    }
  };

  if (loading) {
    return <div>Đang tải thông tin thanh toán...</div>;
  }

  return (
    <div className="payment-container">
      <h2>Thông tin thanh toán</h2>
      
      {paymentInfo ? (
        <div className="payment-details">
          <h3>Đơn hàng của bạn:</h3>
          <ul>
            {paymentInfo.items.map((item) => (
              <li key={item.productId}>
                {item.productName} - {item.quantity} x {item.price} VNĐ
              </li>
            ))}
          </ul>
          <h3>Tổng tiền: {paymentInfo.totalAmount} VNĐ</h3>
          <div className="payment-action">
            <button onClick={handlePayment} className="payment-button">
              Thanh toán
            </button>
            <button onClick={() => window.location.href = '/cart'} className="back-button">
              Quay lại giỏ hàng
            </button>
          </div>
        </div>
      ) : (
        <p>Không có thông tin thanh toán.</p>
      )}
    </div>
  );
};

export default Payment;
