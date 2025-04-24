import React from 'react';

const FillterMenu = ({ item, onAddToCart }) => {
  return (
    <div className="FillterMenuItem">
      <button
        onClick={() => onAddToCart(item)}
        className="bg-pink-500 text-white p-2 rounded mt-2 hover:bg-pink-600"
      >
      <img
        src={`/images/${item.name.toLowerCase().replace(/\s/g, '-')}.png`}
        alt={item.name}
        className="ImageFillterMenuItem"
        onError={(e) => (e.target.src = 'https://via.placeholder.com/100')} // Fallback image
      />
        <p>{item.name}</p>
      </button>
    </div>
  );
};

export default FillterMenu;