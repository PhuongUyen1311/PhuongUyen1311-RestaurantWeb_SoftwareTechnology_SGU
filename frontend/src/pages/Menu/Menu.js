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

function Menu({ category }) {
  const [menuItems, setFoods] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/food`)
      .then(response => {
        // Lọc sản phẩm theo category nếu có
        const allItems = response.data;
        const filteredItems = category
          ? allItems.filter(item => item.category === category)
          : allItems;

        setFoods(filteredItems);
      })
      .catch(error => {
        console.log('Lỗi khi lấy dữ liệu món ăn:', error);
      });
  }, [category]); // cập nhật lại khi category thay đổi

  const handleAddToCart = (item) => {
    console.log('Thêm vào giỏ hàng:', item);
    addToCart(item.id, 1);
  };

  return (
    <div className="menu-page">
      <div className="menu-grid">
        {menuItems.map(item => (
          <MenuItem
            key={item.id}
            image={item.image}
            item={item}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
export default Menu;