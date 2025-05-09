// src/pages/Payment/Payment.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import '../../styles/Payment.css';
import PaymentHeader from '../../components/Payment/PaymentHeader';
import Pay from '../../components/Payment/PaymentForm';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Payment = () => {
  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState({ items: [], cost: 0, tax: 0, note: '' });
  const location = useLocation();
  const navigate = useNavigate();
  const fetchPaymentInfo = async () => {
    try {
      const response = await axios.get('http://localhost:5000/payment');
      const data = response.data || { items: [], cost: 0, tax: 0, note: '' };
      console.log('Dữ liệu thanh toán: ', data);
      setPaymentInfo(data);
      setLoading(true);
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu thanh toán: ', err);
    }
  };

  useEffect(() => {
    fetchPaymentInfo();
  }, []);

  const handlePayment = async (paymentMethod) => {
    try {
      if (paymentMethod === 'vnpay' || paymentMethod === 'credit') {
        const response = await axios.post('http://localhost:5000/payment/vnpay', {
          amount: (paymentInfo.cost + paymentInfo.tax) * 100,
          orderId: `OD${Date.now()}`,
          orderInfo: `Thanh toán đơn hàng #${Date.now()}`,
          orderType: paymentMethod === 'credit' ? 'creditcard' : 'billpayment',
        });

        window.location.href = response.data.paymentUrl; // Chuyển hướng đến giao diện VNPay

      } else if (paymentMethod === 'cod') {

        const updateResponse = await axios.post('http://localhost:5000/food/update');
        console.log('Cập nhật giỏ hàng thành công:', updateResponse.data);
        toast.success('Thanh toán thành công!');
        await axios.delete('http://localhost:5000/cart')
        navigate('/');
      }

    } catch (err) {
      console.error('Lỗi thanh toán:', err);
      toast.error('Thanh toán thất bại, vui lòng thử lại!');
    }
  };
  
  useEffect(() => {
    const handleVNPayResponse = async () => {
      const query = new URLSearchParams(location.search);
      const vnp_ResponseCode = query.get('vnp_ResponseCode');
      if (vnp_ResponseCode) {
        if (vnp_ResponseCode === '00') {

          const updateResponse = await axios.post('http://localhost:5000/food/update');
          console.log('Cập nhật giỏ hàng thành công:', updateResponse.data);

          toast.success('Thanh toán qua VNPay thành công!');
          await axios.delete('http://localhost:5000/cart')

          navigate('/');
        } else {
           toast.error('Thanh toán qua VNPay thất bại. Vui lòng thử lại!');
        }
      }
    };

    handleVNPayResponse();
  }, [location, navigate]);

  if (!loading) {
    return <div>Đang tải thông tin thanh toán...</div>;
  }

  return (
    <div className="container-payment">
      <PaymentHeader />
      <div className="content-wrapper">
        <Pay paymentInfo={paymentInfo} onCheckout={handlePayment} />
      </div>
    </div>
  );
};

export default Payment;