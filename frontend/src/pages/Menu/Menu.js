import MenuItem from '../../components/Menu/MenuItem';
import '../../styles/Menu.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YourCart from '../Cart/Cart';

const addToCart = async (productId, quantity = 1) => {
  try {
    const addToCartResponse = await axios.post("http://localhost:5000/cart/add", {
      productId,
      quantity
    });

    if (addToCartResponse.data.success) {
      alert("Đã thêm vào giỏ hàng!");
      window.location.reload('http://localhost:3000');
    }
  } catch (err) {
    console.error("Lỗi:", err);
    alert("Thêm vào giỏ hàng thất bại!");
  }
};

function Menu() {
  const [menuItems, setFoods] = useState([]);

  useEffect(function () {
    axios.get(`${process.env.REACT_APP_API_URL}/food`)
      .then(function (response) {
        setFoods(response.data);
      })
      .catch(function (error) {
        console.log('Lỗi khi lấy dữ liệu món ăn:', error);
      });
  }, []);

  const handleAddToCart = function (item) {
    console.log('Thêm vào giỏ hàng:', item);
    addToCart(item.id, 1);
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