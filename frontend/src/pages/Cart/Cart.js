import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/YourCart.css'; // Import CSS styles for the cart component
import YourCart from '../../components/Cart/YourCart';  

const Cart = ({ onCheckout }) => {
  const [cartItems, setCartItems] = useState([]);

  // Lấy dữ liệu giỏ hàng
  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart");
      const items = response.data || [];
      setCartItems(items);
    } catch (err) {
      console.error("Lỗi khi tải giỏ hàng:", err);
    }
  };

  // Tăng số lượng sản phẩm trong giỏ hàng
  const handleIncrease = async (productId) => {
    try {
      await axios.post("http://localhost:5000/cart/increase", { productId });
      fetchCartItems(); // Cập nhật lại giỏ hàng
    } catch (err) {
      console.error("Lỗi khi tăng số lượng:", err);
    }
  };

  // Giảm số lượng sản phẩm trong giỏ hàng
  const handleDecrease = async (productId) => {
    try {
      await axios.post("http://localhost:5000/cart/decrease", { productId });
      fetchCartItems(); // Cập nhật lại giỏ hàng
    } catch (err) {
      console.error("Lỗi khi giảm số lượng:", err);
    }
  };

  // Khi nhấn nút thanh toán
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng trống. Vui lòng thêm sản phẩm!');
      return;
    }
    onCheckout(); // Gọi hàm điều hướng
  };

  useEffect(() => {
    fetchCartItems(); // Gọi hàm lấy dữ liệu giỏ hàng khi component mount
  }, []);

  return (
    <>
      <div className="your-cart-container">
        <h2>Giỏ hàng</h2>
        <div className="your-cart-items">
          {cartItems.length === 0 ? (
            <p>Giỏ hàng của bạn đang trống.</p>
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
