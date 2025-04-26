import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Nếu bạn cần tải dữ liệu thanh toán từ server
import '../../styles/Payment.css';
import PaymentHeader from './PaymentHeader'
import Pay from './Pay'
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
    <div className="container-payment">
      <PaymentHeader />
      <div className="content-wrapper">
        <Pay />
      </div>
    </div>
  );
};

export default Payment;
