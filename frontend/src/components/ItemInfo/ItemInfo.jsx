import React from 'react';
import { normalizeImageName } from '../../utils/Normalize.js';
import '../../styles/ItemInfo.css';

const Item = ({ item, quantity, onAddToCart, onClose, onDecrease, onIncrease }) => {
    if (!item) return <p>Không tìm thấy sản phẩm.</p>; // Đảm bảo quantity luôn có giá trị
    item.quantity = quantity || 1; // Đảm bảo quantity luôn có giá trị
    return (
        <div className="item-info-container">
            <div className="item-info-wrapper">
                {/* Nút đóng popup */}
                <button onClick={onClose} className="close-button">
                    &times; {/* Biểu tượng X cho nút đóng */}
                </button>

                <div className="item-image-container">
                    {/* Chèn ảnh sản phẩm ở đây */}
                    <img
                        src={`/images/${normalizeImageName(item.name)}.jpg`}
                        alt={item.name}
                        onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
                        className="item-image-placeholder"
                    />
                </div>

                <div className="item-details">
                    <div className="item-name"><strong>Tên:</strong> {item.name}</div>
                    <div className="item-category"><strong>Danh mục:</strong> {item.category}</div>
                    <div className="item-price"><strong>Giá:</strong> {item.price.toFixed(3)}VNĐ</div>
                    <div className="item-description"><strong>Mô tả:</strong> {item.description}</div>

                    <div className="item-actions">
                        <div className="quantity-control-iteminfo">
                            <button onClick={() => onDecrease(item.id)} className="quantity-button-iteminfo">-</button>
                            <span className="quantity-display-iteminfo">{item.quantity}</span>
                            <button onClick={() => onIncrease(item.id)} className="quantity-button-iteminfo">+</button>
                        </div>

                        <button onClick={() => onAddToCart(item)} className="add-to-cart-button-iteminfo">
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;
