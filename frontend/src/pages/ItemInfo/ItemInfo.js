import React, { useEffect, useState } from 'react';
import Item from '../../components/ItemInfo/ItemInfo.jsx';

const ItemInfo = ({ item, quantity: initialQuantity, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(initialQuantity || 1);

  useEffect(() => {
    setQuantity(initialQuantity || 1);
  }, [initialQuantity, item]);

  const handleIncrease = () => {
    let newQuantity = quantity + 1;

    if (item?.currentQuantity && newQuantity > item.currentQuantity) {
      newQuantity = item.currentQuantity;
      if (item.currentQuantity < 99) {
        alert('Số lượng có sẵn không đủ!');
      }
    } else if (newQuantity > 99) {
      newQuantity = 99;
    }

    setQuantity(newQuantity);
  };

  const handleDecrease = () => {
    if (quantity <= 1) {
      alert('Số lượng không thể nhỏ hơn 1!');
      return;
    }
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !item) return null;
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
