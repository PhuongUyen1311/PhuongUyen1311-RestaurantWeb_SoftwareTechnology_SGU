// src/pages/Cart/Cart.js
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/YourCart.css';
import YourCart from '../../components/Cart/YourCart';
import ItemInfo from '../ItemInfo/ItemInfo';
import { toast } from 'react-toastify';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const cartItemsRef = useRef(null);
  const prevCartLengthRef = useRef(0); // để theo dõi số lượng cũ

  const total = Number(
    cartItems.reduce((total, item) => total + item.price * item.quantity + item.price * 0.1, 0)
  ).toLocaleString('vi-VN', {
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
    
        if (!data.success) {
          alert(data.message);
          return;
        }
    
        setCartItems(data.cart || []);
        localStorage.setItem('cart', JSON.stringify(data.cart));
      } catch (err) {
        console.error('Lỗi khi tăng số lượng:', err);
      }
    };
    
    const handleDecrease = async (id) => {
      const item = cartItems.find((i) => i.id === id);
      if (!item) return;
    
      if (item.quantity === 1) {
        const confirmDelete = window.confirm('Bạn có chắc muốn XÓA sản phẩm này khỏi giỏ hàng?');
        if (confirmDelete) {
          await handleRemove(id); // không cần hỏi lại
        }
        return;
      }
    
      try {
        const res = await axios.post('http://localhost:5000/cart/decrease', { id });
        const data = res.data;
    
        if (!data.success) {
          alert(data.message);
          return;
        }
    
        setCartItems(data.cart || []);
        localStorage.setItem('cart', JSON.stringify(data.cart));
      } catch (err) {
        console.error('Lỗi khi giảm số lượng:', err);
      }
    };
    
    
    const handleRemove = async (id, silent = false) => {
      try {
        const response = await axios.post("http://localhost:5000/cart/remove", { id });
    
        if (response.data.success) {
          setCartItems(response.data.cart || []);
          window.dispatchEvent(new Event('cartUpdated'));
          if (!silent) toast.success("Đã xóa sản phẩm khỏi giỏ hàng!", {
            autoClose: 1000, 
          });
        }
    
        console.log("Xóa khỏi giỏ hàng thành công", response.data);
      } catch (err) {
        console.error("Lỗi:", err);
        if (!silent) toast.error("❌ Có lỗi khi xóa sản phẩm!");
      }
    };
    
  
    const handleClearCart = async () => {
      const confirmDeleteAll = window.confirm('Bạn có chắc muốn xóa hết sản phẩm trong giỏ hàng không?');
      if (!confirmDeleteAll) return;
    
      await Promise.all(cartItems.map(item => handleRemove(item.id, true)));
    
      toast.success("Đã xóa toàn bộ sản phẩm khỏi giỏ hàng!", {
        autoClose: 1000, 
      });
    };
    
    
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Giỏ hàng trống. Vui lòng thêm sản phẩm!');
      return;
    }
    navigate('/payment');
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

  // Scroll xuống cuối chỉ khi có thêm sản phẩm mới
  useEffect(() => {
    const prevLength = prevCartLengthRef.current;
    const currentLength = cartItems.length;

    if (currentLength > prevLength) {
      if (cartItemsRef.current) {
        cartItemsRef.current.scrollTop = cartItemsRef.current.scrollHeight;
      }
    }

    prevCartLengthRef.current = currentLength;
  }, [cartItems]);

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
        <div className="top-your-cart">
          <h2 className="your-cart-title">Giỏ Hàng</h2>
          <p>({cartItems.length})</p>
          {cartItems.length > 0 && (
          <p className="trash-btn" onClick={handleClearCart}>
            • Dọn dẹp giỏ hàng
          </p>
          )}
      </div>

      <div
        className={
          cartItems.length === 0
          ? "your-cart-items empty-cart"
          : "your-cart-items"
        }
        ref={cartItemsRef}
      >
      {cartItems.length === 0 ? (
        <p className="empty-message">Giỏ hàng của bạn đang trống!</p>
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
          Tổng tiền: {total} VNĐ
        </h3>
        <button className="checkout-button" onClick={handleCheckout}>
          Thanh toán
        </button>
      </div>
    </>
  );
};

export default Cart;
