// src/pages/Cart/Cart.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate
import axios from 'axios';
import '../../styles/YourCart.css';
import YourCart from '../../components/Cart/YourCart';
import ItemInfo from '../ItemInfo/ItemInfo';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const total = Number(
    cartItems.reduce((total, item) => total + item.price * item.quantity + item.price * 0.1, 0)).toLocaleString('vi-VN', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });

  const updateCart = async (id, quantity, note) => {
    try {
      const Response = await axios.post("http://localhost:5000/cart/update", {
        id,
        quantity,
        note
      });

      if (Response.data.success) {
        localStorage.setItem('cart', JSON.stringify(Response.data));
        window.dispatchEvent(new Event('cartUpdated'));
      }
      console.log("Cập nhật giỏ hàng thành công:", Response.data);
    } catch (err) {
      console.error("Lỗi:", err);
    }
  };

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
  const handleIncrease = async (id) => {
    try {
      const res = await axios.post('http://localhost:5000/cart/increase', { id });
      const data = res.data;
      localStorage.setItem('cart', JSON.stringify(res.data));

      if (!data.success) {
        alert(data.message);
      }

      fetchCartItems();
    } catch (err) {
      console.error('Lỗi khi tăng số lượng:', err);
    }
  };

  // Giảm số lượng sản phẩm trong giỏ hàng
  const handleDecrease = async (id) => {
    try {
      const res = await axios.post('http://localhost:5000/cart/decrease', { id });
      const data = res.data;

      if (!data.success) {
        alert(data.message);
      }

      fetchCartItems();
    } catch (err) {
      console.error('Lỗi khi giảm số lượng:', err);
    }
  };

  const handleRemove = async (id) => {
    try {
      const Response = await axios.post("http://localhost:5000/cart/remove", {
        id
      });

      if (Response.data.success) {
        window.dispatchEvent(new Event('cartUpdated'));
      }
      console.log("xóa khỏi giỏ hàng thành công", Response.data);
    } catch (err) {
      console.error("Lỗi:", err);
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

  const handleItemClick = (item) => {
    setSelectedProduct(item);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
  };

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
                key={item.id}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
                onItemClick={handleItemClick}
              />
            ))
          )}
        </div>
        {selectedProduct && (
          <ItemInfo
            item={selectedProduct}
            quantity={selectedProduct.quantity}
            note={selectedProduct.note}
            isOpen={isPopupOpen}
            onClose={closePopup}
            onAddToCart={updateCart}
          />
        )}
      </div>
      <div className="cart-total">
        <h3>
          Tổng tiền:{' '}
          {total}
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