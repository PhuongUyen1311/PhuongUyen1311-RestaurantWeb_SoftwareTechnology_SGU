import React, { useState, useRef } from 'react';
import FilterMenu from '../../components/FilterMenu/FilterMenu';
import '../../styles/Filter.css';
import '../Menu/Menu'

const MenuList = ({ onCategoryChange }) => {
  const items = [
    { id: 1, name: 'ALL' },
    { id: 2, name: 'Juice' },
    { id: 3, name: 'Soda' },
    { id: 4, name: 'KFC' },
    { id: 5, name: 'Cupcake' }, // Thêm vài mục để kiểm tra cuộn
    { id: 6, name: 'Sea Food' },
  ];

  const [selectedItem, setSelectedItem] = useState(items[1]); // Mặc định chọn mục "Juice"
  const scrollRef = useRef(null); // Tham chiếu để điều khiển cuộn

  const handleSelect = (item) => {
    setSelectedItem(item);
    onCategoryChange(item.name === 'ALL' ? null : item.name);
  };


  const handleAddToCart = (item) => {
    console.log(`${item.name} đã lọc `);
  };

  // Hàm cuộn sang trái
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: 'smooth' }); // Cuộn một đoạn bằng chiều rộng của thanh
    }
  };

  // Hàm cuộn sang phải
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: 'smooth' }); // Cuộn một đoạn bằng chiều rộng của thanh
    }
  };

  return (
    <div className="menu-list-container">
      <button onClick={scrollLeft} className="scroll-button left">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path d="M11 2L3 8l8 6V2z"/>
        </svg>     
      </button>
      <div className="menu-list" ref={scrollRef}>
        {items.map((item) => (
          <FilterMenu
            key={item.id}
            item={item}
            isSelected={selectedItem.id === item.id} // Kiểm tra xem mục có được chọn không
            onSelect={handleSelect}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <button onClick={scrollRight} className="scroll-button right">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path d="M5 2l8 6-8 6V2z"/>
        </svg>     
      </button>

    </div>
  );
};

export default MenuList;