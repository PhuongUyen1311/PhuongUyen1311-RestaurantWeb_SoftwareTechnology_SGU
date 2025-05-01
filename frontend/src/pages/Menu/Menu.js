import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '../../components/Menu/MenuItem';
import ItemInfo from '../ItemInfo/ItemInfo.js';
import '../../styles/Menu.css';
import { toast } from 'react-toastify'; 

const addToCart = async (id, quantity = 1, note = '') => {
  try {
    const response = await axios.post("http://localhost:5000/cart/add", {
      id,
      quantity,
      note
    });

    if (response.data.success) {
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success("Đã thêm sản phẩm vào giỏ hàng!", {
        autoClose: 1000, 
      });
    } else {
      toast.warning("Không thể thêm sản phẩm: " + response.data.message);
    }

    return response.data.cart || []; 
  } catch (err) {
    console.error("Lỗi:", err);
    toast.error("❌ Lỗi khi thêm sản phẩm vào giỏ hàng!");
    return [];
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
      } catch (error) {
        console.log('Lỗi khi lấy dữ liệu món ăn:', error);
      }
    };
    fetchData();
  }, [category]);

  const handleAddToCart = async (item) => {
    addToCart(item.id, 1, '');
    window.dispatchEvent(new Event('cartUpdated')); // để đảm bảo Cart nhận được
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
              note={''}
              isOpen={isPopupOpen}
              onClose={closePopup}
              onAddToCart={addToCart}
            />
          )}
        </>
      )}
    </div>
  );
}
export default Menu;