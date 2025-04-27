import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '../../components/Menu/MenuItem';
import ItemInfo from '../ItemInfo/ItemInfo.js'; 
import '../../styles/Menu.css';

const addToCart = async (productId, quantity = 1) => {
  try {
    const addToCartResponse = await axios.post("http://localhost:5000/cart/add", {
      productId,
      quantity
    });

    if (addToCartResponse.data.success) {
      window.dispatchEvent(new Event('cartUpdated'));
    }
  } catch (err) {
    console.error("Lỗi:", err);
  }
};

function Menu({ category }) {
  const [menuItems, setFoods] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/food')
    .then(response => {
        const allItems = response.data;
        const filteredItems = category
          ? allItems.filter(item => item.category === category)
          : allItems;
        setFoods(filteredItems);
      })
      .catch(error => {
        console.log('Lỗi khi lấy dữ liệu món ăn:', error);
      });
  }, [category]);

  const handleAddToCart = (item) => {
    console.log('Thêm vào giỏ hàng:', item);
    addToCart(item.id, item.quantity || 1);
    closePopup(); // Đóng popup sau khi thêm vào giỏ hàng
  };

  const handleItemClick = (item) => {
    setSelectedProduct(item);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="menu-page">
      {menuItems.length === 0 ? (
        <p>Không có món ăn nào.</p>
      ) : (
        <>
          <div className="menu-grid">
            {menuItems.map(item => (
              <MenuItem
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
                onItemClick={handleItemClick}
              />
            ))}
          </div>
          {selectedProduct && (
            <ItemInfo
              item={selectedProduct}
              isOpen={isPopupOpen}
              onClose={closePopup}
              onAddToCart={handleAddToCart}
            />
          )}
        </>
      )}
    </div>
  );
}
export default Menu;