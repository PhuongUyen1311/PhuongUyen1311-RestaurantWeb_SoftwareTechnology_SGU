// src/pages/Cart/Cart.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate
import axios from 'axios';
import '../../styles/YourCart.css';
import YourCart from '../../components/Cart/YourCart';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  // Lấy dữ liệu giỏ hàng
  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/cart');
      const items = response.data || [];
      setCartItems(items);
    } catch (err) {
      console.error('Lỗi khi tải giỏ hàng:', err);
    }
  };

  // Tăng số lượng sản phẩm trong giỏ hàng
  const handleIncrease = async (productId) => {
    try {
      await axios.post('http://localhost:5000/cart/increase', { productId });
      fetchCartItems();
    } catch (err) {
      console.error('Lỗi khi tăng số lượng:', err);
    }
  };

  // Giảm số lượng sản phẩm trong giỏ hàng
  const handleDecrease = async (productId) => {
    try {
      await axios.post('http://localhost:5000/cart/decrease', { productId });
      fetchCartItems();
    } catch (err) {
      console.error('Lỗi khi giảm số lượng:', err);
    }
  };

  // Khi nhấn nút thanh toán
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng trống. Vui lòng thêm sản phẩm!');
      return;
    }
    navigate('/payment'); // Điều hướng đến trang /payment
  };

  useEffect(() => {
    fetchCartItems();
    const reloadCart = async () => {
      const response = await axios.get('http://localhost:5000/cart');
      setCartItems(response.data || []);
    };

    window.addEventListener('cartUpdated', reloadCart);

    return () => window.removeEventListener('cartUpdated', reloadCart);
  }, []);

  return (
    <>
      <div className="your-cart-container">
        <h2>Giỏ Hàng</h2>
        <div className="your-cart-items">
          {cartItems.length === 0 ? (
            <p>(Giỏ hàng của bạn đang trống)</p>
          ) : (
            cartItems.map((item) => (
              <YourCart
                item={item}
                key={item.productId}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            ))
          )}
        </div>
      </div>
      <div className="cart-total">
        <h3>
          Tổng tiền:{' '}
          {cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(3)}{' '}
          VNĐ
        </h3>
        <button className="checkout-button" onClick={handleCheckout}>
          Thanh toán
        </button>
      </div>
    </>
  );
};

export default Cart;