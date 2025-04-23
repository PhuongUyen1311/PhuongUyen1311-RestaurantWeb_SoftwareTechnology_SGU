import React from 'react';
import FilterMenu from '../../components/FilterMenu/FilterMenu'; 
import '../../styles/Filter.css'; 

const MenuList = () => {
  const items = [
    { id: 1, name: '❤️Hurt' },
    { id: 2, name: '🤡joker' },
    { id: 3, name: '🥹Sad' },
    { id: 4, name: '😭Cry' },
  ];

  const handleAddToCart = (item) => {
    console.log(`${item.name} added to cart!`);
  };

  return (
    <div className="menu-list">
      {items.map((item) => (
        <FilterMenu key={item.id} item={item} onAddToCart={handleAddToCart} />
      ))}
    </div>
  );
};

export default MenuList;
