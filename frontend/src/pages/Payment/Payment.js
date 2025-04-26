import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Nếu bạn cần tải dữ liệu thanh toán từ server
import '../../styles/Payment.css';
import PaymentHeader from '../../components/Payment/PaymentHeader'
import Pay from '../../components/Payment/PaymentForm'
const Payment = () => {

  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState({ items: [], cost: 0, tax: 0 });

  const fetchPaymentInfo = async () => {
    try {
      const response = await axios.get("http://localhost:5000/payment");
      const data = response.data || { items: [], cost: 0, tax: 0 };
      console.log("Dữ liệu thanh toán: ", data);
      setPaymentInfo(data);
      setLoading(true);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu thanh toán: ", err);
    }
  };

  useEffect(() => {
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

  if (!loading) {
    return <div>Đang tải thông tin thanh toán...</div>;
  }

  return (
    <div className="container-payment">
      <PaymentHeader />
      <div className="content-wrapper">
        <Pay
        paymentInfo={paymentInfo}
        handlePayment={handlePayment}
         />
      </div>
    </div>
  );
};

export default Payment;
