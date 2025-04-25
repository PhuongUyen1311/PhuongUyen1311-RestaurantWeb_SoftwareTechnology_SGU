import React, { useEffect,useState } from 'react';
import Item from '../../components/ItemInfo/ItemInfo.jsx';

const ItemInfo = ({ item, isOpen, onClose ,onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !item) {
    return null;
  }
  return (
    <Item
      item={item}
      quantity={quantity}
      onClose={onClose}
      onAddToCart={onAddToCart}
      onIncrease={handleIncrease}
      onDecrease={handleDecrease}
    />
  );
};

export default ItemInfo;
