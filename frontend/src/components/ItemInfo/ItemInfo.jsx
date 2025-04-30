// src/components/ItemInfo.jsx
import React, { useRef, useState } from 'react';
import { normalizeImageName } from '../../utils/Normalize.js';
import '../../styles/ItemInfo.css';

const Item = ({ item, quantity: initialQuantity, note: initialNote = "", onAddToCart, onClose }) => {
  const intervalRef = useRef(null);
  const [note, setNote] = useState(initialNote);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [inputValue, setInputValue] = useState(initialQuantity.toString());
  const holdDelay = 200;
  const price = Number(item.price).toLocaleString('vi-VN', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });

  const startHolding = (action) => {
    action();
    intervalRef.current = setInterval(() => {
      action();
    }, holdDelay);
  };

  const stopHolding = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Xử lý khi người dùng nhập giá trị vào ô input
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Chỉ cho phép nhập số
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    const value = parseInt(inputValue, 10);
    // Xử lý khi người dùng rời khỏi ô input (onBlur)
    if (isNaN(value) || value <= 0) {
      setInputValue('1');
      setQuantity(1);
    } else if (value >= 99) {
      setInputValue('99');
      setQuantity(99);
    } else {
      // Nếu hợp lệ thì cập nhật
      setInputValue(value.toString());
      setQuantity(value);
    }
  };

  // Đồng bộ quantity với inputValue khi onIncrease/onDecrease được gọi
  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setInputValue(newQuantity.toString());
  };

  const handleDecrease = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    setInputValue(newQuantity.toString());
  };

  if (!item) {
    return <p>Không tìm thấy sản phẩm.</p>;
  }

  return (
    <div className="item-info-container">
      <div className="item-info-wrapper">
        <button onClick={onClose} className="close-button">&times;</button>

        <div className="item-image-container">
          <img
            src={`/images/${normalizeImageName(item.name)}.jpg`}
            alt={item.name}
            onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
            className="item-image-placeholder"
          />
        </div>

        <div className="item-details">
          <div className="item-name">{item.name}</div>
          <div className="item-category"><strong>Danh mục:</strong> {item.category}</div>
          <div className="item-price"><strong>Giá:</strong> {price}VNĐ</div>
          <div className="item-description"><strong>Mô tả:</strong> {item.description}</div>
          <div className='item-note'>
            <textarea className='item-note-input'
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ghi chú cho món ăn"
              rows={4}
            />
          </div>

          <div className="item-actions">
            <div className="quantity-control-iteminfo">

              <button
                className="quantity-button-iteminfo"
                onMouseDown={() => startHolding(handleDecrease)}
                onMouseUp={() => {
                  handleInputBlur();
                  stopHolding();
                }}
                onMouseLeave={stopHolding}
              >-</button>

              <input
                type="text"
                className="quantity-input-iteminfo"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />

              <button
                className="quantity-button-iteminfo"
                onMouseDown={() => startHolding(handleIncrease)}
                onMouseUp={() => {
                  handleInputBlur();
                  stopHolding();
                }}
                onMouseLeave={stopHolding}
              >+</button>

            </div>
            <button
              onClick={() => {
                onAddToCart(item.id, quantity, note);
                onClose();
              }}
              className="add-to-cart-button-iteminfo"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;