import { useEffect } from 'react';
import Item from '../../components/ItemInfo/ItemInfo.jsx';

const ItemInfo = ({ item, quantity, note, isOpen, onClose, onAddToCart, action }) => {
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
      note={note}
      onClose={onClose}
      onAddToCart={onAddToCart}
      action={action}
    />
  );
};

export default ItemInfo;
