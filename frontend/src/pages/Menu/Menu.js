import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '../../components/Menu/MenuItem';
import ItemInfo from '../ItemInfo/ItemInfo.js'; 
import '../../styles/Menu.css';

const addToCart = async (id, quantity = 1) => {
  try {
    const addToCartResponse = await axios.post("http://localhost:5000/cart/add", {
      id,
      quantity
    });

    if (addToCartResponse.data.success) {
      window.dispatchEvent(new Event('cartUpdated'));
    }
    console.log("Thêm vào giỏ hàng thành công:", addToCartResponse.data);
  } catch (err) {
    console.error("Lỗi:", err);
  }
};

function Menu({ category }) {
  const [menuItems, setFoods] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/food/category', {
          params: { category },
        });

        setFoods(response.data);
        console.log("Kết quả lấy món ăn theo category:", response.data);
      } catch (error) {
        console.log('Lỗi khi lấy dữ liệu món ăn:', error);
      }
    };

    fetchData();
  }, [category]);

  const handleAddToCart = (item) => {
    addToCart(item.id, 1);
    closePopup();
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
              quantity={1}
              isOpen={isPopupOpen}
              onClose={closePopup}
              onAddToCart={addToCart} // truyền quantity vào đây
            />
          )}
        </>
      )}
    </div>
  );
}
export default Menu;