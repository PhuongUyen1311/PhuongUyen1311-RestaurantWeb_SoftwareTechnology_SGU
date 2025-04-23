import React from 'react';
import MenuItem from '../../components/Menu/MenuItem';
import '../../styles/Menu.css';

const menuItems = [
  { id: 1, name: "Hamburger", price: 123, category: "Burger", sku: "401"},
  { id: 2, name: "Cocacola", price: 122, category: "Sea food", sku: "402" },
  { id: 3, name: "hihi", price: 122, category: "Sea food", sku: "403" },
  { id: 4, name: "Sin", price: 122, category: "Sea food", sku: "404" },
  { id: 5, name: "cos", price: 122, category: "Sea food", sku: "405" },
  { id: 6, name: "mean", price: 122, category: "Sea food", sku: "406" },
];

const Menu = () => {
  const handleAddToCart = (item) => {
    console.log('Add to cart:', item);
  };

  return (
    <div className="menu-page">
      <div className="menu-grid">
        {menuItems.map((item) => (
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
};

export default Menu;
