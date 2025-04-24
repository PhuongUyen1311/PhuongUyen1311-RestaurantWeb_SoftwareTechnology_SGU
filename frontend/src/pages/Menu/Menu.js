import MenuItem from '../../components/Menu/MenuItem';
import '../../styles/Menu.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Menu() {
  const [menuItems, setFoods] = useState([]);

  // Khi trang load thì gọi API
  useEffect(function () {
    axios.get(`${process.env.REACT_APP_API_URL}/food`)
      .then(function (response) {
        setFoods(response.data);
      })
      .catch(function (error) {
        console.log('Lỗi khi lấy dữ liệu món ăn:', error);
      });
  }, []);

  // Hàm xử lý khi bấm "Add to cart"
  const handleAddToCart = function (item) {
    console.log('Thêm vào giỏ hàng:', item);
    // Sau này có thể viết thêm: gửi item vào giỏ hàng, context, hoặc localStorage
  };

  return (
    <div className="menu-page">
      <div className="menu-grid">
        {menuItems.map(function (item) {
          return (
            <MenuItem
              
              key={item.id}
              image={item.image}
              item={item}
              onAddToCart={handleAddToCart}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Menu;

